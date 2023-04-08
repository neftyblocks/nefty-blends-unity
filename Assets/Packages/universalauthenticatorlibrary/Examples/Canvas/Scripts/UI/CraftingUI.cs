using UnityEngine;
using UnityEngine.UI;

public class CraftingUI : MonoBehaviour
{
    [SerializeField] private DashboardController dashboardController;
    [SerializeField] private CraftingFetcher craftingFetcher;
    [SerializeField] public GameObject[] ingredientSlots;
    [SerializeField] public GameObject[] requirementSlots;
    [SerializeField] public GameObject[] rewardSlots;
    [SerializeField] public GameObject recipeUI;
    [SerializeField] public GameObject ingredientUI;
    [SerializeField] public GameObject requirementPrefab;
    [SerializeField] public GameObject ingredientPrefab;
    [SerializeField] public GameObject rewardPrefab;
    [SerializeField] public RectTransform requirementContainer;
    [SerializeField] public RectTransform ingredientContainer;
    [SerializeField] public RectTransform rewardContainer;
    [SerializeField] public int apiCurrentPage { get; set; } = 1;
    [SerializeField] public int slotCount { get; set; } = 100;

    public void DisplayAssetImages(Sprite[] rollSprite, Sprite[] requirementSprites, Sprite[] ingredientSprites)
    {
        DisplayRollImage(rollSprite);
        DisplayRequirementsImage(requirementSprites);
        DisplayIngredientImage(ingredientSprites);
    }

    private void InstantiateSlots(int slotCount, GameObject slotPrefab, RectTransform container)
    {
        GameObject[] slots = new GameObject[slotCount];

        for (int i = 0; i < slotCount; i++)
        {
            slots[i] = Instantiate(slotPrefab, container);
            slots[i].tag = "Craft";
        }
    }

    public void InstantiateRequirementSlots(int slotCount)
    {
        requirementSlots = new GameObject[slotCount];

        for (int i = 0; i < slotCount; i++)
        {
            requirementSlots[i] = Instantiate(requirementPrefab, requirementContainer);
            requirementSlots[i].tag = "Craft";
        }
    }

    public void InstantiateIngredientSlots(int slotcount)
    {
        ingredientSlots = new GameObject[slotcount];

        for (int i = 0; i < slotcount; i++)
        {
            ingredientSlots[i] = Instantiate(ingredientPrefab, ingredientContainer);
            ingredientSlots[i].tag = "Craft";
        }
    }

    public void DisplayRollImage(Sprite[] downloadedSprites)
    {
        if (downloadedSprites != null)
        {
            for (int i = 0; i < downloadedSprites.Length; i++)
            {
               rewardContainer.GetComponent<Image>().sprite = downloadedSprites[i];
            }
        }
    }
    public void DisplayRequirementsImage(Sprite[] downloadedSprites)
    {
        if (downloadedSprites != null)
        {
            InstantiateRequirementSlots(downloadedSprites.Length);
            for (int i = 0; i < downloadedSprites.Length; i++)
            {
                Transform nftImage = requirementSlots[i].transform.Find("NFT_Image");
                nftImage.GetComponent<Image>().sprite = downloadedSprites[i];
            }
        }
    }
    public void DisplayIngredientImage(Sprite[] downloadedSprites)
    {
        if (downloadedSprites != null)
        {
            InstantiateIngredientSlots(downloadedSprites.Length);
            for (int i = 0; i < downloadedSprites.Length; i++)
            {
                Transform nftImage = ingredientSlots[i].transform.Find("NFT_Image");
                nftImage.GetComponent<Image>().sprite = downloadedSprites[i];
            }
        }
    }
    public void SwitchRecipeIngredientWindow()
    {
        recipeUI.SetActive(!recipeUI.activeSelf);
        ingredientUI.SetActive(!ingredientUI.activeSelf);
    }
}
