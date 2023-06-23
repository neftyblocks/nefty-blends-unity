using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

/// <summary>
/// This script manages the Crafting UI, handling the display and interaction of crafting-related elements such as requirement and roll slots,
/// roll data, and blend protection. It includes methods for setting UI text, displaying roll sprites and percentages, displaying requirement images,
/// sorting and selecting assets in slots, displaying blend protection, and resetting slots. Serialized fields reference other components and prefabs used in the UI.
/// </summary>
public class CraftingUI : MonoBehaviour
{
    [SerializeField] public BlendProtectionController blendProtectionController;

    [SerializeField] private CraftingFetcher craftingFetcher;
    [SerializeField] public GameObject[] requirementSlots;
    [SerializeField] public GameObject[] rollSlots;
    [SerializeField] public GameObject recipeUI;
    [SerializeField] public GameObject requirementPrefab;
    [SerializeField] public GameObject rollPrefab;
    [SerializeField] public GameObject rollPaginationArrow;
    [SerializeField] public RectTransform requirementContainer;
    [SerializeField] public RectTransform rollContainer;
    [SerializeField] private TextMeshProUGUI rollNameText;
    [SerializeField] private TextMeshProUGUI rollPercentageText;
    [SerializeField] private TextMeshProUGUI rollResultCountText;

    [SerializeField] private UIController uIController;
    [SerializeField] public RollResult rollResults { get; set; }
    [SerializeField] public int apiCurrentPage { get; set; } = 1;
    [SerializeField] public int slotCount { get; set; } = 100;
    int currentRollSpriteIndex = 0;

    private void InstantiateSlots(int slotCount, GameObject slotPrefab, RectTransform container, ref GameObject[] slots)
    {
        slots = new GameObject[slotCount];

        for (int i = 0; i < slotCount; i++)
        {
            slots[i] = Instantiate(slotPrefab, container);
            slots[i].tag = "Craft";
        }
    }

    public void SetRollNameText(string text)
    {
        rollNameText.text = text;
    }

    public void SetRollPercentageText(string text)
    {
        rollPercentageText.text = "Chance: " + text + "%";
    }

    public void SetRollResultCountText(string text)
    {
        rollResultCountText.text = $"Possible results: : { text }";
    }

    public void InstantiateRequirementSlots(int slotCount)
    {
        ResetSlots(requirementContainer);
        InstantiateSlots(slotCount, requirementPrefab, requirementContainer, ref requirementSlots);
    }

    public void DisplayRollPaginationArrows(Sprite[] rollSprite)
    {
        if (rollSprite.Length >= 2)
        {
            rollPaginationArrow.SetActive(true);
        }
        else
        {
            rollPaginationArrow.SetActive(false);
        }
    }

    public void DisplayNextRollSprite()
    {
        currentRollSpriteIndex = (currentRollSpriteIndex + 1) % rollResults.rollSprites.Length;
        Transform nftImage = rollSlots[0].transform.Find("NFT_Image");
        nftImage.GetComponent<Image>().sprite = rollResults.rollSprites[currentRollSpriteIndex];
        SetRollNameText(rollResults.rollNames[currentRollSpriteIndex]);
        float rollPercentage = (float)rollResults.rollPercentageRolls[currentRollSpriteIndex] / rollResults.totalOdds * 100;
        rollPercentage = (float)Math.Round(rollPercentage, 1);
        SetRollPercentageText(rollPercentage.ToString());
    }

    public void DisplayPreviousRollSprite()
    {
        currentRollSpriteIndex--;
        if (currentRollSpriteIndex < 0)
        {
            currentRollSpriteIndex = rollResults.rollSprites.Length - 1;
        }
        Transform nftImage = rollSlots[0].transform.Find("NFT_Image");
        nftImage.GetComponent<Image>().sprite = rollResults.rollSprites[currentRollSpriteIndex];
        SetRollNameText(rollResults.rollNames[currentRollSpriteIndex]);
        float rollPercentage = ((float)rollResults.rollPercentageRolls[currentRollSpriteIndex] / rollResults.totalOdds * 100);
        rollPercentage = (float)Math.Round(rollPercentage, 1);
        SetRollPercentageText(rollPercentage.ToString());
    }

