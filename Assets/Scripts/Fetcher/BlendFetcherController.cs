using Newtonsoft.Json;
using System;
using System.Linq;
using System.Threading.Tasks;
using UnityEngine;

public class BlendFetcherController : MonoBehaviour,IFetcher
{
    [SerializeField] private PluginController pluginController;
    [SerializeField] private ImageLoader imageLoader;

    public class BlendAssets
    {
        public Sprite[] sprites { get; set; }
        public int[] assetIds { get; set; }
        public string[] contractNames { get; set; }
    }

    public async Task<Blend> GetDeserializedData<Blend>(string url)
    {
        var jsonResponse = await imageLoader.GetTextAsync(url);
        return JsonConvert.DeserializeObject<Blend>(jsonResponse);
    }

    public async Task<BlendAssets> FetchBlendAssetsAsync(int slotLimit, int currentPage)
    {
        try
        {
            var blendUrl = $"{PluginController.apiUrl}/neftyblends/v1/blends?collection_name={ pluginController.GetCollectionName() }&visibility=visible&render_markdown=false&page={ currentPage }&limit={ slotLimit }&order=desc&sort=created_at_time";
            var deserializedJsonResult = await GetDeserializedData<Blend>(blendUrl);

            if (deserializedJsonResult.data.Count == 0)
            {
                Debug.LogError("No data found for the given blend.");
                return null;
            }

            var blendAssets = deserializedJsonResult.data
                .Select(blend => (blend.rolls[0].outcomes[0].results[0].template.immutableData.img ?? "QmX8TS6johVqmrnuMNAYUV5kZ3ToFtgoWYK41NmAhMkufC", blend.blendId, blend.contract))
                .ToList();

            var spriteTasks = blendAssets.Select(asset => imageLoader.GetSpriteAsync(asset.Item1)).ToArray();
            var spriteResults = await Task.WhenAll(spriteTasks);

            var blendAssetList = new BlendAssets
            {
                sprites = spriteResults.ToArray(),
                assetIds = blendAssets.Select(asset => asset.Item2).ToArray(),
                contractNames = blendAssets.Select(asset => asset.Item3).ToArray()
            };

            return blendAssetList;
        }
        catch (Exception ex)
        {
            Debug.Log($"Error: {ex}");
            return null;
        }
    }
}
