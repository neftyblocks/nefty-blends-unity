using System.Collections;
using System.Collections.Generic;
using System.Linq;
using TMPro;
using UnityEngine;
using UnityEngine.PlayerLoop;
using UnityEngine.UI;

public class InventoryUI : MonoBehaviour
{
    [SerializeField] private TextMeshProUGUI walletNameText;
    [SerializeField] private TextMeshProUGUI totalAssetText;
    [SerializeField] private DashboardController dashboardController;
    [SerializeField] private InventoryFetcherController inventoryFetcherController;
    [SerializeField] private GameObject[] inventorySlots;
    [SerializeField] private GameObject inventoryAssetPrefab;
    [SerializeField] private RectTransform inventoryContainer;
    [SerializeField] public int apiCurrentPage { get; set; } = 1;

    public void DisplayAssetImages(InventoryAsset inventoryAsset)
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
            nftName.GetComponent<TextMeshProUGUI>().text = inventorySlots[i].GetComponent<NFT>().GetAssetName();
            Transform nftMint = inventorySlots[i].transform.Find("Mint_Background/Mint_Number_Text");
            nftMint.GetComponent<TextMeshProUGUI>().text = "#" + inventorySlots[i].GetComponent<NFT>().GetMintNumber().ToString();
            nftImage.GetComponent<Image>().sprite = inventoryAsset.inventoryAssetSprites[i];
        }
    }

    public async void RefreshInventorySlots()
    {
        foreach (GameObject slot in inventorySlots)
        {
            Destroy(slot);
        }

        apiCurrentPage = 1; 
        var result = await inventoryFetcherController.GetInventoryAssets(apiCurrentPage);

        inventorySlots = new GameObject[result.inventoryAssetName.Count];
        DisplayAssetImages(result);
        SetTotalAssetText(await inventoryFetcherController.GetInventoryAssetsCount());
    }

    public async void InstantiateInventorySlots()
    {
        var result = await inventoryFetcherController.GetInventoryAssets(apiCurrentPage);
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
