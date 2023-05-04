using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;
 
public class BlendController : MonoBehaviour
{
    [SerializeField] public GameObject requirementPanel;
    [SerializeField] public ISendTransactionJS sendTransactionJS;
    [SerializeField] public CraftAssetPopupController craftAssetPopupController;

    void Start()
    {
        sendTransactionJS = GameObject.Find("Javascript-Wrapper").GetComponent<SendTransactionJS>();
    }

    public bool CanBlend()
    {
        if (requirementPanel == null || requirementPanel.transform.childCount == 0)
        {
            return false; // return false if requirementPanel is not set or has no children
        }


        foreach (Transform child in requirementPanel.transform)
        {

            if (child.GetComponent<TemplateUIElementController>().selectedAssetId == null || child.GetComponent<TemplateUIElementController>().selectedAssetId == "")
            {
                if (child.GetComponent<TemplateNFT>().GetRequirementType() == "FT_INGREDIENT")
                {
                    break;
                }
                return false; // return false if any child is empty
            }
        }

        return true;
    }

    public string[] GetSelectedAssetList()
    {
        List<string> idsList = new List<string>();

        if (requirementPanel == null)
            return new string[0];

        foreach (Transform child in requirementPanel.transform)
        {
            if (child.GetComponent<TemplateNFT>().GetRequirementType() == "FT_INGREDIENT")
                continue;

            idsList.Add(child.GetComponent<TemplateUIElementController>().selectedAssetId);
        }

        return idsList.Count > 0 ? idsList.ToArray() : new string[0];
    }

    public string[] GetContractNameList()
    {
        List<string> contractNameList = new List<string>();

        if (requirementPanel == null)
            return contractNameList.ToArray();

        foreach (Transform child in requirementPanel.transform)
        {
            if (child.GetComponent<TemplateNFT>().GetRequirementType() == "FT_INGREDIENT")
            {
                var fungibleTokenObject = child.GetComponent<TemplateNFT>().GetFungibleToken();
                contractNameList.Add(fungibleTokenObject.contractName);
            }
        }
        return contractNameList.ToArray();
    }

    public string[] GetTokenQuantityList()
    {
        List<string> tokenQuantityList = new List<string>();

        if (requirementPanel == null)
            return tokenQuantityList.ToArray();

        foreach (Transform child in requirementPanel.transform)
        {
            if (child.GetComponent<TemplateNFT>().GetRequirementType() == "FT_INGREDIENT")
            {
                var fungibleTokenObject = child.GetComponent<TemplateNFT>().GetFungibleToken();
                tokenQuantityList.Add((fungibleTokenObject.amount / Math.Pow(10, fungibleTokenObject.tokenPrecision)).ToString("0." + new string('0', fungibleTokenObject.tokenPrecision)) + " " + fungibleTokenObject.tokenSymbol);
            }
        }
        return tokenQuantityList.ToArray();
    }

    public string[] GetTokenSymbolList()
    {
        List<string> tokenSymbolList = new List<string>();

        if (requirementPanel == null)
            return tokenSymbolList.ToArray();

        foreach (Transform child in requirementPanel.transform)
        {
            if (child.GetComponent<TemplateNFT>().GetRequirementType() == "FT_INGREDIENT")
            {
                var fungibleTokenObject = child.GetComponent<TemplateNFT>().GetFungibleToken();
                tokenSymbolList.Add(fungibleTokenObject.tokenPrecision + "," + fungibleTokenObject.tokenSymbol);
            }
        }
        return tokenSymbolList.ToArray();
    }

    public void SubmitBlend()
    {
        if (CanBlend())
        {
            var assetList = GetSelectedAssetList();
            var contractNameArray = GetContractNameList();
            var tokenQuantityArray = GetTokenQuantityList().ToArray();
            var tokenSymbolArray = GetTokenSymbolList().ToArray();

            if (assetList != null && contractNameArray != null && tokenQuantityArray != null && tokenSymbolArray!= null)
            {
                sendTransactionJS.SendBlendTransaction(craftAssetPopupController.currentBlendId, assetList, contractNameArray, tokenSymbolArray, tokenQuantityArray, tokenQuantityArray.Length, assetList.Length);
            }
        }
    }
}
