using System.Linq;
using System.Threading.Tasks;
using TMPro;
using UnityEngine;
using UnityEngine.UI;
using static BlendFetcherController;


/// <summary>
/// This class manages the UI display of a list of Blend assets, including fetching, instantiating, and refreshing these Blend assets.
/// </summary>
public class BlendListUI : MonoBehaviour
{
    [SerializeField] private BlendFetcherController blendFetcherController;
    [SerializeField] private GameObject[] blendSlots;
    [SerializeField] private GameObject blendSlotPrefab;
    [SerializeField] private RectTransform blendPrefabContainer;
    [SerializeField] private UIController uIController;
    [SerializeField] private int apiCurrentPage { get; set; } = 1;

    void Start()
    {
        InstantiateBlendSlots();
    }

    public async void DisplayAssetImages(BlendAssets blendAssets)
    {
        for (int i = 0; i < blendAssets.spritesHash.Length; i++)
        {
            if (blendAssets.spritesHash[i] != null)
            {
                Transform blendName = blendSlots[i].transform.Find("Blend_Name_Background/Blend_Name_Text");
                blendName.GetComponent<TextMeshProUGUI>().text = TextTruncation.TruncateText(blendAssets.blendNames[i], 14);
                blendSlots[i].GetComponent<BlendNFT>().SetBlendId(blendAssets.assetIds[i]);
                blendSlots[i].GetComponent<BlendNFT>().SetContractName(blendAssets.contractNames[i]);
            }
        }

        for (int i = 0; i < blendAssets.spritesHash.Length; i++)
        {
            Transform blendImage = blendSlots[i].transform.Find("Blend_Image");
            var imageLoadTask = blendFetcherController.GetImageLoaderSpriteAsync(blendAssets.spritesHash[i]);
            await imageLoadTask;
            blendImage.GetComponent<Image>().sprite = imageLoadTask.Result;
        }
        uIController.ChangePrefabColor();
    }
    public async void InstantiateBlendSlots()
    {
        var blendAsset = await blendFetcherController.FetchBlendAssets(apiCurrentPage);
        if (blendAsset != null)
        {
            var objectCount = blendAsset.spritesHash.Length;
            blendSlots = new GameObject[objectCount];

            for (int i = 0; i < objectCount; i++)
            {
                blendSlots[i] = Instantiate(blendSlotPrefab, blendPrefabContainer);
                blendSlots[i].tag = "Blend";
            }
            DisplayAssetImages(blendAsset);
        }
    }

    public async void RefreshBlendSlots()
    {
        foreach (Transform child in blendPrefabContainer)
        {
            Destroy(child.gameObject);
        }

        if (blendSlots != null && blendSlots.Length != 0)
        {
            
            foreach (GameObject slot in blendSlots)
            {
                Destroy(slot);
            }

            apiCurrentPage = 1;
            var blendAsset = await blendFetcherController.FetchBlendAssets(apiCurrentPage);
            var objectCount = blendAsset.spritesHash.Length;

            blendSlots = new GameObject[objectCount];
            for (int i = 0; i < objectCount; i++)
            {
                blendSlots[i] = Instantiate(blendSlotPrefab, blendPrefabContainer);
                blendSlots[i].tag = "Blend";
            }

            DisplayAssetImages(blendAsset);
        }
    }
}
