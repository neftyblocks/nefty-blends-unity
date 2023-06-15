using Newtonsoft.Json;
using System;
using System.Linq;
using System.Threading.Tasks;
using UnityEngine;

/// <summary>
/// BlendFetcherController is responsible for fetching and handling blend data.
/// </summary>
public class BlendFetcherController : MonoBehaviour, IFetcher
{
    [SerializeField] private PluginController pluginController;
    [SerializeField] private ImageLoader imageLoader;

    public class BlendAssets
    {
        public Sprite[] sprites { get; set; }
        public int[] assetIds { get; set; }
        public string[] contractNames { get; set; }
        public string[] blendNames { get; set; }
    }

    public async Task<Blend> GetDeserializedData<Blend>(string url)
    {
        var jsonResponse = await imageLoader.GetTextAsync(url);
        return JsonConvert.DeserializeObject<Blend>(jsonResponse);
    }

    public async Task<BlendAssets> FetchBlendAssets(int currentPage)
    {
        try
        {
            var blendUrl = $"{PluginController.apiUrl}/neftyblends/v1/blends?collection_name={pluginController.GetCollectionName()}&page={currentPage}&limit=100&render_markdown=true&order=desc&sort=created_at_time";
            var deserializedJsonResult = await GetDeserializedData<Blend>(blendUrl);
            if (deserializedJsonResult.data.Count == 0)
            {
                Debug.LogError("No data found for the given blend.");
                return null;
            }

            var blendAssets = deserializedJsonResult.data.Select(blend =>
            {
                var displayImage = blend.displayData.image;
                if (string.IsNullOrEmpty(displayImage))
                {
                    displayImage = blend.rolls.SelectMany(roll => roll.outcomes)
                    .SelectMany(outcome => outcome.results)
                    .Select(result => result.template?.immutableData?.img)
                    .FirstOrDefault();
                }

                return (displayImage, blend.blendId, blend.contract, blend.displayData.name);
            }).ToList();

            var spriteResults = await Task.WhenAll(blendAssets.Select(asset => imageLoader.GetSpriteAsync(asset.Item1)));

            return new BlendAssets
            {
                sprites = spriteResults,
                assetIds = blendAssets.Select(asset => asset.Item2).ToArray(),
                contractNames = blendAssets.Select(asset => asset.Item3).ToArray(),
                blendNames = blendAssets.Select(asset => asset.Item4).ToArray()
            };
        }
        catch (Exception ex)
        {
            Debug.Log($"Error: {ex}");
            return null;
        }
    }
}
