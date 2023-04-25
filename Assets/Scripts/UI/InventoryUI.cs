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

    async void Start()
    {
        InstantiateInventorySlots();
        SetTotalAssetText(await inventoryFetcherController.GetInventoryAssetsCount());
    }

    public void DisplayAssetImages(Sprite[] sprites, string[] assetIds)
    {
        for (int i = 0; i < sprites.Length; i++)
        {
            inventorySlots[i] = Instantiate(inventoryAssetPrefab, inventoryContainer);
            inventorySlots[i].tag = "Asset";
            Transform nftImage = inventorySlots[i].transform.Find("NFT_Image");
            nftImage.GetComponent<Image>().sprite = sprites[i];
            inventorySlots[i].GetComponent<NFT>().SetAsssetId(assetIds[i]);
        }
    }

    public async void RefreshInventorySlots()
    {
        foreach (GameObject slot in inventorySlots)
        {
            Destroy(slot);
        }

        apiCurrentPage = 1; 
        var (sprites, assetIds) = await inventoryFetcherController.GetInventoryAssets(apiCurrentPage);

        inventorySlots = new GameObject[sprites.Length];
        DisplayAssetImages(sprites, assetIds);
        SetTotalAssetText(await inventoryFetcherController.GetInventoryAssetsCount());
    }

    public async void InstantiateInventorySlots()
    {
        var (sprites, assetIds) = await inventoryFetcherController.GetInventoryAssets(apiCurrentPage);
        inventorySlots = new GameObject[sprites.Length];
        DisplayAssetImages(sprites,assetIds);
    }
 
    public void SetWalletNameText(string wallet)
    {
        walletNameText.text = $"Welcome { wallet }";
    }

    public void SetTotalAssetText(int assetCount)
    {
        totalAssetText.text = $"Total assets - { assetCount }";
    }
}
