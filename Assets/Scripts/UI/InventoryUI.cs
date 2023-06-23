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
            if (!gameObject.activeInHierarchy) return;

            inventorySlots[i] = Instantiate(inventoryAssetPrefab, inventoryContainer);
            if (inventorySlots[i] == null) return;

            inventorySlots[i].tag = "Asset";
            NFT nftComponent = inventorySlots[i].GetComponent<NFT>();
            if (nftComponent == null) return;

            nftComponent.SetAssetId(inventoryAsset.inventoryAssetIds[i]);
            nftComponent.SetAssetName(inventoryAsset.inventoryAssetName[i]);
            nftComponent.SetMintNumber(inventoryAsset.inventoryAssetMintNumber[i]);

            Transform nftName = inventorySlots[i].transform.Find("Asset_Name_Background/Asset_Name_Text");
            if (nftName == null) return;

            TextMeshProUGUI nameText = nftName.GetComponent<TextMeshProUGUI>();
            if (nameText == null) return;

            nameText.text = TextTruncation.TruncateText(nftComponent.GetAssetName(), 14);

            Transform nftMint = inventorySlots[i].transform.Find("Mint_Background/Mint_Number_Text");
            if (nftMint == null) return;

            TextMeshProUGUI mintText = nftMint.GetComponent<TextMeshProUGUI>();
            if (mintText == null) return;

            mintText.text = "#" + nftComponent.GetMintNumber().ToString();
        }

        // Start a separate loop for loading the images.
        for (int i = 0; i < inventoryAsset.inventoryAssetSprites.Count; i++)
        {
            if (!gameObject.activeInHierarchy) return;

            GameObject slot = inventorySlots[i];
            if (slot == null) return;

            Transform nftImage = slot.transform.Find("NFT_Image");
            if (nftImage != null)
            {
                var imageLoadTask = inventoryFetcherController.GetImageLoaderSpriteAsync(inventoryAsset.inventoryAssetSprites[i]);
                await imageLoadTask;
                if (!gameObject.activeInHierarchy || nftImage == null) return;

                Image imageComponent = nftImage.GetComponent<Image>();
                if (imageComponent == null) return;

                imageComponent.sprite = imageLoadTask.Result;
            }
        }

        if (!gameObject.activeInHierarchy) return;
        uIController.ChangePrefabColor();
    }


    public async void RefreshInventorySlots(string filter)
    {
        if (inventoryContainer != null)
        {
            foreach (Transform child in inventoryContainer)
            {
                Destroy(child.gameObject);
            }
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
        if (walletNameText != null)
            walletNameText.text = $"Welcome {wallet}";
    }

    public void SetTotalAssetText(int assetCount)
    {
        if (totalAssetText != null)
            totalAssetText.text = $"{assetCount} NFTs";
    }
}
