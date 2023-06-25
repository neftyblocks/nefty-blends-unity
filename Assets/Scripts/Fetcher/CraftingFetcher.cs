using Newtonsoft.Json;
using System;
using System.Linq;
using System.Threading.Tasks;
using UnityEngine;

public class CraftingFetcher : MonoBehaviour, IFetcher
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
        BlendUIElementController.UserSelectedBlend += ReceiveBlendId;
        RequirementUIElementController.UserSelectedIngredient += ReceiveIngredients;
        RequirementUIElementController.UserSelectedGameobject += SelectedObject;
    }

    private async void ReceiveBlendId(int blendId)
    {
        try
        {
            var (requiredAssetsResult, rollResult, securityId) = await GetRequiredAssets(blendId);
            var ingredientAssetsResult = await GetAllIndexIngredientAssets(blendId, requiredAssetsResult);

            craftAssetPopupController.currentBlendId = blendId;
            TooltipManager.tooltipManager.HideTooltip();
            uIManager.EnableCraftingUI();
            craftingUI.DisplayAssetImages(requiredAssetsResult, ingredientAssetsResult, rollResult, securityId);
        }
        catch (Exception ex)
        {
            Debug.LogError($"Error receiving blend ID: {ex}");
        }
    }

    // By clicking requirement you toggle this function
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
            Debug.LogError($"Error receiving ingredients: {ex}");
        }
    }

    private void SelectedObject(GameObject selectedObject)
    {
        currentSelectedIngredient = selectedObject;
    }

    public async Task<NeftyBlend> GetDeserializedData<NeftyBlend>(string url)
    {
        var jsonResponse = await imageLoader.GetTextAsync(url);
        return JsonConvert.DeserializeObject<NeftyBlend>(jsonResponse);
    }

    public async Task<Sprite> GetImageLoaderSpriteAsync(string url)
    {
        return await imageLoader.GetSpriteAsync(url);
    }

    private async Task<(RequiredAssetsResult, RollResult, int)> GetRequiredAssets(int blendId)
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
                return (null, null, 0);
            }

            var securityId = deserializedJsonResult.details.securityId;
            var marketplaceLink = "https://neftyblocks.com/marketplace/listing";
            foreach (var ingredient in deserializedJsonResult.details.ingredients)
            {
                switch (ingredient.type)
                {
                    case "TEMPLATE_INGREDIENT":
                        requiredAssetsResult.requirementType.Add(ingredient.type);
                        requiredAssetsResult.templateId.Add(ingredient.template.templateId);

                        requiredAssetsResult.requirementSpriteHashes.Add(ingredient.template.immutableData.img ?? ingredient.template.immutableData.video);
                        requiredAssetsResult.marketplaceLink.Add($"{marketplaceLink}?template_id={ingredient.template.templateId}&collection_name={deserializedJsonResult.details.collectionName}");
                        requiredAssetsResult.fungibleToken.Add(null);
                        break;

                    case "SCHEMA_INGREDIENT":
                        requiredAssetsResult.requirementType.Add(ingredient.type);
                        requiredAssetsResult.requirementSpriteHashes.Add(null);
                        requiredAssetsResult.requirementText.Add(ingredient.schema.schemaName);
                        requiredAssetsResult.fungibleToken.Add(null);
                        requiredAssetsResult.marketplaceLink.Add($"{marketplaceLink}?schema_name={ingredient.schema.schemaName}&collection_name={deserializedJsonResult.details.collectionName}");
                        break;

                    case "COLLECTION_INGREDIENT":
                        requiredAssetsResult.requirementType.Add(ingredient.type);
                        requiredAssetsResult.requirementSpriteHashes.Add(null);
                        requiredAssetsResult.requirementText.Add(ingredient.collection.collectionName);
                        requiredAssetsResult.fungibleToken.Add(null);
                        requiredAssetsResult.marketplaceLink.Add($"{marketplaceLink}?collection_name={ingredient.collection.collectionName}");
                        break;

                    case "FT_INGREDIENT":
                        requiredAssetsResult.requirementType.Add(ingredient.type);
                        requiredAssetsResult.requirementSpriteHashes.Add(null);
                        requiredAssetsResult.requirementText.Add((ingredient.ftAmount.amount / Math.Pow(10, ingredient.ftAmount.tokenPrecision)).ToString("0." + new string('0', ingredient.ftAmount.tokenPrecision)) + " " + ingredient.ftAmount.tokenSymbol);
                        requiredAssetsResult.fungibleToken.Add(new FT
                        {
                            amount = ingredient.ftAmount.amount,
                            tokenPrecision = ingredient.ftAmount.tokenPrecision,
                            contractName = ingredient.ftAmount.tokenContract,
                            tokenSymbol = ingredient.ftAmount.tokenSymbol
                        });
                        requiredAssetsResult.tokenContract.Add(ingredient.ftAmount.amount + ingredient.ftAmount.tokenSymbol);
                        requiredAssetsResult.marketplaceLink.Add($"");
                        break;

                    case "ATTRIBUTE_INGREDIENT":
                        requiredAssetsResult.requirementType.Add(ingredient.type);
                        requiredAssetsResult.requirementSpriteHashes.Add(null);
                        requiredAssetsResult.requirementText.Add(ingredient.attributes.attributesAttributes.FirstOrDefault()?.allowedValues.FirstOrDefault());
                        requiredAssetsResult.fungibleToken.Add(null);
                        requiredAssetsResult.marketplaceLink.Add($"{marketplaceLink}?data:text.rarity={ingredient.attributes.attributesAttributes.FirstOrDefault()?.allowedValues.FirstOrDefault()}&collection_name={deserializedJsonResult.details.collectionName}");
                        break;
                }

                requiredAssetsResult.ingredientIndex.Add(ingredient.index);
            }

            requiredAssetsResult.requiredAssetAmount = deserializedJsonResult.details.ingredients
                .Select(i => i.amount)
                .ToList();

            rollResult.rollSpritesHash = deserializedJsonResult.details.rolls
                .SelectMany(i => i.outcomes)
                .Select(r =>
                {
                    if (r.results.FirstOrDefault()?.template?.immutableData.img != null)
                    {
                        var imageUrl = r.results.FirstOrDefault()?.template?.immutableData.img;
                        return imageUrl;
                    }
                    else if (r.results.FirstOrDefault()?.template?.immutableData.video != null)
                    {
                        var videoUrl = r.results.FirstOrDefault()?.template?.immutableData.video;
                        return videoUrl;
                    }
                    else if (r.results.FirstOrDefault()?.pool?.displayData != null)
                    {
                        var displayData = r.results.FirstOrDefault()?.pool.displayData;
                        var jsonString = displayData;
                        if (jsonString != null)
                        {
                            var jsonObject = JsonConvert.DeserializeObject<PoolData>(jsonString);
                            var displayImage = jsonObject?.image;

                            return displayImage;
                        }
                    }

                    return null;
                })
                .ToArray();

            rollResult.rollNames = deserializedJsonResult.details.rolls
                 .SelectMany(i => i.outcomes)
                 .Select(o =>
                 {
                     if (o.results.FirstOrDefault()?.template?.immutableData?.name != null)
                     {
                         return o.results.FirstOrDefault()?.template?.immutableData?.name;
                     }
                     else if (o.results.FirstOrDefault()?.pool?.displayData != null)
                     {
                         var displayData = o.results.FirstOrDefault()?.pool.displayData;
                         if (displayData != null)
                         {
                             var jsonString = displayData;
                             var jsonObject = JsonConvert.DeserializeObject<PoolData>(jsonString);
                             var displayName = jsonObject?.name;

                             return displayName;
                         }
                     }

                     return "burn";
                 })
             .ToArray();

            rollResult.rollPercentageRolls = deserializedJsonResult.details.rolls
                .SelectMany(i => i.outcomes)
                .Select(i => i.odds)
                .ToArray();

            rollResult.totalOdds = deserializedJsonResult.details.rolls[0].totalOdds;

            return (requiredAssetsResult, rollResult, securityId);
        }
        catch (Exception ex)
        {
            Debug.Log($"Error: {ex}");
            return (null, null, 0);
        }
    }

    private async Task<IndexIngredientAssetsResult> GetAllIndexIngredientAssets(int blendId, RequiredAssetsResult requiredAssetsResult)
    {
        var ingredientAssetsResult = new IndexIngredientAssetsResult();

        try
        {
            for (int i = 0; i < requiredAssetsResult.ingredientIndex.Count; i++)
            {
                var index = requiredAssetsResult.ingredientIndex[i];

                if (!requiredAssetsResult.requirementType[i].Equals("FT_INGREDIENT"))
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

                        ingredientAssetsResult.ingredientSpriteHashes.Add(ingredientOutcome);
                        ingredientAssetsResult.assetIds.Add(assetId);
                        ingredientAssetsResult.indexId.Add(index);
                        ingredientAssetsResult.mintNumbers.Add(ingredient.templateMint);
                    }
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

    private async Task<ExactIndexIngredientAssetsResult> GetExactIndexIngredientAssets(int blendId, int ingredientIndex)
    {
        var ingredientAssetResult = new ExactIndexIngredientAssetsResult();

        try
        {
            var url = $"{PluginController.apiUrl}/neftyblends/v1/blends/blend.nefty/{blendId}/ingredients/{ingredientIndex}/assets?owner={pluginController.GetWalletName()}&page=1&limit=100&order=desc&sort=asset_id";
            var deserializedJsonResult = await GetDeserializedData<Ingredient>(url);

            if (!deserializedJsonResult.success)
            {
                Debug.LogError("No data found for the given ingredient.");
                return null;
            }

            var details = deserializedJsonResult.details;

            ingredientAssetResult.assetIds.AddRange(details.Select(detail => detail.assetId));
            ingredientAssetResult.assetNames.AddRange(details.Select(detail => detail.name));
            ingredientAssetResult.mintNumbers.AddRange(details.Select(detail => detail.templateMint));
            ingredientAssetResult.spriteHashes.AddRange(details.Select(detail => detail.data.img ?? detail.data.video ?? "burn"));

            return ingredientAssetResult;
        }
        catch (Exception ex)
        {
            Debug.Log($"Error: {ex}");
            return null;
        }
    }
}
