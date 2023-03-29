using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.PlayerLoop;
using UnityEngine.UI;
using UniversalAuthenticatorLibrary;

public class InventoryFetcherController : MonoBehaviour, IFetcher
{
    [SerializeField] public int assetCount { get; set; }
    [SerializeField] private static Dictionary<string, Sprite> _spriteCache = new Dictionary<string, Sprite>();
    [SerializeField] public CollectionUI collectionUI;
    [SerializeField] public PluginController pluginController;
    public delegate void UiRefreshEventHandler();
    public static event UiRefreshEventHandler UiRefresh;

    public async Task<(Sprite[], string[])> GetImage(int slots,int currentPage)
    {
        try
        {
            var url = $"https://neftyblocks.com/api/account/assets?sort=transferred&order=desc&owner={"cabba.wam"}&page={currentPage}&limit=12&only_whitelisted=true&collection_name={pluginController.GetCollectionName()}";
            var jsonResponse = await GetTextAsync(url);
            // dit dynamisch 
            var resultObject = JsonConvert.DeserializeObject<InventoryAsset>(jsonResponse);

            if (resultObject.items.Count == 0 || resultObject.items[0].assets.Count == 0)
            {
                Debug.LogError("No asset found for the given wallet address.");
                return (null, null);
            }
            assetCount = resultObject.total;
            UiRefresh();
            List<(string, string)> imageUrisWithIds = new List<(string, string)>();

            for (int i = 0; i < slots; i++)
            {
                if (resultObject.items.Count <= i || resultObject.items[i].assets.Count == 0)
                {
                    Debug.LogError($"No asset found for slot {i + 1}.");
                    continue;
                }
                var imageUri = resultObject.items[i].assets[0].image.hash;
                var assetId = resultObject.items[i].id;
                imageUrisWithIds.Add((imageUri, assetId));
            }
            var downloadedSprites = imageUrisWithIds.Select(uriWithId => (GetSpriteAsync(uriWithId.Item1), uriWithId.Item2)).ToArray();
            var spriteTasks = downloadedSprites.Select(tuple => tuple.Item1).ToArray();
            var spriteResults = await Task.WhenAll(spriteTasks);
            var sprites = spriteResults.Select(sprite => sprite).ToArray();
            var assetIds = downloadedSprites.Select(tuple => tuple.Item2).ToArray();
            return (sprites, assetIds);
        }
        catch (Exception ex)
        {
            Debug.Log($"Error: {ex}");
            return (null, null);
        }
    }

    [ContextMenu("GetCollectionImage")]
    public async Task<Sprite> GetCollectionImageURL()
    {
        try
        {
            var url = $"https://aa.neftyblocks.com/atomicassets/v1/collections/{pluginController.GetCollectionName()}";
            var jsonResponse = await GetTextAsync(url);
            var resultObject = JsonConvert.DeserializeObject<Collection>(jsonResponse);

            if (resultObject.data.img.Length == 0)
            {
                Debug.LogError("No image found for the given collection.");
                return null;
            }

            var imageUri = resultObject.data.img;
            return await GetSpriteAsync(imageUri);

        }
        catch (Exception ex)
        {
            Debug.Log($"Error: {ex}");
            return null;
        }
    }

    public async Task<string> GetTextAsync(string url)
    {
        var request = UnityWebRequest.Get(url);
        request.SetRequestHeader("Content-Type", "application/json");
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

    public async Task<Sprite> GetSpriteAsync(string imageUri)
    {
        if (_spriteCache.TryGetValue(imageUri, out Sprite sprite))
        {
            Debug.Log($"{imageUri} already cached");
            return sprite;
        }

        var url = $"https://resizer.neftyblocks.com?ipfs={imageUri}&width=300&static=false";
        var request = UnityWebRequestTexture.GetTexture(url);

        request.SetRequestHeader("Cache-Control", "max-age=3600");
        request.SetRequestHeader("Pragma", "cache");

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
        sprite = Sprite.Create(texture, new Rect(0, 0, texture.width, texture.height), Vector2.one * 0.5f);

        if (!_spriteCache.ContainsKey(imageUri))
        {
            _spriteCache.Add(imageUri, sprite);
        }

        return sprite;
    }
}
