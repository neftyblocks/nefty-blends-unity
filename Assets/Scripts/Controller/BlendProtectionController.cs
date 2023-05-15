using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BlendProtectionController : MonoBehaviour
{
    [SerializeField] PluginController pluginController;
    [SerializeField] SendTransactionJS sendTransactionJS;
    [SerializeField] public WhitelistUI whitelistUI;
    [SerializeField] OwnershipFetcher ownershipFetcher;
    public bool isWhitelisted { get; set; }
    public bool isSecured { get; set; }

    public void IsBlendWhitelisted(int securityId)
    {
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
            isWhitelisted = true;
            whitelistUI.DisplayWhitelistWarning(false);
            Debug.Log("user is whitelisted ");
        }
        else
        {
            isWhitelisted = false;
            Debug.Log("user is not whitelisted ");
            whitelistUI.DisplayWhitelistWarning(true);
        }
    }

    public async void IsWhitelistedProof(string jsonResponse)
    {
        var deserializedJsonResult = JsonConvert.DeserializeObject<ProtectionFilter>(jsonResponse);

        foreach (List<object> filter in deserializedJsonResult.filters)
        {
            string filterType = filter[0].ToString();
            string filterJson = filter[1].ToString();

            switch (filterType)
            {
                case "COLLECTION_HOLDINGS":
                    var collectionHoldings = JsonConvert.DeserializeObject<ProtectionFilter.CollectionHoldings>(filterJson);
                    string collectionName = collectionHoldings.collection_name;
                    int amount = collectionHoldings.amount;
                    int comparison_operator = collectionHoldings.comparison_operator;
                    if (comparison_operator == 2)
                    {
                        amount = amount + 1;
                    }
                    await ownershipFetcher.OwnsCollection(collectionName,amount);
                    Debug.Log("Coll:" + await ownershipFetcher.OwnsCollection(collectionName, amount));

                    break;
                case "TEMPLATE_HOLDINGS":
                    var templateHoldings = JsonConvert.DeserializeObject<ProtectionFilter.TemplateHoldings>(filterJson);
                    string templateCollectionName = templateHoldings.collection_name;
                    int templateId = templateHoldings.template_id;
                    int templateAmount = templateHoldings.amount;
                    comparison_operator = templateHoldings.comparison_operator;
                    amount = templateHoldings.amount;
                    if (comparison_operator == 2)
                    {
                        amount = amount + 1;
                    }
                    await ownershipFetcher.OwnsTemplate(templateCollectionName,templateId, amount);
                    Debug.Log("Template:"+ await ownershipFetcher.OwnsTemplate(templateCollectionName, templateId, amount));
                    break;
                case "SCHEMA_HOLDINGS":
                    var schemaHoldings = JsonConvert.DeserializeObject<ProtectionFilter.SchemaHoldings>(filterJson);
                    string schemaCollectionName = schemaHoldings.collection_name;
                    string schemaName = schemaHoldings.schema_name;
                    int schemaAmount = schemaHoldings.amount;
                    /// continue tommorow add conparuson operator && await 
                    break;
                default:
                    Debug.Log("Unknown filter type: " + filterType);
                    break;
            }
        }
    }
}
