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

    public async Task<Asset> GetDeserializedData<Asset>(string url)
    {
        var jsonResponse = await imageLoader.GetTextAsync(url);

        return JsonConvert.DeserializeObject<Asset>(jsonResponse);
    }

    public async Task<(Sprite[], string[])> GetInventoryAssets(int slotLimit, int currentPage)
    {
        try
        {
            List<(string, string)> assetDetailsList = new List<(string, string)>();
            var url = $"{PluginController.apiUrl}/atomicassets/v1/assets?sort=transferred&order=desc&owner={"cabba.wam"}&page={currentPage}&limit={slotLimit}&only_whitelisted=true&collection_name={pluginController.GetCollectionName()}";
            var deserializedJsonResult = await GetDeserializedData<Asset>(url);
            var assetCount = deserializedJsonResult.details.Count;

            for (int i = 0; i < slotLimit && i < assetCount; i++)
            {
                if (deserializedJsonResult.details.Count <= i)
                {
                    Debug.LogError($"No asset found for slot {i + 1}.");
                    continue;
                }
                var imageHash = deserializedJsonResult.details[i].Data.Img;
                var assetId = deserializedJsonResult.details[i].AssetId;
                assetDetailsList.Add((imageHash, assetId));
            }

            // Download or Get from cache an Sprite
            var downloadedSprites = assetDetailsList.Select(uriWithId => (imageLoader.GetSpriteAsync(uriWithId.Item1), uriWithId.Item2)).ToArray();
            var spriteTasks = downloadedSprites.Select(tuple => tuple.Item1).ToArray();
            var spriteResults = await Task.WhenAll(spriteTasks);
            // Split resulsts per variable into own array
            var sprites = spriteResults.Select(sprite => sprite).ToArray();
            var assetIds = downloadedSprites.Select(tuple => tuple.Item2).ToArray();


            Debug.Log(assetIds[0]);
            return (sprites, assetIds);
        }
        catch (Exception ex)
        {
            Debug.LogError($"Error: {ex}");
            return (null, null);
        }
    }

    public async Task<int> GetInventoryAssetsCount()
    {
        var url = $"{PluginController.apiUrl}/atomicassets/v1/assets/_count?sort=transferred&order=desc&owner={"cabba.wam"}&only_whitelisted=true&collection_name={pluginController.GetCollectionName()}";
        var deserializedJsonResult = await GetDeserializedData<AssetCount>(url);

        return deserializedJsonResult.Data;
    }
}
