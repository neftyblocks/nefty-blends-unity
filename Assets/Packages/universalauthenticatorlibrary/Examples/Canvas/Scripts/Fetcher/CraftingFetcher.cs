using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UnityEngine;

public class CraftingFetcher : MonoBehaviour,IFetcher
{
    [SerializeField] public PluginController pluginController;
    [SerializeField] public ImageLoader imageLoader;
    [SerializeField] public CraftingUI craftingUI;
    [SerializeField] public UIManager uIManager;

    private void OnEnable()
    {
        // Event: When Blend Image is clicked
        BlendUIElementController.UserSelectedBlend += ReceiveBlendId;
    }

    public async void ReceiveBlendId(int blendId)
    {
        var (rollSprites, requirementSprites,ingredientIndexCount, requiredAssetAmount) = await GetRequiredAssets(blendId);
        var ingredientSprites = await GetIngredientAssets(blendId, ingredientIndexCount);

        uIManager.EnableCraftingUI();
        craftingUI.DisplayAssetImages(rollSprites, requirementSprites, ingredientSprites, requiredAssetAmount);
    }
    public async Task<NeftyBlend> GetDeserializedData<NeftyBlend>(string url)
    {
        var jsonResponse = await imageLoader.GetTextAsync(url);

        return JsonConvert.DeserializeObject<NeftyBlend>(jsonResponse);
    }

    public async Task<(Sprite[], Sprite[], int, int[])> GetRequiredAssets(int blendId)
    {
        var uniqueIngredientCountIndex = 0;

        try
        {
            var url = $"{PluginController.apiUrl}/neftyblends/v1/blends/blend.nefty/{blendId}?render_markdown=true";
            var deserializedJsonResult = await GetDeserializedData<NeftyBlend>(url);

            if (!deserializedJsonResult.Success)
            {
                Debug.LogError("No data found for the given crafting recipe.");
                return (null, null, 0,null);
            }

            uniqueIngredientCountIndex = deserializedJsonResult.MainData.Ingredients.Count;
            var rollSprites = await Task.WhenAll(deserializedJsonResult.MainData.Rolls.Select(i => imageLoader.GetSpriteAsync(i.Outcomes[0].Results[0].Template.ImmutableData.Img)));
            var requirementSprites = await Task.WhenAll(deserializedJsonResult.MainData.Ingredients.Select(i => imageLoader.GetSpriteAsync(i.Template.ImmutableData.Img)));
            var requiredAssetAmount = deserializedJsonResult.MainData.Ingredients.Select(i => i.Amount).ToArray();
           
            return (rollSprites, requirementSprites, uniqueIngredientCountIndex, requiredAssetAmount);
        }
        catch (Exception ex)
        {
            Debug.Log($"Error: {ex}");
            return (null, null, 0,null);
        }
    }

    public async Task<Sprite[]> GetIngredientAssets(int blendId, int ingredientIndexCount)
    {
        try
        {
            List<string> craftDetailsList = new List<string>();
            for (int i = 0;i < ingredientIndexCount; i++)
            {
                var url = $"{PluginController.apiUrl}/neftyblends/v1/blends/blend.nefty/{blendId}/ingredients/{i}/assets?owner={"4rmxq.wam"}&page=1&limit=100&order=desc&sort=asset_id";
                var deserializedJsonResult = await GetDeserializedData<Ingredient>(url);
                if (!deserializedJsonResult.Success)
                {
                    Debug.LogError("No data found for the given ingredient.");
                    return null;
                }
                foreach (var ingredient in deserializedJsonResult.DataData)
                {
                    var ingredientOutcome = ingredient.Data.Img;
                    craftDetailsList.Add(ingredientOutcome);
                }

            }
            // Download or Get from cache an Sprite
            var downloadedIngredientSprites = craftDetailsList.Select(uri => imageLoader.GetSpriteAsync(uri)).ToArray();
            var spriteIngredientResults = await Task.WhenAll(downloadedIngredientSprites);

            return spriteIngredientResults; 
        }
        catch (Exception ex)
        {
            Debug.Log($"Error: {ex}");
            return (null);
        }
    }
}
