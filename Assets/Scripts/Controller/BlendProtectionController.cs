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

    public void IsWhitelistedProof(string jsonResponse)
    {
        var deserealizedJson = JsonConvert.DeserializeObject<ProtectionFilter>(jsonResponse);

        foreach (List<object> filterData in deserealizedJson.filters)
        {
            string filterType = filterData[0] as string;
            Dictionary<string, object> filterProperties = filterData[1] as Dictionary<string, object>;

            switch (filterType)
            {
                case "COLLECTION_HOLDINGS":
                    // Handle COLLECTION_HOLDINGS filter
                    // Access filter properties from filterProperties dictionary
                    break;
                case "TEMPLATE_HOLDINGS":
                    // Handle TEMPLATE_HOLDINGS filter
                    // Access filter properties from filterProperties dictionary
                    break;
                case "SCHEMA_HOLDINGS":
                    // Handle SCHEMA_HOLDINGS filter
                    // Access filter properties from filterProperties dictionary
                    break;
                case "TOKEN_HOLDING":
                    // Handle TOKEN_HOLDING filter
                    // Access filter properties from filterProperties dictionary
                    break;
                default:
                    // Unknown filter type
                    break;
            }
        }
    }
}
