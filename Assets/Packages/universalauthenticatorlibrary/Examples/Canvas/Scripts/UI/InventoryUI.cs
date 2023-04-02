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
    [SerializeField] private TextMeshProUGUI currentPageText;
    [SerializeField] private DashboardController dashboardController;
    [SerializeField] private InventoryFetcherController inventoryFetcherController;

    [SerializeField] public GameObject[] slots;
    [SerializeField] public GameObject prefab;
    [SerializeField] public RectTransform prefabContainer;
    [SerializeField] public Sprite loadingImage;
    [SerializeField] public int currentPage { get; set; }
    [SerializeField] public int slotCount { get; set; }

    void Awake()
    {
        currentPage = 1;
        slotCount = 12;
        int slotSize = 150;
        int x = 0;
        int y = 0;
        slots = new GameObject[slotCount];
        for (int i = 0; i < slotCount; i++)
        {
            slots[i] = Instantiate(prefab, prefabContainer);
            slots[i].tag = "Asset";
            slots[i].GetComponentInParent<RectTransform>().anchoredPosition = new Vector2(x * slotSize, -y * slotSize);
            x++;
            if (x >= 6)
            {
                x = 0; y++;
            }
        }
    }

    public async void DisplayAssetImages()
    {
        var (downloadedSprites, assetIds) = await inventoryFetcherController.GetInventoryAssets(slotCount, currentPage);
        if(downloadedSprites != null)
        {
            for (int i = 0; i < downloadedSprites.Length; i++)
            {
                Transform nftImage = slots[i].transform.Find("NFT_Image");
                nftImage.GetComponent<Image>().sprite = downloadedSprites[i];
                slots[i].GetComponent<NFT>().SetAsssetId(assetIds[i]);
            }
            for (int i = downloadedSprites.Length; i < slotCount; i++)
            {
                slots[i].GetComponent<NFT>().GetComponent<Image>().sprite = loadingImage;
            }
        }
    }

    public void SetLoadingImage()
    {
        for (int i = 0; i < 12; i++)
        {
            slots[i].GetComponent<NFT>().GetComponent<Image>().sprite = loadingImage;
        }
    }

    private void OnEnable()
    {
        DashboardController.UserLoggedIn += UpdateUI;
        InventoryFetcherController.UiRefresh += UpdateUI;
    }

    private void UpdateUI()
    {
        SetWalletNameText(dashboardController.walletName);
        SetTotalAssetText(inventoryFetcherController.assetCount);
        SetCurrentPageText(currentPage);
    }

    public void SetWalletNameText(string wallet)
    {
        walletNameText.text = $"Welcome {wallet}";
    }
    public void SetTotalAssetText(int amount)
    {
        totalAssetText.text = $"Total assets - {amount}";
    }
    public void SetCurrentPageText(int currentPage)
    {
        currentPageText.text = $"{currentPage}";
    }

    public void NextPage()
    {
        currentPage++;
        DisplayAssetImages();
    }
    public void PreviousPage()
    {
        currentPage--;
        DisplayAssetImages();
    }
}
