using Newtonsoft.Json;
using System;
using System.Linq;
using System.Threading.Tasks;
using UnityEngine;

public class OwnershipFetcher : MonoBehaviour, IFetcher
{
    [SerializeField] private ImageLoader imageLoader;
    [SerializeField] private PluginController pluginController;

    public async Task<Ownership> GetDeserializedData<Ownership>(string url)
    {
        var jsonResponse = await imageLoader.GetTextAsync(url);
        return JsonConvert.DeserializeObject<Ownership>(jsonResponse);
    }

    public async Task<InventoryAsset> GetInventoryAssets(string collectionNames)
    {
        var result = new InventoryAsset();
        try
        {
            var url = $"{PluginController.apiUrl}/atomicassets/v1/accounts/{pluginController.GetWalletName()}?collection_whitelist={collectionNames}&only_whitelisted=false";
            var deserializedJsonResult = await GetDeserializedData<Ownership>(url);

            /*foreach (var detail in deserializedJsonResult.data.collections)
            {
                var sprite = await imageLoader.GetSpriteAsync(detail.data.img);
                result.inventoryAssetSprites.Add(sprite);
                result.invenoryAssetIds.Add(detail.assetId);
                result.inventoryAssetMintNumber.Add(detail.templateMint);
                result.inventoryAssetName.Add(detail.name);
            }*/

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
        var url = $"{PluginController.apiUrl}/atomicassets/v1/assets/_count?sort=transferred&order=desc&owner={pluginController.GetWalletName()}&only_whitelisted=false&collection_name={pluginController.GetCollectionName()}";
        var deserializedJsonResult = await GetDeserializedData<AssetCount>(url);
        return deserializedJsonResult.data;
    }
}
