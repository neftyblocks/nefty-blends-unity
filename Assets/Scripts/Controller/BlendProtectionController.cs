using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BlendProtectionController : MonoBehaviour
{
    [SerializeField] PluginController pluginController;
    [SerializeField] SendTransactionJS sendTransactionJS;
    [SerializeField] public WhitelistUI whitelistUI;
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
}
