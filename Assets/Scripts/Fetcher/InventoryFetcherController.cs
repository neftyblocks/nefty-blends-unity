using Newtonsoft.Json;
using System;
using System.Linq;
using System.Threading.Tasks;
using TMPro;
using UnityEngine;

/// <summary>
/// InventoryFetcherController is responsible for fetching and handling Asset data.
/// </summary>
public class InventoryFetcherController : MonoBehaviour, IFetcher
{
    [SerializeField] private ImageLoader imageLoader;
    [SerializeField] private PluginController pluginController;
    [SerializeField] private InventoryUI inventoryUI;
 
    public async Task<Asset> GetDeserializedData<Asset>(string url)
    {
        var jsonResponse = await imageLoader.GetTextAsync(url);
        return JsonConvert.DeserializeObject<Asset>(jsonResponse);
    }

    public async Task<InventoryAsset> GetInventoryAssets(string filter)
    {
        var result = new InventoryAsset();
        Sprite sprite = null;
        try
        {
            string sortOption = GetSortOption(filter);
            var url = $"{ PluginController.apiUrl }/atomicassets/v1/assets?{ sortOption }&owner={ pluginController.GetWalletName() }&page={ inventoryUI.apiCurrentPage }&limit=100&only_whitelisted=false&collection_name={ pluginController.GetCollectionName() }";
            var deserializedJsonResult = await GetDeserializedData<Asset>(url);
            Debug.Log(url);
            foreach (var detail in deserializedJsonResult.details)
            {
                if (detail.data.img != null)
                {
                    sprite = await imageLoader.GetSpriteAsync(detail.data.img);
                }
                else
                {
                    sprite = await imageLoader.GetSpriteAsync(detail.data.video);
                }

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

    private string GetSortOption(string filter)
    {
        switch (filter)
        {
            case "Transferred (Newest)":
                return "sort=transferred&order=desc";
            case "Transferred (Oldest)":
                return "sort=transferred&order=asc";
            case "Name (A-Z)":
                return "sort=name&order=asc";
            case "Name (Z-A)":
                return "sort=name&order=desc";
            case "Mint (Highest)":
                return "sort=template_mint&order=desc";
            case "Mint (Lowest)":
                return "sort=template_mint&order=asc";
            default:
                return "sort=transferred&order=desc";
        }
    }

    public async Task<int> GetInventoryAssetsCount()
    {
        if (!string.IsNullOrEmpty(PluginController.walletName))
        {
            var url = $"{PluginController.apiUrl}/atomicassets/v1/assets/_count?sort=transferred&order=desc&owner={pluginController.GetWalletName()}&only_whitelisted=false&collection_name={pluginController.GetCollectionName()}";
            var deserializedJsonResult = await GetDeserializedData<AssetCount>(url);
            return deserializedJsonResult.data;
        }
        return 0;
    }
}
