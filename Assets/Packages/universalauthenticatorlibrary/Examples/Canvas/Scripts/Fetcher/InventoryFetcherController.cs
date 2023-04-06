using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UnityEngine;

public class InventoryFetcherController : MonoBehaviour, IFetcher
{
    [SerializeField] public ImageLoader imageLoader;
    [SerializeField] public PluginController pluginController;
    // Events 
    public delegate void UiRefreshEventHandler(int assetCount);
    public static event UiRefreshEventHandler UiRefreshAssetCount;

    public async Task<Asset> GetDeserializedData<Asset>(string url)
    {
        var jsonResponse = await imageLoader.GetTextAsync(url);

        return JsonConvert.DeserializeObject<Asset>(jsonResponse);
    }

    public async Task<(Sprite[], string[])> GetInventoryAssets(int slotLimit, int currentPage)
    {
        try
        {
            List<(string, string)> imageUrisWithIds = new List<(string, string)>();
            var url = $"{PluginController.apiUrl}/atomicassets/v1/assets?sort=transferred&order=desc&owner={"cabba.wam"}&page={currentPage}&limit={slotLimit}&only_whitelisted=true&collection_name={pluginController.GetCollectionName()}";
            var deserializedJsonResult = await GetDeserializedData<Asset>(url);
            var assetCount = deserializedJsonResult.details.Count;

            if (assetCount == 0)
            {
                Debug.LogError("No assets found for the given wallet address.");
                return (null, null);
            }

            // Triggers UiRefreshAssetCount event in InventoryUI class
            UiRefreshAssetCount(assetCount);

            for (int i = 0; i < slotLimit; i++)
            {
                if (deserializedJsonResult.details.Count <= i)
                {
                    Debug.LogError($"No asset found for slot {i + 1}.");
                    continue;
                }
                var imageUri = deserializedJsonResult.details[i].Data.Img;
                var assetId = deserializedJsonResult.details[i].AssetId;
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

    public async Task<int> GetInventoryAssetsCount()
    {
        var url = $"{PluginController.apiUrl}/atomicassets/v1/assets/_count?sort=transferred&order=desc&owner={"cabba.wam"}&only_whitelisted=true&collection_name={pluginController.GetCollectionName()}";
        var deserializedJsonResult = await GetDeserializedData<Asset>(url);

        Debug.Log("Asset: "+ deserializedJsonResult);
        Debug.Log("Asset: " + deserializedJsonResult.details.Count);

        return deserializedJsonResult.details.Count;
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
