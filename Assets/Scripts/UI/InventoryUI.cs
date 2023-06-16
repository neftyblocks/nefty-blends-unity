using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TMPro;
using UnityEngine;
using UnityEngine.PlayerLoop;
using UnityEngine.UI;

/// <summary>
/// The InventoryUI class is responsible for managing the UI elements related to the player's inventory.
/// It handles displaying asset images, refreshing inventory slots, and updating wallet and asset count texts.
/// </summary>
public class InventoryUI : MonoBehaviour
{
    [SerializeField] private TextMeshProUGUI walletNameText;
    [SerializeField] private TextMeshProUGUI totalAssetText;
    [SerializeField] private InventoryFetcherController inventoryFetcherController;
    [SerializeField] private GameObject[] inventorySlots;
    [SerializeField] private GameObject inventoryAssetPrefab;
    [SerializeField] private RectTransform inventoryContainer;
    [SerializeField] private UIController uIController;
    [SerializeField] private TMP_InputField searchInput;
    [SerializeField] private TMP_Dropdown filterDropdown;
    [SerializeField] public int apiCurrentPage { get; set; } = 1;

    private void Start()
    {
        filterDropdown.onValueChanged.AddListener(OnDropdownValueChanged);
        searchInput.onValueChanged.AddListener(FilterAssets);

    }

    // Listen to filterDropdown if value changed
    private void OnDropdownValueChanged(int selectedIndex)
    {
        string selectedAssetName = filterDropdown.options[selectedIndex].text;
        RefreshInventorySlots(GetCurrentFilterSelected());

    }

    public string GetCurrentFilterSelected()
    {
        // Retrieve the current value
        int currentValue = filterDropdown.value;
        return filterDropdown.options[currentValue].text;
    }

    private void FilterAssets(string search)
    {
        foreach (GameObject obj in inventorySlots)
        {
            // Set the object's active state based on whether the name contains the search text
            obj.SetActive(obj.GetComponent<NFT>().GetAssetName().ToLower().Contains(search.ToLower()));
        }
    }
    public async void DisplayAssetImages(InventoryAsset inventoryAsset)
    {
        for (int i = 0; i < inventoryAsset.inventoryAssetSprites.Count; i++)
        {
            inventorySlots[i] = Instantiate(inventoryAssetPrefab, inventoryContainer);
            inventorySlots[i].tag = "Asset";
            inventorySlots[i].GetComponent<NFT>().SetAsssetId(inventoryAsset.invenoryAssetIds[i]);
            inventorySlots[i].GetComponent<NFT>().SetAssetName(inventoryAsset.inventoryAssetName[i]);
            inventorySlots[i].GetComponent<NFT>().SetMintNumber(inventoryAsset.inventoryAssetMintNumber[i]);
            Transform nftImage = inventorySlots[i].transform.Find("NFT_Image");
            Transform nftName = inventorySlots[i].transform.Find("Asset_Name_Background/Asset_Name_Text");
            nftName.GetComponent<TextMeshProUGUI>().text = TextTruncation.TruncateText(inventorySlots[i].GetComponent<NFT>().GetAssetName(), 14);
            Transform nftMint = inventorySlots[i].transform.Find("Mint_Background/Mint_Number_Text");
            nftMint.GetComponent<TextMeshProUGUI>().text = "#" + inventorySlots[i].GetComponent<NFT>().GetMintNumber().ToString();
        }

        for (int i = 0; i < inventoryAsset.inventoryAssetSprites.Count; i++)
        {
            Transform nftImage = inventorySlots[i].transform.Find("NFT_Image");
            // Start loading the image asynchronously
            var imageLoadTask = inventoryFetcherController.GetImageLoaderSpriteAsync(inventoryAsset.inventoryAssetSprites[i]);
            await imageLoadTask;
            nftImage.GetComponent<Image>().sprite = imageLoadTask.Result;
        }

        uIController.ChangePrefabColor();
    }


    public async void RefreshInventorySlots(string filter)
    {
        foreach (GameObject slot in inventorySlots)
        {
            Destroy(slot);
        }

        apiCurrentPage = 1; 
        var result = await inventoryFetcherController.GetInventoryAssets(filter);

        inventorySlots = new GameObject[result.inventoryAssetName.Count];
        DisplayAssetImages(result);
        SetTotalAssetText(await inventoryFetcherController.GetInventoryAssetsCount());
    }

    public async void InstantiateInventorySlots()
    {
        var result = await inventoryFetcherController.GetInventoryAssets(GetCurrentFilterSelected());
        inventorySlots = new GameObject[result.inventoryAssetName.Count];
        DisplayAssetImages(result);
    }
 
    public void SetWalletNameText(string wallet)
    {
        walletNameText.text = $"Welcome { wallet }";
    }

    public void SetTotalAssetText(int assetCount)
    {
        totalAssetText.text = $"NFTs - { assetCount }";
    }
}
