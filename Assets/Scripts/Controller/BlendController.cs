using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using UnityEngine;

/// <summary>
/// The BlendController class manages the functionality for blending assets and submitting the transaction through JS Wrapper.
/// </summary>
public class BlendController : MonoBehaviour
{
    [SerializeField] public GameObject requirementPanel;
    [SerializeField] public BlendProtectionController blendProtectionController;
    [SerializeField] public ISendTransactionJS sendTransactionJS;
    [SerializeField] public CraftAssetPopupController craftAssetPopupController;

    [ExcludeFromCodeCoverage]
    void Start()
    {
        sendTransactionJS = GameObject.Find("Javascript-Wrapper").GetComponent<SendTransactionJS>();
    }

    public TemplateUIElementController GetUIElementController(Transform child)
    {
        return child.GetComponent<TemplateUIElementController>();
    }

    public TemplateNFT GetTemplateNFT(Transform child)
    {
        return child.GetComponent<TemplateNFT>();
    }

    // Checks if a child is valid for the blending operation.
    // A child is valid if it has a selected asset or if its requirement type is FT_INGREDIENT.
    public bool IsRequirementPanelChildValid(Transform child)
    {
        var uiController = GetUIElementController(child);
        var templateNFT = GetTemplateNFT(child);

        return !(uiController.selectedAssetId == null || uiController.selectedAssetId == "") || templateNFT.GetRequirementType() == "FT_INGREDIENT";
    }

    // Determines if a blend operation is possible as long as there aren't any empty selectedAssetId's in inside the requirementPanel
    public bool CanBlend()
    {
        if (requirementPanel == null || requirementPanel.transform.childCount == 0)
            return false;

        return requirementPanel.transform.Cast<Transform>().All(IsRequirementPanelChildValid);
    }

    [ExcludeFromCodeCoverage]
    public string[] GetSelectedAssetList()
    {
        return requirementPanel == null
            ? new string[0]
            : requirementPanel.transform.Cast<Transform>().Where(t => GetTemplateNFT(t).GetRequirementType() != "FT_INGREDIENT")
                                                        .Select(t => GetUIElementController(t).selectedAssetId)
                                                        .ToArray();
    }

    [ExcludeFromCodeCoverage]
    public string[] GetContractNameList()
    {
        return requirementPanel == null
            ? new string[0]
            : requirementPanel.transform.Cast<Transform>().Where(t => GetTemplateNFT(t).GetRequirementType() == "FT_INGREDIENT")
                                                        .Select(t => GetTemplateNFT(t).GetFungibleToken().contractName)
                                                        .ToArray();
    }

    [ExcludeFromCodeCoverage]
    public string[] GetTokenQuantityList()
    {
        return requirementPanel == null
            ? new string[0]
            : requirementPanel.transform.Cast<Transform>().Where(t => GetTemplateNFT(t).GetRequirementType() == "FT_INGREDIENT")
                                                        .Select(t => GetTemplateNFT(t).GetFungibleToken().GetFormattedAmount())
                                                        .ToArray();
    }

    [ExcludeFromCodeCoverage]
    public string[] GetTokenSymbolList()
    {
        return requirementPanel == null
            ? new string[0]
            : requirementPanel.transform.Cast<Transform>().Where(t => GetTemplateNFT(t).GetRequirementType() == "FT_INGREDIENT")
                                                        .Select(t => GetTemplateNFT(t).GetFungibleToken().GetFormattedTokenSymbol())
                                                        .ToArray();
    }
    
    // Attempts to submit the blending operation. If blending isn't possible or the blend isn't secured or whitelisted, the operation is cancelled.
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

    // Performs the blending operation by sending the blending transaction that ends up calling JS under folder Plugins/WrapperJS.jslib SubmitBlend()
    public void PerformBlend()
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

    // Performs a secured blending operation by sending the secured blending transaction that ends up calling JS under folder Plugins/WrapperJS.jslib SendSecuredBlend()
    public void PerformSecuredBlend()
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
}