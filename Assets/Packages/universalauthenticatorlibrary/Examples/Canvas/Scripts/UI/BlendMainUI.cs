using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class BlendMainUI : MonoBehaviour
{
    [SerializeField] private DashboardController dashboardController;
    [SerializeField] private BlendFetcherController blendFetcherController;
    [SerializeField] public GameObject[] blendSlots;
    [SerializeField] public GameObject blendPrefab;
    [SerializeField] public RectTransform blendPrefabContainer;
    [SerializeField] public int apiCurrentPage { get; set; } = 1;
    [SerializeField] public int slotCount { get; set; } = 100;

    void Awake()
    {
        InstantiateBlendSlots();
        DisplayAssetImages();
    }

    public async void DisplayAssetImages()
    {
        var (downloadedSprites, blendIds,contractNames) = await blendFetcherController.GetBlendAssets(slotCount, apiCurrentPage);

        if (downloadedSprites != null)
        {
            for (int i = 0; i < downloadedSprites.Length; i++)
            {
                if (downloadedSprites[i] != null)
                {
                    Transform nftImage = blendSlots[i].transform.Find("NFT_Image");
                    nftImage.GetComponent<Image>().sprite = downloadedSprites[i];
                    blendSlots[i].GetComponent<BlendNFT>().SetBlendId(blendIds[i]);
                    blendSlots[i].GetComponent<BlendNFT>().SetContractName(contractNames[i]);
                }
            }
        }
    }
    public void InstantiateBlendSlots()
    {
        blendSlots = new GameObject[slotCount];
        for (int i = 0; i < slotCount; i++)
        {
            blendSlots[i] = Instantiate(blendPrefab, blendPrefabContainer);
            blendSlots[i].tag = "Blend";
        }
    }
}
