using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;
using UnityEngine;

/// <summary>
/// The BlendProtectionController class manages the blend protection feature which 
/// includes functionality for validating blend eligibility, and managing whitelist status and protected assets of logged in user.
/// </summary>

public class BlendProtectionController : MonoBehaviour
{
    [SerializeField] public PluginController pluginController;
    [SerializeField] public WhitelistUI whitelistUI;
    public IOwnershipFetcher ownershipFetcher;
    public ISendTransactionJS sendTransactionJS;

    public bool isWhitelisted { get; set; }
    public bool ownsProof { get; private set; }
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

        if (pluginController.GetWalletName() != null && pluginController.GetCollectionName() != null)
        {
            sendTransactionJS.IsBlendProtectionEligible(securityId, pluginController.GetCollectionName());
        }
    }
    // Resets the protection state by clearing the protected assets and updating the whitelisted state.
    public void ResetProtectionState()
    {
        protectedAssets.Clear();
        whitelistUI.DisplayWhitelistWarning(WhitelistStatus.Checking);
    }

    private void Initialize()
    {
        isWhitelisted = true;
        ownsProof = true;
        protectedAssets = new List<string>();
    }

    private ProtectionFilter DeserializeJson(string jsonResponse)
    {
        return JsonConvert.DeserializeObject<ProtectionFilter>(jsonResponse);
    }

    // Getting called in WrapperJS.jslib and checks if user from jsonResponse is valid for the Proof of Ownership protection.
    public async Task IsUserWhitelistedForProofOfOwnership(string jsonResponse)
    {
        Initialize();
        var deserializedJsonResult = DeserializeJson(jsonResponse);
        var filterList = new List<(string, string, string, string, int)>();

        foreach (var filter in deserializedJsonResult.filters)
        {
            var (collectionName, templateId, schemaName, entityType, amount, proof) = await ProcessFilter(filter);

            if (!string.IsNullOrEmpty(collectionName) || !string.IsNullOrEmpty(templateId) || !string.IsNullOrEmpty(schemaName))
            {
                filterList.Add((collectionName, templateId, schemaName, entityType, amount));
            }
            
            if (!proof)
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
        isWhitelisted = response == "true";
        whitelistUI.DisplayWhitelistWarning(response == "true" ? WhitelistStatus.Whitelisted : WhitelistStatus.NotWhitelisted);
    }

    // Processes a protection filter and returns details about the filter from received JSON in secure.nefty contract (that is called in WrapperJS.jslib).
    private async Task<(string, string, string, string, int, bool)> ProcessFilter(List<object> filter)
    {
        var filterType = filter[0].ToString();
        var filterJson = filter[1].ToString();
        var collectionName = string.Empty;
        var templateId = string.Empty;
        var schemaName = string.Empty;
        var entityType = string.Empty;
        var amount = 0;
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
        }
        return (collectionName, templateId, schemaName, entityType, amount, ownsProof);
    }
    // Adds assets to protection list and returns the updated protected assets that will be spent to JS with the list of proof of ownership NFTs
    private async Task<List<string>> AddAssetsToProtection(List<(string, string, string, string, int)> sortedList)
    {
        foreach (var item in sortedList)
        {
            var response = await ownershipFetcher.RetrieveAsset($"&collection_name={item.Item1}&template_id={item.Item2}&schema_name={item.Item3}");
            var retrievedCount = 0;

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
        var order = new List<string>() { "template", "schema", "collection" };

        return filterList.OrderBy(obj =>
        {
            var index = order.FindIndex(item => item.Equals(obj.Item4, StringComparison.OrdinalIgnoreCase));
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
