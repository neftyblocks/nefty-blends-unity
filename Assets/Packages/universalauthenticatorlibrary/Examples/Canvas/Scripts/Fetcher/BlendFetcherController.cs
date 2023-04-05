using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UnityEngine;
using UnityEngine.Networking;

public class BlendFetcherController : MonoBehaviour,IFetcher
{
    [SerializeField] private static Dictionary<string, Sprite> _spriteCache = new Dictionary<string, Sprite>();
    [SerializeField] public PluginController pluginController;

    public async Task<Blend> GetDeserializedData<Blend>(string url, int slotLimit, int currentPage)
    {
        var jsonResponse = await GetTextAsync(url);

        return JsonConvert.DeserializeObject<Blend>(jsonResponse);
    }
    public async Task<(Sprite[], int[], string[])> GetBlendAssets(int slotLimit, int currentPage)
    {
        try
        {
            var url = $"{PluginController.apiUrl}/neftyblends/v1/blends?collection_name={pluginController.GetCollectionName()}&visibility=visible&render_markdown=false&page={currentPage}&limit={slotLimit}&order=desc&sort=created_at_time";

            var resultObject = await GetDeserializedData<Blend>(url, slotLimit, currentPage);
            if (resultObject.Data.Count == 0)
            {
                Debug.LogError("No data found for the given blend.");
                return (null, null,null);
            }
            List<(string, int,string)> imageUrisWithIds = new List<(string, int, string)>();

            for (int i = 0; i < resultObject.Data.Count; i++)
            {               
                var imageUri = resultObject.Data[i].Rolls[0].Outcomes[0].Results[0].Template.ImmutableData.Img;
                var blendId = resultObject.Data[i].BlendId;
                var contractName = resultObject.Data[i].Contract;
                if (imageUri == null)
                {
                    imageUri = "QmX8TS6johVqmrnuMNAYUV5kZ3ToFtgoWYK41NmAhMkufC";
                }
                imageUrisWithIds.Add((imageUri, blendId, contractName));
            }
            var downloadedSprites = imageUrisWithIds.Select(uriWithId => (GetSpriteAsync(uriWithId.Item1), uriWithId.Item2,uriWithId.Item3)).ToArray();
            var spriteTasks = downloadedSprites.Select(tuple => tuple.Item1).ToArray();
            var spriteResults = await Task.WhenAll(spriteTasks);
            var sprites = spriteResults.Select(sprite => sprite).ToArray();
            var assetIds = downloadedSprites.Select(tuple => tuple.Item2).ToArray();
            var contractNames = downloadedSprites.Select(tuple => tuple.Item3).ToArray();
            return (sprites, assetIds, contractNames);
        }
        catch (Exception ex)
        {
            Debug.Log($"Error: {ex}");
            return (null, null, null);
        }
    }

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
        if (_spriteCache.TryGetValue(imageUri, out Sprite sprite))
        {
            Debug.Log($"{imageUri} already cached");
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
}
