using Newtonsoft.Json;
using System;
using System.Threading.Tasks;
using UnityEngine;

public class CollectionFetcherController : MonoBehaviour
{
    [SerializeField] public ImageLoader imageLoader;
    [SerializeField] public PluginController pluginController;
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

            var imageHash = resultObject.data.img;
            return await imageLoader.GetSpriteAsync(imageHash);
        }
        catch (Exception ex)
        {
            Debug.Log($"Error: {ex}");
            return null;
        }
    }
}
