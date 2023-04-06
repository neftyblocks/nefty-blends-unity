using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class BlendMainUI : MonoBehaviour
{
    [SerializeField] private DashboardController dashboardController;
    [SerializeField] private BlendFetcherController blendFetcherController;
    [SerializeField] public GameObject[] slots;
    [SerializeField] public GameObject prefab;
    [SerializeField] public RectTransform prefabContainer;
    [SerializeField] public Sprite loadingImage;
    [SerializeField] public int currentPage { get; set; }
    [SerializeField] public int slotCount { get; set; }

    void Awake()
    {
        currentPage = 1;
        slotCount = 40;
        int slotSize = 150;
        int x = 0;
        int y = 0;
        slots = new GameObject[slotCount];

        for (int i = 0; i < slotCount; i++)
        {
           
            slots[i] = Instantiate(prefab, prefabContainer);
            slots[i].tag = "Blend";
            slots[i].GetComponentInParent<RectTransform>().anchoredPosition = new Vector2(x * slotSize, -y * slotSize);
            x++;
            if (x >= 6)
            {
                x = 0; y++;
            }
        }
    }

    [ContextMenu("GetCollectionImage")]

    public async void DisplayAssetImages()
    {
        Debug.Log(slotCount+" "+ currentPage);
        var (downloadedSprites, blendIds,contractNames) = await blendFetcherController.GetBlendAssets(slotCount, currentPage);

        if (downloadedSprites != null)
        {
            for (int i = 0; i < downloadedSprites.Length; i++)
            {
                if (downloadedSprites[i] != null)
                {
                    Transform nftImage = slots[i].transform.Find("NFT_Image");
                    nftImage.GetComponent<Image>().sprite = downloadedSprites[i];
                    slots[i].GetComponent<BlendNFT>().SetBlendId(blendIds[i]);
                    slots[i].GetComponent<BlendNFT>().SetContractName(contractNames[i]);
                }
            }
            for (int i = downloadedSprites.Length; i < slotCount; i++)
            {
                slots[i].GetComponent<BlendNFT>().gameObject.GetComponent<Image>().sprite = loadingImage;
            }
        }
    }

    public void SetLoadingImage()
    {
        for (int i = 0; i < 12; i++)
        {
            slots[i].GetComponent<BlendNFT>().gameObject.GetComponent<Image>().sprite = loadingImage;

        }
    }

    private void OnEnable()
    {
/*        DashboardController.UserLoggedIn += UpdateUI;
*/        InventoryFetcherController.UiRefreshAssetCount += UpdateUI;
    }

    private void UpdateUI(int assetCount)
    {
/*        SetCurrentPageText(currentPage);
*/    }

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
