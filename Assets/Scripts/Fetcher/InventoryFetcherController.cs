using Newtonsoft.Json;
using System;
using System.Linq;
using System.Threading.Tasks;
using UnityEngine;

public class InventoryFetcherController : MonoBehaviour, IFetcher
{
    [SerializeField] private ImageLoader imageLoader;
    [SerializeField] private PluginController pluginController;

    public async Task<Asset> GetDeserializedData<Asset>(string url)
    {
        var jsonResponse = await imageLoader.GetTextAsync(url);
        return JsonConvert.DeserializeObject<Asset>(jsonResponse);
    }

    public async Task<(Sprite[], string[])> GetInventoryAssets(int slotLimit, int currentPage)
    {
        try
        {
            var url = $"{ PluginController.apiUrl }/atomicassets/v1/assets?sort=transferred&order=desc&owner={"cabba.wam"}&page={ currentPage }&limit={ slotLimit }&only_whitelisted=true&collection_name={ pluginController.GetCollectionName() }";
            var deserializedJsonResult = await GetDeserializedData<Asset>(url);

            var assetDetailsList = deserializedJsonResult.details
                .Take(slotLimit)
                .Select(detail => (detail.data.img, detail.assetId))
                .ToList();

            var spriteTasks = assetDetailsList
                .Select(uriWithId => imageLoader.GetSpriteAsync(uriWithId.img))
                .ToArray();

            var spriteResults = await Task.WhenAll(spriteTasks);
            var sprites = spriteResults.ToArray();
            var assetIds = assetDetailsList.Select(uriWithId => uriWithId.assetId).ToArray();

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
        return deserializedJsonResult.data;
    }
}
