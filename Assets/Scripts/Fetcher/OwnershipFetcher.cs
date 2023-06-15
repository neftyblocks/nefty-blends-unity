using Newtonsoft.Json;
using System;
using System.Linq;
using System.Threading.Tasks;
using UnityEngine;


public interface IOwnershipFetcher
{
    Task<bool> OwnsCollection(string collectionName, int amount);
    Task<bool> OwnsSchema(string collectionName, string schemaName, int amount);
    Task<bool> OwnsTemplate(string collectionName, int templateId, int amount);
    Task<Asset> RetrieveAsset(string filter);
}
/// <summary>
/// OwnershipFetcher is responsible for fetching and handling ownership data.
/// </summary>
public class OwnershipFetcher : MonoBehaviour, IFetcher, IOwnershipFetcher
{
    [SerializeField] public ImageLoader imageLoader;
    [SerializeField] public PluginController pluginController;

    public async Task<Ownership> GetDeserializedData<Ownership>(string url)
    {
        var jsonResponse = await imageLoader.GetTextAsync(url);
        return JsonConvert.DeserializeObject<Ownership>(jsonResponse);
    }

    public async Task<bool> OwnsCollection(string collectionName, int amount)
    {
        try
        {
            var url = $"{PluginController.apiUrl}/atomicassets/v1/accounts/{pluginController.GetWalletName()}?collection_whitelist={collectionName}&only_whitelisted=false";
            var deserializedJsonResult = await GetDeserializedData<Ownership>(url);

            if (deserializedJsonResult.data.collections.Count > 0 && amount <= deserializedJsonResult.data.collections[0].assets)
            {
                return true;
            }
            return false;
        }
        catch (Exception ex)
        {
            Debug.LogError($"Error: {ex}");
            return false;
        }
    }

    public async Task<bool> OwnsSchema(string collectionName, string schemaName, int amount)
    {
        try
        {
            var url = $"{PluginController.apiUrl}/atomicassets/v1/accounts/{pluginController.GetWalletName()}/{collectionName}";
            var deserializedJsonResult = await GetDeserializedData<OwnershipSchema>(url);

            foreach (var schema in deserializedJsonResult.data.schemas)
            {
                if (schema.schemaName == schemaName && schema.assets >= amount)
                {
                    return true;
                }
            }
            return false;
        }
        catch (Exception ex)
        {
            Debug.LogError($"Error: {ex}");
            return false;
        }
    }

    public async Task<bool> OwnsTemplate(string collectionName, int templateid, int amount)
    {
        try
        {
            var url = $"{PluginController.apiUrl}/atomicassets/v1/accounts/{pluginController.GetWalletName()}?collection_whitelist={collectionName}&only_whitelisted=false";
            var deserializedJsonResult = await GetDeserializedData<Ownership>(url);

            foreach (var template in deserializedJsonResult.data.templates)
            {
                if (template.templateId == templateid && template.assets >= amount)
                {
                    return true;
                }
            }
            return false;
        }
        catch (Exception ex)
        {
            Debug.LogError($"Error: {ex}");
            return false;
        }
    }

    public async Task<Asset> RetrieveAsset(string filter)
    {
        try
        {
            var url = $"{PluginController.apiUrl}/atomicassets/v1/assets?owner={pluginController.GetWalletName()}&page=1&limit=100&order=desc&sort=asset_id" + filter;
            var deserializedJsonResult = await GetDeserializedData<Asset>(url);

            return deserializedJsonResult;

        }
        catch (Exception ex)
        {
            Debug.LogError($"Error: {ex}");
            return null;
        }
    }
}
