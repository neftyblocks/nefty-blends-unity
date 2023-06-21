using System;
using System.Collections.Generic;
using System.Linq;
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
        rollPercentageText.text = "Probability: " + text + "%";
    }

    public void InstantiateRequirementSlots(int slotCount)
    {
        ResetSlots(requirementSlots);
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
        rollNameText.text = rollResults.rollNames[currentRollSpriteIndex];
        float rollPercentage = (float)rollResults.rollPercentageRolls[currentRollSpriteIndex] / rollResults.totalOdds * 100;
        rollPercentage = (float)Math.Round(rollPercentage, 1);
        rollPercentageText.text = rollPercentage.ToString() + "%";
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
        rollNameText.text = rollResults.rollNames[currentRollSpriteIndex];
        float rollPercentage = ((float)rollResults.rollPercentageRolls[currentRollSpriteIndex] / rollResults.totalOdds * 100);
        rollPercentage = (float)Math.Round(rollPercentage, 1);
        rollPercentageText.text = rollPercentage.ToString() + "%";
    }

    public void InstantiateRollSlots(int slotCount)
    {
        ResetSlots(rollSlots);
        InstantiateSlots(slotCount, rollPrefab, rollContainer, ref rollSlots);
    }

    public void DisplayRollData(RollResult rollResult)
    {
        InstantiateRollSlots(1);
        rollResults = rollResult;

        if (rollResult.rollSprites != null && rollResult.rollSprites.Length > 0)
        {
            rollNameText.text = rollResults.rollNames[0];
            float rollPercentage = ((float)rollResults.rollPercentageRolls[0] / rollResults.totalOdds * 100);
            rollPercentage = (float)Math.Round(rollPercentage, 1);
            rollPercentageText.text = rollPercentage.ToString() + "%";
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
    public void DisplayRequirementsData(RequiredAssetsResult requiredAssetResult, IndexIngredientAssetsResult indexIngredientAssetsResult)
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
        SortAndSelectAssetsInRequirementSlots(requirementSlots,indexIngredientAssetsResult);
        uIController.ChangePrefabColor();

    }

    // Sort and select the assets in the requirement slots based on priority.
    public async void SortAndSelectAssetsInRequirementSlots(GameObject[] requirementSlots, IndexIngredientAssetsResult indexIngredientAssetsResult)
    {
        string[] priorityOrder = { "TEMPLATE_INGREDIENT", "ATTRIBUTE_INGREDIENT", "SCHEMA_INGREDIENT", "COLLECTION_INGREDIENT" };
        var sortedRequirementSlots = requirementSlots.OrderBy(slot => Array.IndexOf(priorityOrder, slot.GetComponent<TemplateNFT>().GetRequirementType())).ToList();

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
                            requirementSlot.transform.Find("NFT_Image").GetComponent<Image>().sprite = await craftingFetcher.GetImageLoaderSpriteAsync(indexIngredientAssetsResult.ingredientSpriteHashes[i]); ;
                            requirementSlot.transform.Find("Selected_Ingredient_Background/SelectedIngredient").GetComponent<TextMeshProUGUI>().text = "Autoselected: # " + indexIngredientAssetsResult.mintNumbers[i];
                            break;
                        }
                    }
                }
            }
        }
    }

    private void DisplayFTIngredientRequirement(RequiredAssetsResult requiredAssetResult, int currentRequirementSlotIndex, int i)
    {
        for (int j = 0; j < requiredAssetResult.requiredAssetAmount[i]; j++)
        {
            Transform nftText = requirementSlots[currentRequirementSlotIndex].transform.Find("Requirement_Background/Requirement_Text");
            requirementSlots[currentRequirementSlotIndex].GetComponent<TemplateNFT>().SetRequirementType(requiredAssetResult.requirementType[i]);
            nftText.GetComponent<TextMeshProUGUI>().text = requiredAssetResult.requirementText[i];
            requirementSlots[currentRequirementSlotIndex].GetComponent<TemplateNFT>().SetBlendIngredientIndex(requiredAssetResult.ingredientIndex[i]);
            requirementSlots[currentRequirementSlotIndex].GetComponent<TemplateNFT>().SetFungibleToken(requiredAssetResult.fungibleToken[i]);
            currentRequirementSlotIndex++;
        }
    }

    private void DisplayNFTIngredientRequirement(RequiredAssetsResult requiredAssetResult, int currentRequirementSlotIndex, int i)
    {
        for (int j = 0; j < requiredAssetResult.requiredAssetAmount[i]; j++)
        {
            Transform nftImage = requirementSlots[currentRequirementSlotIndex].transform.Find(requiredAssetResult.requirementSpriteHashes[i] != null ? "NFT_Image" : "Requirement_Background/Requirement_Text");
            requirementSlots[currentRequirementSlotIndex].GetComponent<TemplateNFT>().SetRequirementType(requiredAssetResult.requirementType[i]);
            requirementSlots[currentRequirementSlotIndex].GetComponent<TemplateNFT>().SetBlendIngredientIndex(requiredAssetResult.ingredientIndex[i]);
            requirementSlots[currentRequirementSlotIndex].GetComponent<TemplateNFT>().SetRequirementHash(requiredAssetResult.requirementSpriteHashes[i]);
            if (requiredAssetResult.requirementSpriteHashes[i] == null)
            {
                nftImage.GetComponent<TextMeshProUGUI>().text = requiredAssetResult.requirementText[i];
            }
            currentRequirementSlotIndex++;
        }
    }

    public void DisplayAssetImages(RequiredAssetsResult  requiredAssetResult,IndexIngredientAssetsResult indexIngredientAssetsResult,RollResult rollResult,int securityId)
    {
        LoadDefaultRollImages(rollResult);
        DisplayRollData(rollResult);
        DisplayRequirementsData(requiredAssetResult, indexIngredientAssetsResult);
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

    public void ResetSlots(GameObject[] gameObjects)
    {
        for (int i = 0; i < gameObjects.Length; i++)
        {
            if (gameObjects[i] != null)
            {
                Destroy(gameObjects[i]); 
            }

            gameObjects[i] = null;
        }
    }
}
