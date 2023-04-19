using System.Collections;
using System.Collections.Generic;
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
    [SerializeField] public GameObject[] inventorySlots;
    [SerializeField] public GameObject inventoryAssetPrefab;
    [SerializeField] public RectTransform inventoryContainer;
    [SerializeField] public int apiCurrentPage { get; set; } = 1;
    [SerializeField] public int slotCount { get; set; } = 40;

    async void Awake()
    {
        InstantiateInventorySlots();
        DisplayAssetImages();
        SetTotalAssetText(await inventoryFetcherController.GetInventoryAssetsCount());
    }

    public async void DisplayAssetImages()
    {
        var (downloadedSprites, assetIds) = await inventoryFetcherController.GetInventoryAssets(slotCount, apiCurrentPage);
        if(downloadedSprites != null)
        {
            for (int i = 0; i < downloadedSprites.Length; i++)
            {
                Transform nftImage = inventorySlots[i].transform.Find("NFT_Image");
                nftImage.GetComponent<Image>().sprite = downloadedSprites[i];
                inventorySlots[i].GetComponent<NFT>().SetAsssetId(assetIds[i]);
            }
        }
    }

    public void InstantiateInventorySlots()
    {
        inventorySlots = new GameObject[slotCount];
        for (int i = 0; i < slotCount; i++)
        {
            inventorySlots[i] = Instantiate(inventoryAssetPrefab, inventoryContainer);
            inventorySlots[i].tag = "Asset";
        }
    }
    // Discontinued -- keeping for now

    /*   private void OnEnable()
       {
           DashboardController.UserLoggedIn += UpdateUI;
       }*/

    /* private void UpdateUI()
     {
         SetWalletNameText(dashboardController.walletName);
     }*/

    public void SetWalletNameText(string wallet)
    {
        walletNameText.text = $"Welcome { wallet }";
    }

    public void SetTotalAssetText(int assetCount)
    {
        totalAssetText.text = $"Total assets - { assetCount }";
    }
}