    public void InstantiateRollSlots(int slotCount)
    {
        ResetSlots(rollContainer);
        InstantiateSlots(slotCount, rollPrefab, rollContainer, ref rollSlots);
    }

    public void DisplayRollData(RollResult rollResult)
    {
        InstantiateRollSlots(1);
        rollResults = rollResult;

        if (rollResult.rollSprites != null && rollResult.rollSprites.Length > 0)
        {
            SetRollNameText(rollResults.rollNames[0]);
            float rollPercentage = ((float)rollResults.rollPercentageRolls[0] / rollResults.totalOdds * 100);
            rollPercentage = (float)Math.Round(rollPercentage, 1);
            SetRollPercentageText(rollPercentage.ToString());
            SetRollResultCountText(rollResult.rollSprites.Length.ToString());
        }
    }

    public async void DisplayRollImage(RollResult rollResult)
    {
        rollResults = rollResult;
        if (rollResult.rollSprites != null && rollResult.rollSprites.Length > 0)
        {
            Transform nftImage = rollSlots[0].transform.Find("NFT_Image");
            nftImage.GetComponent<Image>().sprite = await craftingFetcher.GetImageLoaderSpriteAsync(rollResult.rollSpritesHash[0]);

        }
    }
    public async Task DisplayRequirementsData(RequiredAssetsResult requiredAssetResult, IndexIngredientAssetsResult indexIngredientAssetsResult)
    {
        int totalRequiredAssets = requiredAssetResult.requiredAssetAmount.Sum();
        InstantiateRequirementSlots(totalRequiredAssets);
        int currentRequirementSlotIndex = 0;
        var listSize = requiredAssetResult.requiredAssetAmount.Count;

        for (int i = 0; i < listSize; i++)
        {
            if (requiredAssetResult.requirementType[i] == "FT_INGREDIENT")
            {
                for (int j = 0; j < requiredAssetResult.requiredAssetAmount[i]; j++)
                {
                    DisplayFTIngredientRequirement(requiredAssetResult, currentRequirementSlotIndex, i);
                    currentRequirementSlotIndex += requiredAssetResult.requiredAssetAmount[i];
                }
            }
            else
            {
                DisplayNFTIngredientRequirement(requiredAssetResult, currentRequirementSlotIndex, i);
                currentRequirementSlotIndex += requiredAssetResult.requiredAssetAmount[i];

            }
        }
        var sortedRequirementSlots = SortAssets(requirementSlots);
        SetupRequirements(sortedRequirementSlots, indexIngredientAssetsResult);
        ToggleMarketBuyButtonIfNeeded(sortedRequirementSlots, indexIngredientAssetsResult);
        await LoadRequirementSlotImages(sortedRequirementSlots, indexIngredientAssetsResult);
        uIController.ChangePrefabColor();
    }

    public void ToggleMarketBuyButtonIfNeeded(List<GameObject> sortedRequirementSlots, IndexIngredientAssetsResult indexIngredientAssetsResult)
    {
        foreach (var requirementSlot in sortedRequirementSlots)
        {
            var templateNFT = requirementSlot.GetComponent<TemplateNFT>();
            if (templateNFT.GetRequirementType() != "FT_INGREDIENT")
            {
                bool found = false;
                int blendIngredientIndex = templateNFT.GetBlendIngredientIndex();
                for (var i = 0; i < indexIngredientAssetsResult.assetIds.Count; i++)
                {
                    if (blendIngredientIndex == indexIngredientAssetsResult.indexId[i])
                    {
                        found = true;
                        break;
                    }
                }

                var hyperlinkButton = requirementSlot.transform.GetComponentInChildren<HyperlinkController>();
                hyperlinkButton.ToggleHyperlinkButton(!found);
            }
        }
    }

