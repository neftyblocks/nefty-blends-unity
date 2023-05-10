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

    public async Task<InventoryAsset> GetInventoryAssets(int currentPage)
    {
        var result = new InventoryAsset();
        try
        {
            var url = $"{ PluginController.apiUrl }/atomicassets/v1/assets?sort=transferred&order=desc&owner={ pluginController.GetWalletName() }&page={ currentPage }&limit=100&only_whitelisted=false&collection_name={ pluginController.GetCollectionName() }";
            var deserializedJsonResult = await GetDeserializedData<Asset>(url);
            Debug.Log(url);

            foreach (var detail in deserializedJsonResult.details)
            {
                var sprite = await imageLoader.GetSpriteAsync(detail.data.img);
                result.inventoryAssetSprites.Add(sprite);
                result.invenoryAssetIds.Add(detail.assetId);
                result.inventoryAssetMintNumber.Add(detail.templateMint);
                result.inventoryAssetName.Add(detail.name);
            }

            return result;
        }
        catch (Exception ex)
        {
            Debug.LogError($"Error: {ex}");
            return result;
        }
    }

    public async Task<int> GetInventoryAssetsCount()
    {
        var url = $"{PluginController.apiUrl}/atomicassets/v1/assets/_count?sort=transferred&order=desc&owner={ pluginController.GetWalletName() }&only_whitelisted=false&collection_name={pluginController.GetCollectionName()}";
        var deserializedJsonResult = await GetDeserializedData<AssetCount>(url);
        return deserializedJsonResult.data;
    }
}
