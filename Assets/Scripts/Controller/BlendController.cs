using System;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

/// <summary>
/// The BlendController class manages the functionality for blending assets and submitting the transaction through JS Wrapper.
/// </summary>
public class BlendController : MonoBehaviour
{
    [SerializeField] public GameObject requirementPanel;
    [SerializeField] public BlendProtectionController blendProtectionController;
    [SerializeField] public CraftAssetPopupController craftAssetPopupController;
    public ISendTransactionJS sendTransactionJS;
    public IPopupOutputter popupOutputter;

    [ExcludeFromCodeCoverage]
    void Start()
    {
        sendTransactionJS = GameObject.Find("Javascript-Wrapper").GetComponent<SendTransactionJS>();
        popupOutputter = GameObject.Find("PopupOutputterPanel").GetComponent<PopupOutputter>();
    }

    private RequirementUIElementController GetUIElementController(Transform child)
    {
        return child.GetComponent<RequirementUIElementController>();
    }

    private TemplateNFT GetTemplateNFT(Transform child)
    {
        return child.GetComponent<TemplateNFT>();
    }

    // Checks if a child is valid for the blending operation.
    // A child is valid if it has a selected asset or if its requirement type is FT_INGREDIENT.
    private bool IsRequirementPanelChildValid(Transform child)
    {
        var uiController = GetUIElementController(child);
        var templateNFT = GetTemplateNFT(child);

        return !string.IsNullOrEmpty(uiController.selectedAssetId) || templateNFT.GetRequirementType() == "FT_INGREDIENT";
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
            ? Array.Empty<string>()
            : requirementPanel.transform.Cast<Transform>().Where(t => GetTemplateNFT(t).GetRequirementType() != "FT_INGREDIENT")
                                                        .Select(t => GetUIElementController(t).selectedAssetId)
                                                        .ToArray();
    }

    [ExcludeFromCodeCoverage]
    private string[] GetContractNameList()
    {
        return requirementPanel == null
            ? Array.Empty<string>()
            : requirementPanel.transform.Cast<Transform>().Where(t => GetTemplateNFT(t).GetRequirementType() == "FT_INGREDIENT")
                                                        .Select(t => GetTemplateNFT(t).GetFungibleToken().contractName)
                                                        .ToArray();
    }

    [ExcludeFromCodeCoverage]
    private string[] GetTokenQuantityList()
    {
        return requirementPanel == null
            ? Array.Empty<string>()
            : requirementPanel.transform.Cast<Transform>().Where(t => GetTemplateNFT(t).GetRequirementType() == "FT_INGREDIENT")
                                                        .Select(t => GetTemplateNFT(t).GetFungibleToken().GetFormattedAmount())
                                                        .ToArray();
    }

    [ExcludeFromCodeCoverage]
    private string[] GetTokenSymbolList()
    {
        return requirementPanel == null
            ? Array.Empty<string>()
            : requirementPanel.transform.Cast<Transform>().Where(t => GetTemplateNFT(t).GetRequirementType() == "FT_INGREDIENT")
                                                        .Select(t => GetTemplateNFT(t).GetFungibleToken().GetFormattedTokenSymbol())
                                                        .ToArray();
    }

    // ClearSelectedAssetIds is called within JS after blend is successful.
    public void ClearSelectedAssetIdsFromRequirements()
    {
        if (requirementPanel == null)
            return;

        foreach (Transform child in requirementPanel.transform)
        {
            var uiController = GetUIElementController(child);
            if (uiController != null)
                uiController.selectedAssetId = string.Empty;

            Transform requirementObject = child.Find("Selected_Ingredient_Background/SelectedIngredient");
            if (requirementObject != null)
            {
                child.Find("NFT_Image").GetComponent<Image>().sprite = Resources.Load<Sprite>("UI/Empty_Image");
                if (requirementObject.TryGetComponent<TextMeshProUGUI>(out var textMesh))
                    textMesh.text = string.Empty;
            }
        }
    }

    // Attempts to submit the blending operation. If blending isn't possible or the blend isn't secured or whitelisted, the operation is cancelled.
    public void SubmitBlend()
    {
        if (!CanBlend())
        {
            popupOutputter.ShowError("Not all ingredients are selected.");
            return;
        }

        if (!blendProtectionController.isSecured)
        {
            PerformBlend();
            return;
        }

        if (!blendProtectionController.isWhitelisted)
        {
            popupOutputter.ShowError("You are not whitelisted.");
            return;
        }
        PerformSecuredBlend();
    }

    // Performs the blending operation by sending the blending transaction that ends up calling JS under folder Plugins/WrapperJS.jslib SubmitBlend()
    private void PerformBlend()
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
    private void PerformSecuredBlend()
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