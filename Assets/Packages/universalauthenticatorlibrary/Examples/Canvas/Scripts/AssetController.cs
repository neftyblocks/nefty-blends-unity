using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.UI;
using UniversalAuthenticatorLibrary;

public class AssetController : MonoBehaviour
{
    [SerializeField] public string wallet;
    [SerializeField] public GameObject[] slots;
    [SerializeField] public int assetCount;
    [SerializeField] public int currentPage;
    [SerializeField] public GameObject prefab;
    [SerializeField] public RectTransform prefabContainer;
    [SerializeField] public Sprite loadingImage;
    [SerializeField] public CollectionUI collectionUI;


    void Awake()
    {
        currentPage = 1;
        int slotCount = 12;
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

    [ContextMenu("GetAssetImage")]
    public async void GetAssetImage()
    {
        try
        {
            var url = $"https://neftyblocks.com/api/account/assets?sort=transferred&order=desc&owner={"cabba.wam"}&page={currentPage}&limit=12&only_whitelisted=true";
            var jsonResponse = await GetTextAsync(url);
            var resultObject = JsonConvert.DeserializeObject<InventoryAsset>(jsonResponse);

            if (resultObject != null)
            {
                SetAssetCount(resultObject.total);
            }

            if (resultObject.items.Count == 0 || resultObject.items[0].assets.Count == 0)
            {
                Debug.LogError("No asset found for the given wallet address.");
                return;
            }

            List<string> imageUris = new List<string>();
            for (int i = 0; i < slots.Length; i++)
            {
                if (resultObject.items.Count <= i || resultObject.items[i].assets.Count == 0)
                {
                    Debug.LogError($"No asset found for slot {i + 1}.");
                    continue;
                }

                var imageUri = resultObject.items[i].assets[0].image.hash;
                imageUris.Add(imageUri);
            }

            var downloadedSprites = await Task.WhenAll(imageUris.Select(uri => GetSpriteAsync(uri)));
            for (int i = 0; i < downloadedSprites.Length; i++)
            {
                slots[i].GetComponent<UIElementController>().GetSlotImage().GetComponent<Image>().sprite = downloadedSprites[i];
                slots[i].GetComponent<UIElementController>().assetId = resultObject.items[i].id;

            }
        }
        catch (Exception ex)
        {
            Debug.Log($"Error: {ex}");
        }
    }

    [ContextMenu("GetCollectionImage")]
    public async void GetCollectionImageURL()
    {
        try
        {
            var url = $"https://aa.neftyblocks.com/atomicassets/v1/collections/alien.worlds";
            var jsonResponse = await GetTextAsync(url);
            var resultObject = JsonConvert.DeserializeObject<Collection>(jsonResponse);

            if (resultObject.data.img.Length == 0)
            {
                Debug.LogError("No asset found for the given wallet address.");
                return;
            }

            var imageUri = resultObject.data.img;
            var downloadedSprites = await GetSpriteAsync(imageUri);
            collectionUI.SetCollectionImage(downloadedSprites);
            
        }
        catch (Exception ex)
        {
            Debug.Log($"Error: {ex}");
        }
    }

    private async Task<string> GetTextAsync(string url)
    {
        var request = UnityWebRequest.Get(url);
        var operation = request.SendWebRequest();

        while (!operation.isDone)
        {
            await Task.Yield();
        }

        if (request.result != UnityWebRequest.Result.Success)
        {
            throw new UnityException(request.error);
        }
        return request.downloadHandler.text;
    }

    private async Task<Sprite> GetSpriteAsync(string imageUri)
    {
        var url = $"https://resizer.neftyblocks.com?ipfs={imageUri}&width=300&static=false";

        var request = UnityWebRequestTexture.GetTexture(url);
        var operation = request.SendWebRequest();

        while (!operation.isDone)
        {
            await Task.Yield();
        }

        if (request.result != UnityWebRequest.Result.Success)
        {
            throw new UnityException(request.error);
        }

        var texture = ((DownloadHandlerTexture)request.downloadHandler).texture;
        var sprite = Sprite.Create(texture, new Rect(0, 0, texture.width, texture.height), Vector2.one * 0.5f);
        return sprite;
    }

    public void SetWallet(string accountName)
    {
        wallet = accountName;
    }

    public string GetWallet()
    {
        return wallet;
    }

    public int GetAssetCount()
    {
        return assetCount;
    }

    public void SetAssetCount(int count)
    {
        assetCount = count;
    }

    public void SetLoadingImage()
    {
        for (int i = 0; i < 12; i++)
        {
            slots[i].GetComponent<UIElementController>().GetSlotImage().GetComponent<Image>().sprite = loadingImage;

        }
    }
}
