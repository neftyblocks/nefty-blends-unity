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
    [SerializeField] PluginController pluginController;
    [SerializeField] SendTransactionJS sendTransactionJS;
    [SerializeField] public WhitelistUI whitelistUI;
    [SerializeField] OwnershipFetcher ownershipFetcher;
    public bool isWhitelisted { get; set; }
    public bool isSecured { get; set; }
    public List<string> protectedAssets { get; set; }

    private void Update()
    {
        Debug.Log(isWhitelisted);
    }
    public void IsBlendWhitelisted(int securityId)
    {
        Debug.Log("a");
        isWhitelisted = false;
        isSecured = true;
        whitelistUI.DisplayWhitelistWarning(true);

        if (pluginController.GetWalletName() != null)
        {
            sendTransactionJS.IsBlendProtectionEligible(securityId);

        }
    }

    public void IsWhitelisted(string response)
    {
        // boolean is not supported for SendMessage()
        if (response == "true")
        {
            Debug.Log("b");

            isWhitelisted = true;
            whitelistUI.DisplayWhitelistWarning(false);
            Debug.Log("user is whitelisted!! ");
        }
        else
        {
            Debug.Log("c");
            isWhitelisted = false;
            Debug.Log("user is not whitelisted?? ");
            whitelistUI.DisplayWhitelistWarning(true);
        }
    }

    public async Task IsWhitelistedProof(string jsonResponse)
    {
        Debug.Log("started");
        var deserializedJsonResult = JsonConvert.DeserializeObject<ProtectionFilter>(jsonResponse);
        isWhitelisted = true;
        bool filterResult = false;

        List<(string, string, string, string,int)> filterList = new List<(string, string, string, string, int)>();
        protectedAssets = new List<string>();
        foreach (List<object> filter in deserializedJsonResult.filters)
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
                    filterResult = await ownershipFetcher.OwnsCollection(collectionHoldings.collection_name, amount);
                    collectionName = collectionHoldings.collection_name;
                    entityType = "Collection";
                    break;
                case "TEMPLATE_HOLDINGS":
                    var templateHoldings = JsonConvert.DeserializeObject<ProtectionFilter.TemplateHoldings>(filterJson);
                     amount = templateHoldings.amount;
                    AdjustAmount(ref amount, templateHoldings.comparison_operator);
                    filterResult = await ownershipFetcher.OwnsTemplate(templateHoldings.collection_name, templateHoldings.template_id, amount);
                    collectionName = templateHoldings.collection_name;
                    templateId = templateHoldings.template_id.ToString();
                    entityType = "Template";
                    break;
                case "SCHEMA_HOLDINGS":
                    var schemaHoldings = JsonConvert.DeserializeObject<ProtectionFilter.SchemaHoldings>(filterJson);
                     amount = schemaHoldings.amount;
                    AdjustAmount(ref amount, schemaHoldings.comparison_operator);
                    filterResult = await ownershipFetcher.OwnsSchema(schemaHoldings.collection_name, schemaHoldings.schema_name, amount);
                    collectionName = schemaHoldings.collection_name;
                    schemaName = schemaHoldings.schema_name;
                    entityType = "Schema";
                    break;
                default:
                    Debug.Log("Unknown filter type: " + filterType);
                    break;
            }

            if (!string.IsNullOrEmpty(collectionName) || !string.IsNullOrEmpty(templateId) || !string.IsNullOrEmpty(schemaName))
            {
                filterList.Add((collectionName, templateId, schemaName, entityType, amount));
            }
            
            if (!filterResult)
            {
                isWhitelisted = false;
                Debug.Log("User is not whitelisted");
                whitelistUI.DisplayWhitelistWarning(true);
            }
        }

        foreach (var filterTuple in filterList)
        {
            string filterTuple1 = filterTuple.Item1;
            string filterTuple2 = filterTuple.Item2;
            string filterTuple3 = filterTuple.Item3;
            string filterTuple4 = filterTuple.Item4;
            int filterTuple5 = filterTuple.Item5;

            Debug.Log($"Filter: Collection Name: {filterTuple1}, Template ID: {filterTuple2}, Schema Name: {filterTuple3}, Entity Type: {filterTuple4}, Amount : {filterTuple5}");
        }

        List<string> order = new List<string>() { "template", "schema", "collection" };

        List<(string, string, string, string, int)> sortedList = filterList.OrderBy(obj =>
        {
            int index = order.FindIndex(item => item.Equals(obj.Item4, StringComparison.OrdinalIgnoreCase));
            return index == -1 ? int.MaxValue : index;
        }).ToList();


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

                    if (retrievedCount >= item.Item5)
                    {
                        break; // Breaks the inner loop after retrieving the desired number of assets
                    }
                }
            }
        }

        // Print the protectedAssets list
        foreach (var assetId in protectedAssets)
        {
            Debug.Log(assetId);
            // or Debug.Log(assetId);
        }

        if (isWhitelisted)
        {
            isWhitelisted = true;
            Debug.Log(isWhitelisted + "hmm");

            Debug.Log("User is whitelisted");
            whitelistUI.DisplayWhitelistWarning(false);
        }
        Debug.Log("ended");

        // Use the filterList for further processing or logging
    }

    private void AdjustAmount(ref int amount, int comparisonOperator)
    {
        if (comparisonOperator == 2)
        {
            amount += 1;
        }
    }
}
