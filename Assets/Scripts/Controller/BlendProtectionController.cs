using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;
using UnityEngine;
using static NeftyBlend;


/// <summary>
/// The BlendProtectionController class manages the blend protection feature which 
/// includes functionality for validating blend eligibility, and managing whitelist status and protected assets of logged in user.
/// </summary>

public class BlendProtectionController : MonoBehaviour
{
    [SerializeField] public PluginController pluginController;
    [SerializeField] public ISendTransactionJS sendTransactionJS;
    [SerializeField] public WhitelistUI whitelistUI;
    [SerializeField] public IOwnershipFetcher ownershipFetcher;
    public bool isWhitelisted { get; set; }
    public bool ownsProof { get; set; }
    public bool isSecured { get; set; }

    public List<string> protectedAssets { get; set; } = new List<string>();

    [ExcludeFromCodeCoverage]
    void Start()
    {
        sendTransactionJS = GameObject.Find("Javascript-Wrapper").GetComponent<SendTransactionJS>();
        ownershipFetcher = GameObject.Find("OwnershipFetcherController").GetComponent<OwnershipFetcher>();
    }

    // Validates if user is whitelisted and resets protection state.
    public void IsBlendWhitelisted(int securityId)
    {
        isSecured = true;
        ResetProtectionState();

        if (pluginController.GetWalletName() != null)
        {
            sendTransactionJS.IsBlendProtectionEligible(securityId);
        }
    }
    // Resets the protection state by clearing the protected assets and updating the whitelisted state.
    public void ResetProtectionState()
    {
        protectedAssets.Clear();
        whitelistUI.DisplayWhitelistWarning(WhitelistStatus.Checking);
    }

    public void Initialize()
    {
        isWhitelisted = true;
        ownsProof = true;
        protectedAssets = new List<string>();
    }

    public ProtectionFilter DeserializeJson(string jsonResponse)
    {
        return JsonConvert.DeserializeObject<ProtectionFilter>(jsonResponse);
    }

    // Getting called in WrapperJS.jslib and checks if user from jsonResponse is valid for the Proof of Ownership protection.
    public async Task IsUserWhitelistedForProofOfOwnership(string jsonResponse)
    {
        Initialize();
        var deserializedJsonResult = DeserializeJson(jsonResponse);
        List<(string, string, string, string, int)> filterList = new List<(string, string, string, string, int)>();

        foreach (List<object> filter in deserializedJsonResult.filters)
        {
            var (collectionName, templateId, schemaName, entityType, amount, ownsProof) = await ProcessFilter(filter);

            if (!string.IsNullOrEmpty(collectionName) || !string.IsNullOrEmpty(templateId) || !string.IsNullOrEmpty(schemaName))
            {
                filterList.Add((collectionName, templateId, schemaName, entityType, amount));
            }
            
            if (!ownsProof)
            {
                isWhitelisted = false;
                whitelistUI.DisplayWhitelistWarning(WhitelistStatus.NotWhitelisted);
                return;
            }
        }

        var sortedList = SortFilterList(filterList);
        protectedAssets = await AddAssetsToProtection(sortedList);
        whitelistUI.DisplayWhitelistWarning(WhitelistStatus.Whitelisted);
    }

    // Getting called in WrapperJS.jslib and checks if user from response is valid for the Proof of Whitelist protection.
    public void IsWhitelisted(string response)
    {
        whitelistUI.DisplayWhitelistWarning(response == "true" ? WhitelistStatus.Whitelisted : WhitelistStatus.NotWhitelisted);
    }

    // Processes a protection filter and returns details about the filter from received JSON in secure.nefty contract (that is called in WrapperJS.jslib).
    public async Task<(string, string, string, string, int, bool)> ProcessFilter(List<object> filter)
    {
        string filterType = filter[0].ToString();
        string filterJson = filter[1].ToString();
        string collectionName = string.Empty;
        string templateId = string.Empty;
        string schemaName = string.Empty;
        string entityType = string.Empty;
        int amount = 0;
        switch (filterType)
        {
            case "COLLECTION_HOLDINGS":
                var collectionHoldings = JsonConvert.DeserializeObject<ProtectionFilter.CollectionHoldings>(filterJson);
                amount = collectionHoldings.amount;
                AdjustAmount(ref amount, collectionHoldings.comparison_operator);
                ownsProof = await ownershipFetcher.OwnsCollection(collectionHoldings.collection_name, amount);
                collectionName = collectionHoldings.collection_name;
                entityType = "Collection";
                break;
            case "TEMPLATE_HOLDINGS":
                var templateHoldings = JsonConvert.DeserializeObject<ProtectionFilter.TemplateHoldings>(filterJson);
                amount = templateHoldings.amount;
                AdjustAmount(ref amount, templateHoldings.comparison_operator);
                ownsProof = await ownershipFetcher.OwnsTemplate(templateHoldings.collection_name, templateHoldings.template_id, amount);
                collectionName = templateHoldings.collection_name;
                templateId = templateHoldings.template_id.ToString();
                entityType = "Template";
                break;
            case "SCHEMA_HOLDINGS":
                var schemaHoldings = JsonConvert.DeserializeObject<ProtectionFilter.SchemaHoldings>(filterJson);
                amount = schemaHoldings.amount;
                AdjustAmount(ref amount, schemaHoldings.comparison_operator);
                ownsProof = await ownershipFetcher.OwnsSchema(schemaHoldings.collection_name, schemaHoldings.schema_name, amount);
                collectionName = schemaHoldings.collection_name;
                schemaName = schemaHoldings.schema_name;
                entityType = "Schema";
                break;
            default:
                break;
        }
        return (collectionName, templateId, schemaName, entityType, amount, ownsProof);
    }
    // Adds assets to protection list and returns the updated protected assets that will be spent to JS with the list of proof of ownership NFT's
    public async Task<List<string>> AddAssetsToProtection(List<(string, string, string, string, int)> sortedList)
    {
        foreach (var item in sortedList)
        {
            var response = await ownershipFetcher.RetrieveAsset($"&collection_name={item.Item1}&template_id={item.Item2}&schema_name={item.Item3}");
            int retrievedCount = 0;

            foreach (var detail in response.details)
            {
                if (!protectedAssets.Contains(detail.assetId))
                {
                    protectedAssets.Add(detail.assetId);
                    retrievedCount++;

                    if (retrievedCount >= item.Item5) break;
                }
            }
        }
        return protectedAssets;
    }
    // Sorts the filter list based on a specified order.

    public List<(string, string, string, string, int)> SortFilterList(List<(string, string, string, string, int)> filterList)
    {
        List<string> order = new List<string>() { "template", "schema", "collection" };

        return filterList.OrderBy(obj =>
        {
            int index = order.FindIndex(item => item.Equals(obj.Item4, StringComparison.OrdinalIgnoreCase));
            return index == -1 ? int.MaxValue : index;
        }).ToList();
    }

    // Adjusts the amount based on the comparison operator which is always amount+1 if comparisonOperator is 2
    public void AdjustAmount(ref int amount, int comparisonOperator)
    {
        if (comparisonOperator == 2)
        {
            amount += 1;
        }
    }
}
