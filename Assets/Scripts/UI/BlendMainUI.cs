using UnityEngine;
using UnityEngine.UI;

public class BlendMainUI : MonoBehaviour
{
    [SerializeField] private BlendFetcherController blendFetcherController;
    [SerializeField] private GameObject[] blendSlots;
    [SerializeField] private GameObject blendSlotPrefab;
    [SerializeField] private RectTransform blendPrefabContainer;
    [SerializeField] private int apiCurrentPage { get; set; } = 1;
    [SerializeField] private  int slotCount { get; set; } = 100;

    void Start()
    {
        InstantiateBlendSlots();
        DisplayAssetImages();
    }

    public async void DisplayAssetImages()
    {
        var blendAsset = await blendFetcherController.FetchBlendAssetsAsync(slotCount, apiCurrentPage);

        if (blendAsset != null)
        {
            for (int i = 0; i < blendAsset.sprites.Length; i++)
            {
                if (blendAsset.sprites[i] != null)
                {
                    Transform nftImage = blendSlots[i].transform.Find("NFT_Image");
                    nftImage.GetComponent<Image>().sprite = blendAsset.sprites[i];
                    blendSlots[i].GetComponent<BlendNFT>().SetBlendId(blendAsset.assetIds[i]);
                    blendSlots[i].GetComponent<BlendNFT>().SetContractName(blendAsset.contractNames[i]);
                }
            }
        }
    }
    public void InstantiateBlendSlots()
    {
        blendSlots = new GameObject[slotCount];
        for (int i = 0; i < slotCount; i++)
        {
            blendSlots[i] = Instantiate(blendSlotPrefab, blendPrefabContainer);
            blendSlots[i].tag = "Blend";
        }
    }
}
