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

    private async void Start()
    {
        bool ownsTemplate = await OwnsSchema2("auroratesttt", "rarities", 5);
        Debug.Log("Owns Template: " + ownsTemplate);
    }

    public async Task<bool> OwnsCollection(string collectionName, int amount)
    {
        try
        {
            var url = $"{PluginController.apiUrl}/atomicassets/v1/accounts/{pluginController.GetWalletName()}?collection_whitelist={collectionName}&only_whitelisted=false";
            var deserializedJsonResult = await GetDeserializedData<Ownership>(url);

            if (deserializedJsonResult.data.collections.Count > 0 && amount < deserializedJsonResult.data.collections[0].assets)
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

    public async Task<bool> OwnsSchema(string collectionName,string schemaName, int amount)
    {
        try
        {
            var url = $"{PluginController.apiUrl}/atomicassets/v1/accounts/{pluginController.GetWalletName()}/{collectionName}";
            var deserializedJsonResult = await GetDeserializedData<OwnershipSchema>(url);

            foreach (var schema in deserializedJsonResult.data.schemas)
            {
                Debug.Log(schema.schemaName.ToString() + " " + schemaName.ToString());
                if (schema.schemaName == schemaName && schema.assets > amount)
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
                if (template.templateId == templateid && template.assets > amount)
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

    public async Task<bool> OwnsSchema2(string collectionName, string schemaName, int amount)
    {
        try
        {
            var url = $"{PluginController.apiUrl}/atomicassets/v1/accounts/blksmith.gm/{collectionName}";
            var deserializedJsonResult = await GetDeserializedData<OwnershipSchema>(url);

            foreach (var schema in deserializedJsonResult.data.schemas)
            {
                Debug.Log($"Schema Name: {schema.schemaName}, Provided Schema Name: {schemaName}");
                Debug.Log($"Schema Assets: {schema.assets}, Required Amount: {amount}");

                if (schema.schemaName == schemaName && schema.assets > amount)
                {
                    Debug.Log("Schema found with sufficient assets.");
                    return true;
                }
            }

            Debug.Log("No matching schema found or insufficient assets.");
            return false;
        }
        catch (Exception ex)
        {
            Debug.LogError($"Error: {ex}");
            return false;
        }
    }


    public async Task<int> GetInventoryAssetsCount()
    {
        var url = $"{PluginController.apiUrl}/atomicassets/v1/assets/_count?sort=transferred&order=desc&owner={pluginController.GetWalletName()}&only_whitelisted=false&collection_name={pluginController.GetCollectionName()}";
        var deserializedJsonResult = await GetDeserializedData<AssetCount>(url);
        return deserializedJsonResult.data;
    }
}
