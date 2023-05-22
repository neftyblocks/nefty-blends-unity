using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UnityEngine;
using static NeftyBlend;

public class BlendProtectionController : MonoBehaviour
{
    [SerializeField] public PluginController pluginController;
    [SerializeField] public SendTransactionJS sendTransactionJS;
    [SerializeField] public WhitelistUI whitelistUI;
    [SerializeField] public OwnershipFetcher ownershipFetcher;
    public bool isWhitelisted { get; set; }
    public bool ownsProof { get; set; }
    public bool isSecured { get; set; }

    public List<string> protectedAssets { get; set; } = new List<string>();

    public void IsBlendWhitelisted(int securityId)
    {
        isSecured = true;
        ResetProtectionState();

        if (pluginController.GetWalletName() != null)
        {
            sendTransactionJS.IsBlendProtectionEligible(securityId);
        }
    }

    public void ResetProtectionState()
    {
        protectedAssets.Clear();
        UpdateWhitelistedState(false);
    }

    private void UpdateWhitelistedState(bool value)
    {
        isWhitelisted = value;
        whitelistUI.DisplayWhitelistWarning(!isWhitelisted);
    }

    public void IsWhitelisted(string response)
    {
        UpdateWhitelistedState(response == "true");
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

    public async Task IsWhitelistedProof(string jsonResponse)
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
                Debug.Log("User is not whitelisted");
                whitelistUI.DisplayWhitelistWarning(true);
                break;
            }
        }

        var sortedList = SortFilterList(filterList);
        await AddAssetsToProtection(sortedList);
        RemoveWhitelistWarning();
    }

    private async Task AddAssetsToProtection(List<(string, string, string, string, int)> sortedList)
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
    }

    private List<(string, string, string, string, int)> SortFilterList(List<(string, string, string, string, int)> filterList)
    {
        List<string> order = new List<string>() { "template", "schema", "collection" };

        return filterList.OrderBy(obj =>
        {
            int index = order.FindIndex(item => item.Equals(obj.Item4, StringComparison.OrdinalIgnoreCase));
            return index == -1 ? int.MaxValue : index;
        }).ToList();
    }

    private async Task<(string, string, string, string, int, bool)> ProcessFilter(List<object> filter)
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
                Debug.Log("Unknown filter type: " + filterType);
                break;
        }
        return (collectionName, templateId, schemaName, entityType, amount, ownsProof);
    }

    private void RemoveWhitelistWarning()
    {
        if (isWhitelisted)
        {
            whitelistUI.DisplayWhitelistWarning(false);
        }
    }

    private void AdjustAmount(ref int amount, int comparisonOperator)
    {
        if (comparisonOperator == 2)
        {
            amount += 1;
        }
    }
}
