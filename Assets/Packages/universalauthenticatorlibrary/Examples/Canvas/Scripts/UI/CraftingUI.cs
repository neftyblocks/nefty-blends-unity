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

    [SerializeField] public GameObject ingredientPrefab;
    [SerializeField] public GameObject ownedIngredientPrefab;
    [SerializeField] public GameObject rollSlotPrefab;
    [SerializeField] public RectTransform prefabContainer;
    [SerializeField] public Sprite loadingImage;
    [SerializeField] public int currentPage { get; set; } = 1;
    [SerializeField] public int slotCount { get; set; }


    void Awake()
    {
        InstantiateRollWindow();
        InstantiateIngredientWindow();
        InstantiateOwnedIngredientWindow();
    }

    public void InstantiateRollWindow()
    {
        slotsRolls = new GameObject[1];


        slotsRolls[0] = Instantiate(rollSlotPrefab, prefabContainer);
        slotsRolls[0].tag = "Craft";
        slotsRolls[0].GetComponentInParent<RectTransform>().anchoredPosition = new Vector2(0 * 300, -0 * 300);
    }
    public void InstantiateIngredientWindow()
    {
        slotCount = 4;
        int slotSize = 150;
        int x = 2;
        int y = 0;
        slotsIngredient = new GameObject[slotCount];

        for (int i = 0; i < slotCount; i++)
        {
            slotsIngredient[i] = Instantiate(ingredientPrefab, prefabContainer);
            slotsIngredient[i].tag = "Craft";
            slotsIngredient[i].GetComponentInParent<RectTransform>().anchoredPosition = new Vector2(x * slotSize, -y * slotSize);
            x++;
        }
    }

    public void InstantiateOwnedIngredientWindow()
    {
        slotCount = 4;
        int slotSize = 150;
        int x = 2;
        float y = 1.1f;
        slotsOwned = new GameObject[slotCount];

        for (int i = 0; i < slotCount; i++)
        {
            slotsOwned[i] = Instantiate(ownedIngredientPrefab, prefabContainer);
            slotsOwned[i].tag = "Craft";
            slotsOwned[i].GetComponentInParent<RectTransform>().anchoredPosition = new Vector2(x * slotSize, -y * slotSize);
            x++;
        }
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

                Transform nftImage = slotsRolls[i].transform.Find("NFT_Image");
                nftImage.GetComponent<Image>().sprite = downloadedSprites[i];

            }
            for (int i = downloadedSprites.Length; i < 1; i++)
            {
                Transform nftImage = slotsRolls[i].transform.Find("NFT_Image");
                nftImage.GetComponent<Image>().sprite = loadingImage;
            }
        }
    }
    public void DisplayRequirementsImage(Sprite[] downloadedSprites)
    {
        if (downloadedSprites != null)
        {
            for (int i = 0; i < downloadedSprites.Length; i++)
            {
                Transform nftImage = slotsIngredient[i].transform.Find("NFT_Image");
                nftImage.GetComponent<Image>().sprite = downloadedSprites[i];
            }
            for (int i = downloadedSprites.Length; i < 4; i++)
            {
                Transform nftImage = slotsIngredient[i].transform.Find("NFT_Image");
                nftImage.GetComponent<Image>().sprite = loadingImage;
            }
        }
    }
    public void DisplayIngredientImage(Sprite[] downloadedSprites)
    {
        Debug.Log(downloadedSprites.Length);
        if (downloadedSprites != null)
        {
            for (int i = 0; i < downloadedSprites.Length; i++)
            {
                Transform nftImage = slotsOwned[i].transform.Find("NFT_Image");
                nftImage.GetComponent<Image>().sprite = downloadedSprites[i];
            }
            for (int i = downloadedSprites.Length; i < 4; i++)
            {
                Transform nftImage = slotsOwned[i].transform.Find("NFT_Image");
                nftImage.GetComponent<Image>().sprite = loadingImage;
            }
        }
    }
}