    // Method for sorting the assets based on priority.
    public List<GameObject> SortAssets(GameObject[] requirementSlots)
    {
        string[] priorityOrder = { "TEMPLATE_INGREDIENT", "ATTRIBUTE_INGREDIENT", "SCHEMA_INGREDIENT", "COLLECTION_INGREDIENT" };
        var sortedRequirementSlots = requirementSlots.OrderBy(slot => Array.IndexOf(priorityOrder, slot.GetComponent<TemplateNFT>().GetRequirementType())).ToList();
        return sortedRequirementSlots;
    }

    public void SetupRequirements(List<GameObject> sortedRequirementSlots, IndexIngredientAssetsResult indexIngredientAssetsResult)
    {
        List<string> selectedAssetIds = new List<string>();
        foreach (var requirementSlot in sortedRequirementSlots)
        {
            if (requirementSlot.GetComponent<TemplateNFT>().GetRequirementType() != "FT_INGREDIENT")
            {
                for (var i = 0; i < indexIngredientAssetsResult.assetIds.Count; i++)
                {
                    if (requirementSlot.GetComponent<TemplateNFT>().GetBlendIngredientIndex() == indexIngredientAssetsResult.indexId[i])
                    {
                        if (!selectedAssetIds.Contains(indexIngredientAssetsResult.assetIds[i]))
                        {
                            selectedAssetIds.Add(indexIngredientAssetsResult.assetIds[i]);
                            requirementSlot.GetComponent<RequirementUIElementController>().selectedAssetId = indexIngredientAssetsResult.assetIds[i];
                            requirementSlot.transform.Find("Selected_Ingredient_Background/SelectedIngredient").GetComponent<TextMeshProUGUI>().text = "Autoselected: # " + indexIngredientAssetsResult.mintNumbers[i];
                            break;
                        }
                    }
                }
            }
        }
    }

    public async Task LoadRequirementSlotImages(List<GameObject> sortedRequirementSlots, IndexIngredientAssetsResult indexIngredientAssetsResult)
    {
        List<string> selectedAssetIds = new List<string>();
        foreach (var requirementSlot in sortedRequirementSlots)
        {
            if (requirementSlot.GetComponent<TemplateNFT>().GetRequirementType() != "FT_INGREDIENT")
            {
                for (var i = 0; i < indexIngredientAssetsResult.assetIds.Count; i++)
                {
                    if (requirementSlot.GetComponent<TemplateNFT>().GetBlendIngredientIndex() == indexIngredientAssetsResult.indexId[i] && !selectedAssetIds.Contains(indexIngredientAssetsResult.assetIds[i]))
                    {
                        selectedAssetIds.Add(indexIngredientAssetsResult.assetIds[i]);
                        Sprite sprite = await craftingFetcher.GetImageLoaderSpriteAsync(indexIngredientAssetsResult.ingredientSpriteHashes[i]);
                        requirementSlot.transform.Find("NFT_Image").GetComponent<Image>().sprite = sprite;
                        break;
                    }
                }
            }
        }
    }

    private void DisplayFTIngredientRequirement(RequiredAssetsResult requiredAssetResult, int currentRequirementSlotIndex, int i)
    {
        for (int j = 0; j < requiredAssetResult.requiredAssetAmount[i]; j++)
        {
            Transform requirementText = requirementSlots[currentRequirementSlotIndex].transform.Find("Requirement_Background/Requirement_Text");
            Transform selectedIngredientText = requirementSlots[currentRequirementSlotIndex].transform.Find("Selected_Ingredient_Background/SelectedIngredient");
            var ftText = requirementSlots[currentRequirementSlotIndex].transform.Find("FT_Name");
            ftText.gameObject.SetActive(true);
            ftText.GetComponent<TextMeshProUGUI>().text = requiredAssetResult.fungibleToken[i].tokenSymbol;
            requirementSlots[currentRequirementSlotIndex].GetComponent<TemplateNFT>().SetRequirementType(requiredAssetResult.requirementType[i]);
            requirementText.GetComponent<TextMeshProUGUI>().text = "Token";
            selectedIngredientText.GetComponent<TextMeshProUGUI>().text = requiredAssetResult.fungibleToken[i].GetFormattedAmountWithoutSymbol();
            requirementSlots[currentRequirementSlotIndex].GetComponent<TemplateNFT>().SetBlendIngredientIndex(requiredAssetResult.ingredientIndex[i]);
            requirementSlots[currentRequirementSlotIndex].GetComponent<TemplateNFT>().SetFungibleToken(requiredAssetResult.fungibleToken[i]);
            currentRequirementSlotIndex++;
        }
    }

