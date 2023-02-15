using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.UI;


public class AssetController : MonoBehaviour
{
    [SerializeField] string wallet;

    [ContextMenu("GetAssetImage")]
    public async void GetAssetImage()
    {
        try 
        {
            var url = $"https://neftyblocks.com/api/account/assets?sort=transferred&order=desc&owner={wallet}&limit=5&only_whitelisted=true";
            var jsonResponse = await GetTextAsync(url);
            var resultObject = JsonConvert.DeserializeObject<InventoryAsset>(jsonResponse);

            if (resultObject.items.Count == 0 || resultObject.items[0].assets.Count == 0)
            {
                Debug.LogError("No asset found for the given wallet address.");
                return;
            }
            var imageUri = resultObject.items[0].assets[0].image.hash;
            var texture = await GetSpriteAsync(imageUri);
            gameObject.GetComponent<Image>().sprite = texture;
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
}
