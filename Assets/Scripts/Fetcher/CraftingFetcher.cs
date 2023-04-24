using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UnityEngine;

public class CraftingFetcher : MonoBehaviour,IFetcher
{
    [SerializeField] private PluginController pluginController;
    [SerializeField] private ImageLoader imageLoader;
    [SerializeField] private CraftingUI craftingUI;
    [SerializeField] private CraftAssetPopupUI craftAssetPopupUI;
    [SerializeField] private CraftAssetPopupController craftAssetPopupController;
    [SerializeField] private UIManager uIManager;
    [SerializeField] private GameObject currentSelectedIngredient;

    private void OnEnable()
    {
        // Triggers an Event on Blend Image being clicked
        BlendUIElementController.UserSelectedBlend += ReceiveBlendId;
        TemplateUIElementController.UserSelectedIngredient += ReceiveIngredients;
        TemplateUIElementController.UserSelectedGameobject += selectedObject;
    }

    private async void ReceiveBlendId(int blendId)
    {
        try
        {
            var (requiredAssetsResult, rollResult) = await GetRequiredAssets(blendId);
            var ingredientAssetsResult = await GetAllIndexIngredientAssets(blendId, requiredAssetsResult.uniqueIngredientCountIndex);

            craftAssetPopupController.currentBlendId = blendId;
            uIManager.EnableCraftingUI();
            craftingUI.DisplayAssetImages(requiredAssetsResult, ingredientAssetsResult,rollResult);
        }
        catch (Exception ex)
        {
            Debug.LogError($"Error receiving blend ID: { ex }");
        }
    }

    private async void ReceiveIngredients(int ingredientIndex)
    {
        try
        {
            var blendId = craftAssetPopupController.currentBlendId;
            var exactIndexIngredientAssetsResult = await GetExactIndexIngredientAssets(blendId, ingredientIndex);

            uIManager.EnableAssetPopup();
            craftAssetPopupUI.DisplayAssetImages(exactIndexIngredientAssetsResult);
        }
        catch (Exception ex)
        {
            Debug.LogError($"Error receiving ingredients: { ex }");
        }
    }

    private void selectedObject(GameObject gameObject)
    {
        currentSelectedIngredient = gameObject;
    }

    public async Task<NeftyBlend> GetDeserializedData<NeftyBlend>(string url)
    {
        var jsonResponse = await imageLoader.GetTextAsync(url);
        return JsonConvert.DeserializeObject<NeftyBlend>(jsonResponse);
    }

    public async Task<(RequiredAssetsResult,RollResult)> GetRequiredAssets(int blendId)
    {
        var result = new RequiredAssetsResult();
        var rollResult = new RollResult();
        try
        {
            var url = $"{PluginController.apiUrl}/neftyblends/v1/blends/blend.nefty/{blendId}?render_markdown=true";
            var deserializedJsonResult = await GetDeserializedData<NeftyBlend>(url);

            if (!deserializedJsonResult.Success)
            {
                Debug.LogError("No data found for the given crafting recipe.");
                return (null, null);
            }

            result.uniqueIngredientCountIndex = deserializedJsonResult.Details.Ingredients.Count;
            result.rollSprites = await Task.WhenAll(deserializedJsonResult.Details.Rolls
                 .SelectMany(i => i.Outcomes)
                 .SelectMany(o => o.Results)
                 .Select(r => r.Template?.ImmutableData?.Img)
                 .Where(img => img != null)
                 .Select(imageLoader.GetSpriteAsync));
            result.requirementSprites = await Task.WhenAll(deserializedJsonResult.Details.Ingredients.Select(i => imageLoader.GetSpriteAsync(i.Template.ImmutableData.Img)));
            result.requiredAssetAmount = deserializedJsonResult.Details.Ingredients.Select(i => i.Amount).ToArray();
            result.templateId = deserializedJsonResult.Details.Ingredients.Select(i => i.Template.TemplateId).ToArray();
            rollResult.rollSprites = await Task.WhenAll(deserializedJsonResult.Details.Rolls
               .SelectMany(i => i.Outcomes)
               .SelectMany(o => o.Results)
               .Select(r => r.Template?.ImmutableData?.Img)
               .Where(img => img != null)
               .Select(imageLoader.GetSpriteAsync));
            rollResult.rollPercentageRolls = deserializedJsonResult.Details.Rolls.SelectMany(i => i.Outcomes).Select(i => i.Odds).ToArray();
            rollResult.rollNames = deserializedJsonResult.Details.Rolls
               .SelectMany(i => i.Outcomes)
               .SelectMany(o => o.Results).Select(i => i.Template?.ImmutableData?.Name).ToArray();
            rollResult.totalOdds  = deserializedJsonResult.Details.Rolls[0].TotalOdds;

            return (result,rollResult);
        }
        catch (Exception ex)
        {
            Debug.Log($"Error: { ex }");
            return (null,null);
        }
    }

