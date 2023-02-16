using Newtonsoft.Json;
using System;
using System.Threading.Tasks;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.UI;
using UniversalAuthenticatorLibrary;

public class AssetController : MonoBehaviour
{
    [SerializeField] public string wallet;
    [SerializeField] public Image[] slots;
    [SerializeField] public int assetCount;
    [SerializeField] public int currentPage;

    void Awake()
    {
        currentPage = 1;
        int slotCount = 12;
        slots = new Image[slotCount]; 
        for (int i = 0; i < slotCount; i++)
        {
            slots[i] = transform.Find("Slots").Find("Slot" + (i + 1)).GetComponent<Image>();

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
            for (int i = 0; i < slots.Length; i++)
            {
                if (resultObject.items.Count <= i || resultObject.items[i].assets.Count == 0)
                {
                    Debug.LogError($"No asset found for slot {i + 1}.");
                    continue;
                }

                var imageUri = resultObject.items[i].assets[0].image.hash;
                var texture = await GetSpriteAsync(imageUri);
                slots[i].sprite = texture;
            }
        }
        catch(Exception ex) 
        {
            Debug.Log($"Error: { ex }");
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
        var url = $"https://atomichub-ipfs.com/ipfs/{imageUri}";
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
}
