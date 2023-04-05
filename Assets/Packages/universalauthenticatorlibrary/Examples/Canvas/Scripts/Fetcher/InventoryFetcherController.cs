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
    [SerializeField] public ImageLoader imageLoader;
    [SerializeField] public int assetCount { get; set; }
    [SerializeField] public CollectionUI collectionUI;
    [SerializeField] public PluginController pluginController;
    public delegate void UiRefreshEventHandler();
    public static event UiRefreshEventHandler UiRefresh;

    public async Task<Asset> GetDeserializedData<Asset>(string url, int slotLimit, int currentPage)
    {
        var jsonResponse = await imageLoader.GetTextAsync(url);

        return JsonConvert.DeserializeObject<Asset>(jsonResponse);
    }
    public async Task<(Sprite[], string[])> GetInventoryAssets(int slotLimit,int currentPage)
    {
        try
        {
            var url = $"{PluginController.apiUrl}/atomicassets/v1/assets?sort=transferred&order=desc&owner={"cabba.wam"}&page={currentPage}&limit={slotLimit}&only_whitelisted=true&collection_name={pluginController.GetCollectionName()}";

            var resultObject = await GetDeserializedData<Asset>(url, slotLimit, currentPage);
            Debug.Log(resultObject);
            if (resultObject.Data.Count == 0 )
            {
                Debug.LogError("No asset found for the given wallet address.");
                return (null, null);
            }
            assetCount = resultObject.Data.Count;
            UiRefresh();
            List<(string, string)> imageUrisWithIds = new List<(string, string)>();

            for (int i = 0; i < slotLimit; i++)
            {
                if (resultObject.Data.Count <= i )
                {
                    Debug.LogError($"No asset found for slot {i + 1}.");
                    continue;
                }
                var imageUri = resultObject.Data[i].Data.Img;
                var assetId = resultObject.Data[i].AssetId;
                imageUrisWithIds.Add((imageUri, assetId));
            }

            var downloadedSprites = imageUrisWithIds.Select(uriWithId => (imageLoader.GetSpriteAsync(uriWithId.Item1), uriWithId.Item2)).ToArray();
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
            var url = $"{PluginController.apiUrl}/atomicassets/v1/collections/{pluginController.GetCollectionName()}";
            var jsonResponse = await imageLoader.GetTextAsync(url);
            var resultObject = JsonConvert.DeserializeObject<Collection>(jsonResponse);

            if (resultObject.data.img.Length == 0)
            {
                Debug.LogError("No image found for the given collection.");
                return null;
            }

            var imageUri = resultObject.data.img;
            return await imageLoader.GetSpriteAsync(imageUri);

        }
        catch (Exception ex)
        {
            Debug.Log($"Error: {ex}");
            return null;
        }
    }
}