    private void DisplayNFTIngredientRequirement(RequiredAssetsResult requiredAssetResult, int currentRequirementSlotIndex, int index)
    {
        for (int j = 0; j < requiredAssetResult.requiredAssetAmount[index]; j++)
        {
            Transform nftImage = requirementSlots[currentRequirementSlotIndex].transform.Find(requiredAssetResult.requirementSpriteHashes[index] != null ? "NFT_Image" : "Requirement_Background/Requirement_Text");
            requirementSlots[currentRequirementSlotIndex].GetComponent<TemplateNFT>().SetRequirementType(requiredAssetResult.requirementType[index]);
            requirementSlots[currentRequirementSlotIndex].GetComponent<TemplateNFT>().SetBlendIngredientIndex(requiredAssetResult.ingredientIndex[index]);
            requirementSlots[currentRequirementSlotIndex].GetComponent<TemplateNFT>().SetRequirementHash(requiredAssetResult.requirementSpriteHashes[index]);
            requirementSlots[currentRequirementSlotIndex].GetComponent<TemplateNFT>().SetMarketplaceLink(requiredAssetResult.marketplaceLink[index]);
            if (requiredAssetResult.requirementSpriteHashes[index] == null)
            {
                nftImage.GetComponent<TextMeshProUGUI>().text = requiredAssetResult.requirementText[index];
            }
            currentRequirementSlotIndex++;
        }
    }

    public async Task DisplayAssetImages(RequiredAssetsResult  requiredAssetResult,IndexIngredientAssetsResult indexIngredientAssetsResult,RollResult rollResult,int securityId)
    {
        LoadDefaultRollImages(rollResult);
        DisplayRollData(rollResult);
        await DisplayRequirementsData(requiredAssetResult, indexIngredientAssetsResult);
        DisplayRollPaginationArrows(rollResult.rollSprites);
        DisplayBlendProtection(securityId);
        LoadRollImages(rollResult);
        DisplayRollImage(rollResult);
        LoadRequirementsImages(requirementSlots);
    }

    public async void LoadRequirementsImages(GameObject[] requirementSlots)
    {
        foreach (var requirementSlot in requirementSlots)
        {
            if (!string.IsNullOrEmpty(requirementSlot.GetComponent<TemplateNFT>().GetRequirementHash()))
            {
                Transform nftImage = requirementSlot.transform.Find("NFT_Image");
                nftImage.GetComponent<Image>().sprite = await craftingFetcher.GetImageLoaderSpriteAsync(requirementSlot.GetComponent<TemplateNFT>().GetRequirementHash());
            }
        }
    }

    public async void LoadRollImages(RollResult rollResult)
    {
        for (int i = 0; i < rollResult.rollSpritesHash.Length; i++)
        {
            rollResult.rollSprites[i] = await craftingFetcher.GetImageLoaderSpriteAsync(rollResult.rollSpritesHash[i]);
        }
    }

    public void LoadDefaultRollImages(RollResult rollResult)
    {
        rollResult.rollSprites = new Sprite[rollResult.rollSpritesHash.Length];
        for (int i = 0; i < rollResult.rollSpritesHash.Length; i++)
        {
            rollResult.rollSprites[i] = Resources.Load<Sprite>("UI/Burn_Image");
        }
    }

    public void DisplayBlendProtection(int securityId) 
    {
        if(securityId != 0)
        {
            blendProtectionController.IsBlendWhitelisted(securityId);

        }
        else
        {
            blendProtectionController.isSecured = false;
            blendProtectionController.whitelistUI.GetComponent<WhitelistUI>().DisplayWhitelistWarning(WhitelistStatus.NotProtected);

        }
    }

    public void ResetSlots(RectTransform container)
    {
        foreach(Transform child in container)
        {
            Destroy(child.gameObject);
        }
    }
}
