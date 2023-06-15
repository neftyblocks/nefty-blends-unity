using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using UnityEngine;
using UnityEngine.Networking;

public interface IImageLoader
{
    Task<string> GetTextAsync(string url);
    Task<Sprite> GetSpriteAsync(string imageUri);
}

/// <summary>
/// ImageLoader is a class for loading image and text from URLs basd on IPFS hash including caching.
/// </summary>
public class ImageLoader : MonoBehaviour, IImageLoader
{
    [SerializeField] private static Dictionary<string, Sprite> _spriteCache = new Dictionary<string, Sprite>();

    public async Task<string> GetTextAsync(string url)
    {
        var request = UnityWebRequest.Get(url);
        var operation = request.SendWebRequest();

        while (!operation.isDone)
        {
            await Task.Yield();
        }

        if (request.result != UnityWebRequest.Result.Success)
        {
            throw new UnityException(request.error);
        }

        return request.downloadHandler.text;
    }

    public async Task<Sprite> GetSpriteAsync(string imageUri)
    {
        try
        {
            if (string.IsNullOrEmpty(imageUri))
            {
                var defaultImage = Resources.Load<Sprite>("UI/Burn_Image");
                if (defaultImage == null)
                {
                    throw new UnityException("Default image not found.");
                }
                return defaultImage;
            }

            if (_spriteCache.TryGetValue(imageUri, out Sprite sprite))
            {
                return sprite;
            }

            var url = $"{PluginController.ipfsUrl}?ipfs={imageUri}&width=300&static=false";
            var request = UnityWebRequestTexture.GetTexture(url);
            var operation = request.SendWebRequest();

            while (!operation.isDone)
            {
                await Task.Yield();
            }

            if (request.result != UnityWebRequest.Result.Success)
            {
                throw new UnityException(request.error);
            }

            var texture = ((DownloadHandlerTexture)request.downloadHandler).texture;
            sprite = Sprite.Create(texture, new Rect(0, 0, texture.width, texture.height), Vector2.one * 0.5f);

            if (!_spriteCache.ContainsKey(imageUri))
            {
                _spriteCache.Add(imageUri, sprite);
            }
            return sprite;
        }
        catch(Exception e)
        {
            Debug.Log(e);
            var defaultImage = Resources.Load<Sprite>("UI/Burn_Image");
            if (defaultImage == null)
            {
                throw new UnityException("Default image not found.");
            }
            return defaultImage;
        }
        
    }
}
