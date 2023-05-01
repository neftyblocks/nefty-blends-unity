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
            var ingredientAssetsResult = await GetAllIndexIngredientAssets(blendId, requiredAssetsResult);
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
        var requiredAssetsResult = new RequiredAssetsResult();
        var rollResult = new RollResult();
        try
        {
            var url = $"{PluginController.apiUrl}/neftyblends/v1/blends/blend.nefty/{blendId}?render_markdown=true";
            var deserializedJsonResult = await GetDeserializedData<NeftyBlend>(url);

            if (!deserializedJsonResult.success)
            {
                Debug.LogError("No data found for the given crafting recipe.");
                return (null, null);
            }

            foreach (var ingredient in deserializedJsonResult.details.ingredients)
            {
                switch (ingredient.type)
                {
                    case "TEMPLATE_INGREDIENT":
                        requiredAssetsResult.requirementType.Add(ingredient.type);
                        requiredAssetsResult.templateId.Add(ingredient.template.templateId);
                        requiredAssetsResult.requirementSprites.Add(await imageLoader.GetSpriteAsync(ingredient.template.immutableData.img));
                        break;
                    case "SCHEMA_INGREDIENT":
                        requiredAssetsResult.requirementType.Add(ingredient.type);
                        requiredAssetsResult.requirementSprites.Add(null);
                        requiredAssetsResult.requirementText.Add(ingredient.schema.schemaName);
                        break;
                    case "COLLECTION_INGREDIENT":
                        requiredAssetsResult.requirementType.Add(ingredient.type);
                        requiredAssetsResult.requirementSprites.Add(null);
                        requiredAssetsResult.requirementText.Add(ingredient.collection.collectionName);
                        break;
                    case "FT_INGREDIENT":
                        requiredAssetsResult.requirementType.Add(ingredient.type);
                        requiredAssetsResult.requirementSprites.Add(null);
                        requiredAssetsResult.requirementText.Add(ingredient.ftAmount.amount.ToString());
                        break;
                    case "ATTRIBUTE_INGREDIENT":
                        requiredAssetsResult.requirementType.Add(ingredient.type);
                        requiredAssetsResult.requirementSprites.Add(null);
                        requiredAssetsResult.requirementText.Add(ingredient.attributes.attributesAttributes.FirstOrDefault()?.allowedValues.FirstOrDefault());
                        break;
                    default:
                        break;
                }
                requiredAssetsResult.ingredientIndex.Add(ingredient.index);
            }
           requiredAssetsResult.requiredAssetAmount = deserializedJsonResult.details.ingredients
                .Select(i => i.amount)
                .ToList();

            rollResult.rollSprites = await Task.WhenAll(deserializedJsonResult.details.rolls
                .SelectMany(i => i.outcomes)
                .Select(r => r.results.FirstOrDefault()?.template?.immutableData.img)
                .Select(imageLoader.GetSpriteAsync));

            rollResult.rollPercentageRolls = deserializedJsonResult.details.rolls
                .SelectMany(i => i.outcomes)
                .Select(i => i.odds)
                .ToArray();

            rollResult.rollNames = deserializedJsonResult.details.rolls
                .SelectMany(i => i.outcomes)
                .Select(o => o.results.FirstOrDefault()?.template?.immutableData?.name ?? "burn")
                .ToArray();

            rollResult.totalOdds = deserializedJsonResult.details.rolls[0].totalOdds;

            return (requiredAssetsResult, rollResult);
        }
        catch (Exception ex)
        {
            Debug.Log($"Error: { ex }");
            return (null,null);
        }
    }

    public async Task<IndexIngredientAssetsResult> GetAllIndexIngredientAssets(int blendId, RequiredAssetsResult requiredAssetsResult)
    {
        var ingredientAssetsResult = new IndexIngredientAssetsResult();
        try
        {
            foreach (var index in requiredAssetsResult.ingredientIndex)
            {
                var url = $"{PluginController.apiUrl}/neftyblends/v1/blends/blend.nefty/{blendId}/ingredients/{index}/assets?owner={pluginController.GetWalletName()}&page=1&limit=100&order=desc&sort=asset_id";
                var deserializedJsonResult = await GetDeserializedData<Ingredient>(url);
                if (!deserializedJsonResult.success)
                {
                    Debug.LogError("No data found for the given ingredient.");
                    return null;
                }
                foreach (var ingredient in deserializedJsonResult.details)
                {
                    var ingredientOutcome = ingredient.data.img;
                    var assetId = ingredient.assetId;
                    ingredientAssetsResult.ingredientSprites.Add(await imageLoader.GetSpriteAsync(ingredientOutcome));
                    ingredientAssetsResult.assetIds.Add(ingredient.assetId);
                    ingredientAssetsResult.indexId.Add(index);
                }
            }

            return ingredientAssetsResult;
        }
        catch (Exception ex)
        {
            Debug.Log($"Error: {ex}");
            return null;
        }
    }

    public async Task<ExactIndexIngredientAssetsResult> GetExactIndexIngredientAssets(int blendId, int ingredientIndex)
    {
        try
        {
            var url = $"{PluginController.apiUrl}/neftyblends/v1/blends/blend.nefty/{blendId}/ingredients/{ingredientIndex}/assets?owner={ pluginController.GetWalletName() }&page=1&limit=100&order=desc&sort=asset_id";
            Debug.Log(url);
            var deserializedJsonResult = await GetDeserializedData<Ingredient>(url);
            if (!deserializedJsonResult.success)
            {
                Debug.LogError("No data found for the given ingredient.");
                return null;
            }

            var downloadedIngredientSprites = deserializedJsonResult.details.Select(i => imageLoader.GetSpriteAsync(i.data.img)).ToArray();
            var assetIds = deserializedJsonResult.details.Select(i => i.assetId).ToArray();
            var assetNames = deserializedJsonResult.details.Select(i => i.name).ToArray();
            var mintNumbers = deserializedJsonResult.details.Select(i => i.templateMint).ToArray();
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
            Debug.Log($"Error: {ex}");
            return null;
        }
    }
}
