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
        var (rollSprites, requirementSprites,ingredientIndexCount) = await GetCraftingAssets(blendId);
        var ingredientSprites = await GetIngredientAssets(blendId, ingredientIndexCount);

        uIManager.EnableCraftingUI();
        craftingUI.DisplayAssetImages(rollSprites, requirementSprites, ingredientSprites);
    }
    public async Task<NeftyBlend> GetDeserializedData<NeftyBlend>(string url)
    {
        var jsonResponse = await imageLoader.GetTextAsync(url);

        return JsonConvert.DeserializeObject<NeftyBlend>(jsonResponse);
    }

    public async Task<(Sprite[], Sprite[],int)> GetCraftingAssets(int blendId)
    {
        var uniqueIngredientCount = 0;

        try
        {
            List<string> requirementsDetailsList = new List<string>();
            List<string> ingredientstDetailsList = new List<string>();
            var url = $"{PluginController.apiUrl}/neftyblends/v1/blends/blend.nefty/{blendId}?render_markdown=true";
            var deserializedJsonResult = await GetDeserializedData<NeftyBlend>(url);

            if (!deserializedJsonResult.Success)
            {
                Debug.LogError("No data found for the given crafting recipe.");
                return (null,null, uniqueIngredientCount);
            }

            // Download or Get from cache an Sprite
            var rollOutcome = deserializedJsonResult.MainData.Rolls[0].Outcomes[0].Results[0].Template.ImmutableData.Img;
            uniqueIngredientCount = deserializedJsonResult.MainData.Ingredients.Count;
            requirementsDetailsList.Add(rollOutcome);
            // Split resulsts per variable into own array
            var downloadedRequirementSprites = requirementsDetailsList.Select(uri => imageLoader.GetSpriteAsync(uri)).ToArray();
            var spriteRequirementResults = await Task.WhenAll(downloadedRequirementSprites);

            foreach (var ingredient in deserializedJsonResult.MainData.Ingredients)
            {
                var ingredientOutcome = ingredient.Template.ImmutableData.Img;
                ingredientstDetailsList.Add(ingredientOutcome);
            }

            // Download or Get from cache an Sprite
            var downloadedIngredientSprites = ingredientstDetailsList.Select(uri => imageLoader.GetSpriteAsync(uri)).ToArray();
            var spriteIngredientsResults = await Task.WhenAll(downloadedIngredientSprites);

            return (spriteRequirementResults, spriteIngredientsResults, uniqueIngredientCount);
        }
        catch (Exception ex)
        {
            Debug.Log($"Error: {ex}");
            return (null, null, uniqueIngredientCount);
        }
    }

    public async Task<Sprite[]> GetIngredientAssets(int blendId, int ingredientIndexCount)
    {
        try
        {
            List<string> craftDetailsList = new List<string>();
            for (int i = 0;i < ingredientIndexCount; i++)
            {
                var url = $"{PluginController.apiUrl}/neftyblends/v1/blends/blend.nefty/{blendId}/ingredients/{i}/assets?owner={"4rmxq.wam"}&page=1&limit=1&order=desc&sort=asset_id";
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
            var downloadedSprites2 = craftDetailsList.Select(uri => imageLoader.GetSpriteAsync(uri)).ToArray();
            var spriteResults2 = await Task.WhenAll(downloadedSprites2);

            return spriteResults2; 
        }
        catch (Exception ex)
        {
            Debug.Log($"Error: {ex}");
            return (null);
        }
    }
}
