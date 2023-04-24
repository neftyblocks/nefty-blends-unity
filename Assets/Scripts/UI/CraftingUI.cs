using System;
using System.Collections.Generic;
using System.Linq;
using TMPro;
using UnityEditor.VersionControl;
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
    [SerializeField] public Sprite[] rollImages { get; set; }
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
        currentRollSpriteIndex = (currentRollSpriteIndex + 1) % rollImages.Length;
        Transform nftImage = rollSlots[0].transform.Find("NFT_Image");
        nftImage.GetComponent<Image>().sprite = rollImages[currentRollSpriteIndex];
    }

    public void DisplayPreviousRollSprite()
    {
        currentRollSpriteIndex--;
        if (currentRollSpriteIndex < 0)
        {
            currentRollSpriteIndex = rollImages.Length - 1;
        }
        Transform nftImage = rollSlots[0].transform.Find("NFT_Image");
        nftImage.GetComponent<Image>().sprite = rollImages[currentRollSpriteIndex];
    }

    public void InstantiateRollSlots(int slotCount)
    {
        ResetSlots(rollSlots);
        InstantiateSlots(slotCount, rollPrefab, rollContainer, ref rollSlots);
    }

    public void DisplayRollImage(Sprite[] downloadedSprites)
    {
        InstantiateRollSlots(1);
        rollImages = downloadedSprites;
        if (downloadedSprites != null && downloadedSprites.Length > 0)
        {
            Transform nftImage = rollSlots[0].transform.Find("NFT_Image");
            nftImage.GetComponent<Image>().sprite = downloadedSprites[0];
        }
        GameObject.Find("ResultNameText").GetComponent<TextMeshProUGUI>().text = "test";
    }

    public void DisplayRequirementsImage(RequiredAssetsResult requiredAssetResult, IndexIngredientAssetsResult indexIngredientAssetsResult)
    {
        Dictionary<int, List<string>> indexToAssetIds = new Dictionary<int, List<string>>();
        for (int i = 0; i < indexIngredientAssetsResult.indexId.Length; i++)
        {
            int index = indexIngredientAssetsResult.indexId[i];
            string assetId = indexIngredientAssetsResult.assetIds[i];

            if (!indexToAssetIds.ContainsKey(index))
            {
                indexToAssetIds[index] = new List<string>();
            }

            indexToAssetIds[index].Add(assetId);
        }

        foreach (KeyValuePair<int, List<string>> kvp in indexToAssetIds)
        {
            int index = kvp.Key;
            List<string> assetIds = kvp.Value;

            Debug.Log("Index " + index + " has " + assetIds.Count + " assetIds:");
            foreach (string assetId in assetIds)
            {
                Debug.Log(assetId);
            }
        }

            if (requiredAssetResult.requirementSprites != null)
        {
            int totalRequiredAssets = requiredAssetResult.requiredAssetAmount.Sum();
            InstantiateRequirementSlots(totalRequiredAssets);
            int currentRequirementSlotIndex = 0;

            for (int i = 0; i < requiredAssetResult.requiredAssetAmount.Length; i++)
            {
                var assetCounter = 0;

                for (int j = 0; j < requiredAssetResult.requiredAssetAmount[i]; j++)
                {
                    Transform nftImage = requirementSlots[currentRequirementSlotIndex].transform.Find("NFT_Image");
                    nftImage.GetComponent<Image>().sprite = requiredAssetResult.requirementSprites[i];
                    requirementSlots[currentRequirementSlotIndex].GetComponent<TemplateNFT>().SetTemplateId(requiredAssetResult.templateId[i]);
                    requirementSlots[currentRequirementSlotIndex].GetComponent<TemplateNFT>().SetBlendIngredientIndex(i);

                    if (requirementSlots[currentRequirementSlotIndex].GetComponent<TemplateNFT>().GetBlendIngredientIndex() == i)
                    {
                        if (indexToAssetIds.ContainsKey(i))
                        {
                            if (assetCounter < indexToAssetIds[i].Count)
                            {
                                requirementSlots[currentRequirementSlotIndex].GetComponent<TemplateUIElementController>().selectedAssetId = indexToAssetIds[i][assetCounter];
                                requirementSlots[currentRequirementSlotIndex].transform.Find("SelectedIngredient").GetComponent<TextMeshProUGUI>().text = indexToAssetIds[i][assetCounter];
                                assetCounter++;
                            }
                            else
                            {
                                requirementSlots[currentRequirementSlotIndex].GetComponent<TemplateUIElementController>().selectedAssetId = "";
                                requirementSlots[currentRequirementSlotIndex].transform.Find("SelectedIngredient").GetComponent<TextMeshProUGUI>().text = "";
                            }
                        }
                    }
                    currentRequirementSlotIndex++;
                }
            }
        }
    }

    public void DisplayIngredientImage(Sprite[] downloadedSprites, string[] assetIds)
    {
        if (downloadedSprites != null)
        {
            InstantiateIngredientSlots(downloadedSprites.Length);

            for (int i = 0; i < downloadedSprites.Length; i++)
            {
                Transform nftImage = ingredientSlots[i].transform.Find("NFT_Image");
                nftImage.GetComponent<Image>().sprite = downloadedSprites[i];
                ingredientSlots[i].GetComponent<NFT>().SetAsssetId(assetIds[i]);
            }
        }
    }

    public void DisplayAssetImages(RequiredAssetsResult  requiredAssetResult,IndexIngredientAssetsResult indexIngredientAssetsResult)
    {
        DisplayRollImage(requiredAssetResult.rollSprites);
        DisplayRequirementsImage(requiredAssetResult, indexIngredientAssetsResult);
        DisplayIngredientImage(indexIngredientAssetsResult.ingredientSprites, indexIngredientAssetsResult.assetIds);
        DisplayRollPaginationArrows(requiredAssetResult.rollSprites);
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
