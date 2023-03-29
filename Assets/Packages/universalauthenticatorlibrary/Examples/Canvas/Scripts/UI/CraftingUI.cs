using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

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
       /* var (downloadedSprites, assetIds) = await blendFetcherController.GetImage(slotCount, currentPage);
        if (downloadedSprites != null)
        {
            for (int i = 0; i < downloadedSprites.Length; i++)
            {
                if (downloadedSprites[i] != null)
                {
                    slots[i].GetComponent<UIElementController>().GetSlotImage().GetComponent<Image>().sprite = downloadedSprites[i];
                    slots[i].GetComponent<UIElementController>().assetId = assetIds[i];
                }
            }
            for (int i = downloadedSprites.Length; i < slotCount; i++)
            {
                slots[i].GetComponent<UIElementController>().GetSlotImage().GetComponent<Image>().sprite = loadingImage;
            }
        }*/
    }
}
