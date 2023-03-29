using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.PlayerLoop;

public class CraftingUI : MonoBehaviour
{
    [SerializeField] private DashboardController dashboardController;
    [SerializeField] private CraftingFetcher craftingFetcher;
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
            slots[i].tag = "Craft";
            slots[i].GetComponentInParent<RectTransform>().anchoredPosition = new Vector2(x * slotSize, -y * slotSize);
            x++;
            if (x >= 6)
            {
                x = 0; y++;
            }
        }
    }

   /* public async void DisplayAssetImages()
    {
        var (downloadedSprites, assetIds) = await craftingFetcher.GetCraftingAssets(slotCount, currentPage);
        if (downloadedSprites != null)
        {
            for (int i = 0; i < downloadedSprites.Length; i++)
            {
                slots[i].GetComponent<NFT>().GetComponent<Image>().sprite = downloadedSprites[i];
                slots[i].GetComponent<NFT>().SetAsssetId(assetIds[i]);
            }
            for (int i = downloadedSprites.Length; i < slotCount; i++)
            {
                slots[i].GetComponent<NFT>().GetComponent<Image>().sprite = loadingImage;
            }
        }
    }*/
}
