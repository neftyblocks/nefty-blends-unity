using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UnityEngine;

public class BlendFetcherController : MonoBehaviour,IFetcher
{
    [SerializeField] public PluginController pluginController;
    [SerializeField] public ImageLoader imageLoader;

    public async Task<Blend> GetDeserializedData<Blend>(string url)
    {
        var jsonResponse = await imageLoader.GetTextAsync(url);
        return JsonConvert.DeserializeObject<Blend>(jsonResponse);
    }
    public async Task<(Sprite[], int[], string[])> GetBlendAssets(int slotLimit, int currentPage)
    {
        try
        {
            List<(string, int, string)> imageHashsWithIds = new List<(string, int, string)>();
            var blendUrl = $"{PluginController.apiUrl}/neftyblends/v1/blends?collection_name={pluginController.GetCollectionName()}&visibility=visible&render_markdown=false&page={currentPage}&limit={slotLimit}&order=desc&sort=created_at_time";
            var deserializedJsonResult = await GetDeserializedData<Blend>(blendUrl);

            if (deserializedJsonResult.Data.Count == 0)
            {
                Debug.LogError("No data found for the given blend.");
                return (null, null,null);
            }

            for (int i = 0; i < deserializedJsonResult.Data.Count; i++)
            {               
                var imageHash = deserializedJsonResult.Data[i].Rolls[0].Outcomes[0].Results[0].Template.ImmutableData.Img;
                var blendId = deserializedJsonResult.Data[i].BlendId;
                var contractName = deserializedJsonResult.Data[i].Contract;

                if (imageHash == null)
                {
                    imageHash = "QmX8TS6johVqmrnuMNAYUV5kZ3ToFtgoWYK41NmAhMkufC";
                }
                imageHashsWithIds.Add((imageHash, blendId, contractName));
            }
            // Download or Get from cache an Sprite
            var downloadedSprites = imageHashsWithIds.Select(uriWithId => (imageLoader.GetSpriteAsync(uriWithId.Item1), uriWithId.Item2,uriWithId.Item3)).ToArray();
            var spriteTasks = downloadedSprites.Select(tuple => tuple.Item1).ToArray();
            var spriteResults = await Task.WhenAll(spriteTasks);
            // Split resulsts per variable into own array
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
}
