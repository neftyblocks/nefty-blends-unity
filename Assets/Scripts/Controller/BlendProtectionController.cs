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

    public bool isWhitelisted { get; private set; }
    public List<string> protectedAssets { get; private set; } = new List<string>();
    public bool isSecured { get; set; }

    public void IsBlendWhitelisted(int securityId)
    {
        ResetProtectionState();
        isSecured = true;
        if (pluginController.GetWalletName() != null)
        {
            sendTransactionJS.IsBlendProtectionEligible(securityId);
        }
    }

    public void IsWhitelisted(string response)
    {
        UpdateWhitelistedState(response == "true");
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

    public async Task IsWhitelistedProof(string jsonResponse)
    {
        var deserializedJsonResult = JsonConvert.DeserializeObject<ProtectionFilter>(jsonResponse);
        List<(string, string, string, string, int)> filterList = await ProcessFilters(deserializedJsonResult);
        await ProcessFilterList(filterList);
        UpdateWhitelistedState(isWhitelisted);
    }

    private async Task<List<(string, string, string, string, int)>> ProcessFilters(ProtectionFilter filters)
    {
        List<(string, string, string, string, int)> filterList = new List<(string, string, string, string, int)>();
        foreach (List<object> filter in filters.filters)
        {
            var filterParams = await ProcessFilter(filter);
            filterList.Add(filterParams);
        }
        return filterList;
    }

    private async Task<(string, string, string, string, int)> ProcessFilter(List<object> filter)
    {
        string filterType = filter[0].ToString();
        string filterJson = filter[1].ToString();
        switch (filterType)
        {
            case "COLLECTION_HOLDINGS":
                return await ProcessCollectionHoldings(filterJson);
            case "TEMPLATE_HOLDINGS":
                return await ProcessTemplateHoldings(filterJson);
            case "SCHEMA_HOLDINGS":
                return await ProcessSchemaHoldings(filterJson);
            default:
                throw new ArgumentException("Unknown filter type: " + filterType);
        }
    }

    private async Task<(string, string, string, string, int)> ProcessCollectionHoldings(string filterJson)
    {
        var collectionHoldings = JsonConvert.DeserializeObject<ProtectionFilter.CollectionHoldings>(filterJson);
        int amount = AdjustAmount(collectionHoldings.amount, collectionHoldings.comparison_operator);
        return (collectionHoldings.collection_name, "", "", "Collection", amount);
    }

    private async Task<(string, string, string, string, int)> ProcessTemplateHoldings(string filterJson)
    {
        var templateHoldings = JsonConvert.DeserializeObject<ProtectionFilter.TemplateHoldings>(filterJson);
        int amount = AdjustAmount(templateHoldings.amount, templateHoldings.comparison_operator);
        return (templateHoldings.collection_name, templateHoldings.template_id.ToString(), "", "Template", amount);
    }

    private async Task<(string, string, string, string, int)> ProcessSchemaHoldings(string filterJson)
    {
        var schemaHoldings = JsonConvert.DeserializeObject<ProtectionFilter.SchemaHoldings>(filterJson);
        int amount = AdjustAmount(schemaHoldings.amount, schemaHoldings.comparison_operator);
        return (schemaHoldings.collection_name, "", schemaHoldings.schema_name, "Schema", amount);
    }

    private async Task ProcessFilterList(List<(string, string, string, string, int)> filterList)
    {
        var sortedList = SortFilterList(filterList);

        foreach (var item in sortedList)
        {
            var response = await ownershipFetcher.RetrieveAsset($"&collection_name={item.Item1}&template_id={item.Item2}&schema_name={item.Item3}");

            protectedAssets.AddRange(response.details.Select(detail => detail.assetId));
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

    private int AdjustAmount(int amount, int comparisonOperator)
    {
        return comparisonOperator == 2 ? amount + 1 : amount;
    }
}