    public async Task<IndexIngredientAssetsResult> GetAllIndexIngredientAssets(int blendId, int ingredientIndexCount)
    {
        var result = new IndexIngredientAssetsResult();
        try
        {
            List<(string, string,int)> craftDetailsList = new List<(string, string, int)>();
            for (int i = 0; i < ingredientIndexCount; i++)
            {
                var url = $"{PluginController.apiUrl}/neftyblends/v1/blends/blend.nefty/{blendId}/ingredients/{i}/assets?owner={"4rmxq.wam"}&page=1&limit=100&order=desc&sort=asset_id";
                var deserializedJsonResult = await GetDeserializedData<Ingredient>(url);
                if (!deserializedJsonResult.Success)
                {
                    Debug.LogError("No data found for the given ingredient.");
                    return null;
                }
                foreach (var ingredient in deserializedJsonResult.details)
                {
                    var ingredientOutcome = ingredient.Data.Img;
                    var assetId = ingredient.AssetId;
                    craftDetailsList.Add((ingredientOutcome, assetId,i));
                }
            }

            result.ingredientSprites = await Task.WhenAll(craftDetailsList.Select(uri => imageLoader.GetSpriteAsync(uri.Item1)));
            result.assetIds = craftDetailsList.Select(i => i.Item2).ToArray();
            result.indexId = craftDetailsList.Select(i => i.Item3).ToArray();


            return result;
        }
        catch (Exception ex)
        {
            Debug.Log($"Error: { ex }");
            return null;
        }
    }

    public async Task<ExactIndexIngredientAssetsResult> GetExactIndexIngredientAssets(int blendId, int ingredientIndex)
    {
        try
        {
            List<(string, string, string, int)> craftDetailsList = new List<(string, string, string, int)>();
            var url = $"{ PluginController.apiUrl }/neftyblends/v1/blends/blend.nefty/{ blendId }/ingredients/{ ingredientIndex }/assets?owner={"4rmxq.wam"}&page=1&limit=100&order=desc&sort=asset_id";
            var deserializedJsonResult = await GetDeserializedData<Ingredient>(url);
            if (!deserializedJsonResult.Success)
            {
                Debug.LogError("No data found for the given ingredient.");
                return null;
            }
            foreach (var ingredient in deserializedJsonResult.details)
            {
                var ingredientOutcome = ingredient.Data.Img;
                var assetId = ingredient.AssetId;
                var assetName = ingredient.Name;
                var mintNumber = ingredient.TemplateMint;

                craftDetailsList.Add((ingredientOutcome, assetId, assetName, mintNumber));
            }
            var downloadedIngredientSprites = craftDetailsList.Select(uri => imageLoader.GetSpriteAsync(uri.Item1)).ToArray();
            var assetIds = craftDetailsList.Select(i => i.Item2).ToArray();
            var assetNames = craftDetailsList.Select(i => i.Item3).ToArray();
            var mintNumbers = craftDetailsList.Select(i => i.Item4).ToArray();
            var spriteIngredientResults = await Task.WhenAll(downloadedIngredientSprites);

            return new ExactIndexIngredientAssetsResult
            {
                sprites = spriteIngredientResults,
                assetIds = assetIds,
                assetNames = assetNames,
                mintNumbers = mintNumbers
            };
        }
        catch (Exception ex)
        {
            Debug.Log($"Error: { ex }");
            return null;
        }
    }
}
