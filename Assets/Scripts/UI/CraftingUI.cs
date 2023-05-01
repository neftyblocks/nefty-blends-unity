using System;
using System.Collections.Generic;
using System.Linq;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class CraftingUI : MonoBehaviour
{
    [SerializeField] private CraftingFetcher craftingFetcher;
    [SerializeField] public GameObject[] ingredientSlots;
    [SerializeField] public GameObject[] requirementSlots;
    [SerializeField] public GameObject[] rollSlots;
    [SerializeField] public GameObject recipeUI;
    [SerializeField] public GameObject ingredientUI;
    [SerializeField] public GameObject requirementPrefab;
    [SerializeField] public GameObject ingredientPrefab;
    [SerializeField] public GameObject rollPrefab;
    [SerializeField] public GameObject rollPaginationArrow;
    [SerializeField] public RectTransform requirementContainer;
    [SerializeField] public RectTransform ingredientContainer;
    [SerializeField] public RectTransform rollContainer;
    [SerializeField] private TextMeshProUGUI rollNameText;
    [SerializeField] private TextMeshProUGUI rollPercentageText;
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

    public void InstantiateIngredientSlots(int slotCount)
    {
        ResetSlots(ingredientSlots);
        InstantiateSlots(slotCount, ingredientPrefab, ingredientContainer, ref ingredientSlots);
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
        float rollPercentage = ((float)rollResults.rollPercentageRolls[currentRollSpriteIndex] / rollResults.totalOdds * 100);
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
            Transform nftImage = rollSlots[0].transform.Find("NFT_Image");
            nftImage.GetComponent<Image>().sprite = rollResult.rollSprites[0];
            rollNameText.text = rollResults.rollNames[0];
            float rollPercentage = ((float)rollResults.rollPercentageRolls[0] / rollResults.totalOdds * 100);
            rollPercentage = (float)Math.Round(rollPercentage, 1);
            rollPercentageText.text = rollPercentage.ToString() + "%";
        }
    }
    public void DisplayRequirementsImage(RequiredAssetsResult requiredAssetResult, IndexIngredientAssetsResult indexIngredientAssetsResult)
    {
        int totalRequiredAssets = requiredAssetResult.requiredAssetAmount.Sum();
        InstantiateRequirementSlots(totalRequiredAssets);
        int currentRequirementSlotIndex = 0;
        var listSize = requiredAssetResult.requiredAssetAmount.Count;

        // Define a list to keep track of selected asset IDs
        List<string> selectedAssetIds = new List<string>();

        for (int i = 0; i < listSize && currentRequirementSlotIndex < requirementSlots.Length; i++)
        {
            if (requiredAssetResult.requirementType[i] == "FT_INGREDIENT")
            {
                for (int j = 0; j < requiredAssetResult.requiredAssetAmount[i] && currentRequirementSlotIndex < requirementSlots.Length; j++)
                {
                    Transform nftText = requirementSlots[currentRequirementSlotIndex].transform.Find("NFT_Text");
                    requirementSlots[currentRequirementSlotIndex].GetComponent<TemplateNFT>().SetRequirementType(requiredAssetResult.requirementType[i]);
                    nftText.GetComponent<TextMeshProUGUI>().text = requiredAssetResult.requirementText[i];
                    requirementSlots[currentRequirementSlotIndex].GetComponent<TemplateNFT>().SetBlendIngredientIndex(requiredAssetResult.ingredientIndex[i]);
                    currentRequirementSlotIndex++;
                }
            }
            else
            {
                Transform nftImage = requirementSlots[currentRequirementSlotIndex].transform.Find(requiredAssetResult.requirementSprites[i] != null ? "NFT_Image" : "NFT_Text");
                requirementSlots[currentRequirementSlotIndex].GetComponent<TemplateNFT>().SetRequirementType(requiredAssetResult.requirementType[i]);

                if (requiredAssetResult.requirementSprites[i] != null)
                {
                    nftImage.GetComponent<Image>().sprite = requiredAssetResult.requirementSprites[i];
                }
                else
                {
                    nftImage.GetComponent<TextMeshProUGUI>().text = requiredAssetResult.requirementText[i];
                }
                requirementSlots[currentRequirementSlotIndex].GetComponent<TemplateNFT>().SetBlendIngredientIndex(requiredAssetResult.ingredientIndex[i]);

                bool assetIdSelected = false;
                string selectedAssetId = "";
                String[] priorityOrder = { "TEMPLATE_INGREDIENT", "SCHEMA_INGREDIENT", "COLLECTION_INGREDIENT", "ATTRIBUTE_INGREDIENT" };

                foreach (var item in priorityOrder)
                {
                    if (!assetIdSelected)
                    {
                        for (int k = 0; k < indexIngredientAssetsResult.indexId.Count; k++)
                        {
                            // Check if the current asset ID has already been selected
                            if (selectedAssetIds.Contains(indexIngredientAssetsResult.assetIds[k]))
                            {
                                continue; // Skip this asset ID if it has already been selected
                            }

                            // Check if the current asset ID has already been assigned to another requirement slot
                            bool assetIdAssigned = false;
                            for (int l = 0; l < currentRequirementSlotIndex; l++)
                            {
                                if (requirementSlots[l].GetComponent<TemplateUIElementController>().selectedAssetId == indexIngredientAssetsResult.assetIds[k])
                                {
                                    assetIdAssigned = true;
                                    break;
                                }
                            }

                            if (requiredAssetResult.requirementType[i].Equals(item) && !assetIdAssigned)
                            {
                                selectedAssetId = indexIngredientAssetsResult.assetIds[k];
                                assetIdSelected = true;
                                break;
                            }
                        }
                    }
                }
                // Update SelectedIngredient text if an asset ID was selected
                if (assetIdSelected)
                {
                    requirementSlots[currentRequirementSlotIndex].GetComponent<TemplateUIElementController>().selectedAssetId = selectedAssetId;
                    requirementSlots[currentRequirementSlotIndex].transform.Find("SelectedIngredient").GetComponent<TextMeshProUGUI>().text = selectedAssetId;
                    selectedAssetIds.Add(selectedAssetId);
                }

                currentRequirementSlotIndex++;
            }
        }
    }

    public void DisplayIngredientImage(IndexIngredientAssetsResult indexIngredientAssetsResult)
    {
        var resultCount = indexIngredientAssetsResult.ingredientSprites.Count;
        if (indexIngredientAssetsResult.ingredientSprites != null)
        {
            InstantiateIngredientSlots(resultCount);
            for (int i = 0; i < resultCount; i++)
            {
                Transform nftImage = ingredientSlots[i].transform.Find("NFT_Image");
                nftImage.GetComponent<Image>().sprite = indexIngredientAssetsResult.ingredientSprites[i];
                ingredientSlots[i].GetComponent<NFT>().SetAsssetId(indexIngredientAssetsResult.assetIds[i]);
            }
        }
    }


    public void DisplayAssetImages(RequiredAssetsResult  requiredAssetResult,IndexIngredientAssetsResult indexIngredientAssetsResult,RollResult rollResult)
    {
        DisplayRollData(rollResult);
        DisplayRequirementsImage(requiredAssetResult, indexIngredientAssetsResult);
        DisplayIngredientImage(indexIngredientAssetsResult);
        DisplayRollPaginationArrows(rollResult.rollSprites);
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

    public void SwitchRecipeIngredientWindow()
    {
        recipeUI.SetActive(!recipeUI.activeSelf);
        ingredientUI.SetActive(!ingredientUI.activeSelf);
        TextMeshProUGUI tabSwitcherText = gameObject.transform.Find("Utility/TabSwitcherButton/TabSwitcherText").GetComponent<TextMeshProUGUI>();
        tabSwitcherText.text = recipeUI.activeSelf ? "Requirements" : "Inventory";
    }
}
