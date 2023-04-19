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
                return (null, null, null);
            }

            var blendAssets = deserializedJsonResult.Data
                .Select(blend => (blend.Rolls[0].Outcomes[0].Results[0].Template.ImmutableData.Img ?? "QmX8TS6johVqmrnuMNAYUV5kZ3ToFtgoWYK41NmAhMkufC", blend.BlendId, blend.Contract))
                .ToList();

            var spriteTasks = blendAssets.Select(asset => imageLoader.GetSpriteAsync(asset.Item1)).ToArray();
            var spriteResults = await Task.WhenAll(spriteTasks);

            var sprites = spriteResults.ToArray();
            var assetIds = blendAssets.Select(asset => asset.Item2).ToArray();
            var contractNames = blendAssets.Select(asset => asset.Item3).ToArray();

            return (sprites, assetIds, contractNames);
        }
        catch (Exception ex)
        {
            Debug.Log($"Error: {ex}");
            return (null, null, null);
        }
    }
}
