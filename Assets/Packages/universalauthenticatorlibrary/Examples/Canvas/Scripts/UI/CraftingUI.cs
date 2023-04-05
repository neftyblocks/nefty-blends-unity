using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.PlayerLoop;
using UnityEngine.UI;

public class CraftingUI : MonoBehaviour
{
    [SerializeField] private DashboardController dashboardController;
    [SerializeField] private CraftingFetcher craftingFetcher;
    [SerializeField] public GameObject[] slotsOwned;
    [SerializeField] public GameObject[] slotsIngredient;
    [SerializeField] public GameObject[] slotsRolls;

    [SerializeField] public GameObject recipeWindow;
    [SerializeField] public GameObject ingredientWindow;
    [SerializeField] public GameObject ingredientPrefab;
    [SerializeField] public GameObject ownedIngredientPrefab;
    [SerializeField] public GameObject rollSlotPrefab;
    [SerializeField] public RectTransform prefabContainer;
    [SerializeField] public RectTransform ingredientContainer;

    [SerializeField] public RectTransform rollImageContainer;
    [SerializeField] public GameObject rollImageSlot;

    [SerializeField] public Sprite loadingImage;
    [SerializeField] public int currentPage { get; set; } = 1;
    [SerializeField] public int slotCount { get; set; }

    public void InstantiateRequirementWindow(int slotCount)
    {
        int slotSize = 150;

        slotsIngredient = new GameObject[slotCount];

        for (int i = 0; i < slotCount; i++)
        {
            slotsIngredient[i] = Instantiate(ingredientPrefab, prefabContainer);
            slotsIngredient[i].tag = "Craft";
            slotsIngredient[i].GetComponentInParent<RectTransform>().anchoredPosition = new Vector2(slotSize,  slotSize);
        }
    }

    public void InstantiateOwnedIngredientWindow(int slotcount)
    {
        int slotSize = 150;

        Debug.Log("slotcount: " + slotcount);
        Debug.Log(ownedIngredientPrefab);
        Debug.Log(ingredientContainer);
        slotsOwned = new GameObject[slotcount];
        for (int i = 0; i < slotcount; i++)
        {
            Debug.Log("Here");
            slotsOwned[i] = Instantiate(ownedIngredientPrefab, ingredientContainer);
            slotsOwned[i].tag = "Craft";
            slotsOwned[i].GetComponentInParent<RectTransform>().anchoredPosition = new Vector2(slotSize, slotSize);
        }
        Debug.Log("Gone");
    }

    public void DisplayAssetImages(Sprite[] rollSprite, Sprite[] requirementSprites, Sprite[] ingredientSprites)
    {
        DisplayRollImage(rollSprite);
        DisplayRequirementsImage(requirementSprites);
        DisplayIngredientImage(ingredientSprites);
    }

    public void DisplayRollImage(Sprite[] downloadedSprites)
    {

        if (downloadedSprites != null)
        {
            for (int i = 0; i < downloadedSprites.Length; i++)
            {

                rollImageSlot.GetComponent<Image>().sprite = downloadedSprites[i];

            }
            for (int i = downloadedSprites.Length; i < 1; i++)
            {
                Transform nftImage = slotsRolls[i].transform.Find("NFT_Image");
                rollImageSlot.GetComponent<Image>().sprite = loadingImage;
            }
        }
    }
    public void DisplayRequirementsImage(Sprite[] downloadedSprites)
    {
        if (downloadedSprites != null)
        {
            InstantiateRequirementWindow(downloadedSprites.Length);
            for (int i = 0; i < downloadedSprites.Length; i++)
            {
                Transform nftImage = slotsIngredient[i].transform.Find("NFT_Image");
                nftImage.GetComponent<Image>().sprite = downloadedSprites[i];
            }
        }
    }
    public void DisplayIngredientImage(Sprite[] downloadedSprites)
    {
        if (downloadedSprites != null || downloadedSprites.Length > 0)
        {
            Debug.Log(downloadedSprites.Length);
            InstantiateOwnedIngredientWindow(downloadedSprites.Length);
            for (int i = 0; i < downloadedSprites.Length; i++)
            {
                Transform nftImage = slotsOwned[i].transform.Find("NFT_Image");
                nftImage.GetComponent<Image>().sprite = downloadedSprites[i];
            }
        }
    }
    public void SwitchRecipeIngredientWindow()
    {
        recipeWindow.SetActive(!recipeWindow.activeSelf);
        ingredientWindow.SetActive(!ingredientWindow.activeSelf);
    }
}
