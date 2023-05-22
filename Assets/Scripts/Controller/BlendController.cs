using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;

public class BlendController : MonoBehaviour
{
    [SerializeField] public GameObject requirementPanel;
    [SerializeField] public BlendProtectionController blendProtectionController;
    [SerializeField] public ISendTransactionJS sendTransactionJS;
    [SerializeField] public CraftAssetPopupController craftAssetPopupController;

    private TemplateUIElementController GetUIElementController(Transform child)
    {
        return child.GetComponent<TemplateUIElementController>();
    }

    private TemplateNFT GetTemplateNFT(Transform child)
    {
        return child.GetComponent<TemplateNFT>();
    }

    private bool IsChildValid(Transform child)
    {
        var uiController = GetUIElementController(child);
        var templateNFT = GetTemplateNFT(child);

        return !(uiController.selectedAssetId == null || uiController.selectedAssetId == "") || templateNFT.GetRequirementType() == "FT_INGREDIENT";
    }

    public bool CanBlend()
    {
        if (requirementPanel == null || requirementPanel.transform.childCount == 0)
            return false;

        return requirementPanel.transform.Cast<Transform>().All(IsChildValid);
    }

    public string[] GetSelectedAssetList()
    {
        return requirementPanel == null
            ? new string[0]
            : requirementPanel.transform.Cast<Transform>().Where(t => GetTemplateNFT(t).GetRequirementType() != "FT_INGREDIENT")
                                                        .Select(t => GetUIElementController(t).selectedAssetId)
                                                        .ToArray();
    }

    public string[] GetContractNameList()
    {
        return requirementPanel == null
            ? new string[0]
            : requirementPanel.transform.Cast<Transform>().Where(t => GetTemplateNFT(t).GetRequirementType() == "FT_INGREDIENT")
                                                        .Select(t => GetTemplateNFT(t).GetFungibleToken().contractName)
                                                        .ToArray();
    }

    public string[] GetTokenQuantityList()
    {
        return requirementPanel == null
            ? new string[0]
            : requirementPanel.transform.Cast<Transform>().Where(t => GetTemplateNFT(t).GetRequirementType() == "FT_INGREDIENT")
                                                        .Select(t => GetTemplateNFT(t).GetFungibleToken().GetFormattedAmount())
                                                        .ToArray();
    }

    public string[] GetTokenSymbolList()
    {
        return requirementPanel == null
            ? new string[0]
            : requirementPanel.transform.Cast<Transform>().Where(t => GetTemplateNFT(t).GetRequirementType() == "FT_INGREDIENT")
                                                        .Select(t => GetTemplateNFT(t).GetFungibleToken().GetFormattedTokenSymbol())
                                                        .ToArray();
    }

    public void SubmitBlend()
    {
        if (!CanBlend())
        {
            return;
        }

        if (!blendProtectionController.isSecured)
        {
            PerformBlend();
            return;
        }

        if (!blendProtectionController.isWhitelisted)
        {
            return;
        }
        PerformSecuredBlend();
    }

    private void PerformBlend()
    {
        try
        {
            sendTransactionJS.SendBlendTransaction(
                craftAssetPopupController.currentBlendId,
                GetSelectedAssetList(),
                GetContractNameList(),
                GetTokenSymbolList(),
                GetTokenQuantityList(),
                GetTokenQuantityList().Length,
                GetSelectedAssetList().Length
                );
        }
        catch (Exception ex)
        {
            Debug.Log(ex.ToString());
        }
    }

    private void PerformSecuredBlend()
    {
        try
        {
            sendTransactionJS.SendSecuredBlendTransaction(
                craftAssetPopupController.currentBlendId,
                GetSelectedAssetList(),
                GetContractNameList(),
                GetTokenSymbolList(),
                GetTokenQuantityList(),
                GetTokenQuantityList().Length,
                GetSelectedAssetList().Length,
                blendProtectionController.protectedAssets.ToArray(),
                blendProtectionController.protectedAssets.Count
                );
        }
        catch (Exception ex)
        {
            Debug.Log(ex.ToString());
        }
    }
}