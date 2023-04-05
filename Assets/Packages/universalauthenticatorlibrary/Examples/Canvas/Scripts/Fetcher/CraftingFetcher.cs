using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UnityEngine;
using UnityEngine.Networking;

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
    public async Task<NeftyBlend> GetDeserializedDataNOTCLEANCODE<NeftyBlend>(string url, int blendId)
    {
        var jsonResponse = await imageLoader.GetTextAsync(url);

        return JsonConvert.DeserializeObject<NeftyBlend>(jsonResponse);
    }

    //delete this later
    public async Task<Blend> GetDeserializedData<Blend>(string link , int slotLimit, int currentPage)
    {
        var url = $"{PluginController.apiUrl}/neftyblends/v1/blends?collection_name={pluginController.GetCollectionName()}&visibility=visible&render_markdown=false&page={currentPage}&limit={slotLimit}&order=desc&sort=created_at_time";
        var jsonResponse = await imageLoader.GetTextAsync(url);

        return JsonConvert.DeserializeObject<Blend>(jsonResponse);
    }
    public async Task<(Sprite[], Sprite[],int)> GetCraftingAssets(int blendId)
    {
        var ingredientIndexCount = 0;
        try
        {
            var url = $"{PluginController.apiUrl}/neftyblends/v1/blends/blend.nefty/{blendId}?render_markdown=true";

            var resultObject = await GetDeserializedDataNOTCLEANCODE<NeftyBlend>(url, blendId);

            if (!resultObject.Success)
            {
                Debug.LogError("No data found for the given crafting recipe.");
                return (null,null, ingredientIndexCount);
            }
            List<string> imageUris = new List<string>();
            var rollOutcome = resultObject.MainData.Rolls[0].Outcomes[0].Results[0].Template.ImmutableData.Img;

            ingredientIndexCount = resultObject.MainData.Ingredients.Count;
            imageUris.Add(rollOutcome);
            var downloadedSprites = imageUris.Select(uri => imageLoader.GetSpriteAsync(uri)).ToArray();
            var spriteResults = await Task.WhenAll(downloadedSprites);

            List<string> imageUrisIngredients = new List<string>();
            foreach (var ingredient in resultObject.MainData.Ingredients)
            {
                var ingredientOutcome = ingredient.Template.ImmutableData.Img;
                imageUrisIngredients.Add(ingredientOutcome);

            }
            var downloadedSprites2 = imageUrisIngredients.Select(uri => imageLoader.GetSpriteAsync(uri)).ToArray();
            var spriteResults2 = await Task.WhenAll(downloadedSprites2);
            return (spriteResults, spriteResults2, ingredientIndexCount);
        }
        catch (Exception ex)
        {
            Debug.Log($"Error: {ex}");
            return (null, null, ingredientIndexCount);
        }
    }

    public async Task<Sprite[]> GetIngredientAssets(int blendId, int ingredientIndexCount)
    {
        try
        {
            List<string> imageUris = new List<string>();
            for (int i = 0;i < ingredientIndexCount; i++)
            {
                var url = $"{PluginController.apiUrl}/neftyblends/v1/blends/blend.nefty/{blendId}/ingredients/{i}/assets?owner={"4rmxq.wam"}&page=1&limit=1&order=desc&sort=asset_id";
                var resultObject = await GetDeserializedDataNOTCLEANCODE<Ingredient>(url, blendId);
                if (!resultObject.Success)
                {
                    Debug.LogError("No data found for the given ingredient.");
                    return null;
                }
                foreach (var ingredient in resultObject.DataData)
                {
                    var ingredientOutcome = ingredient.Data.Img;
                    imageUris.Add(ingredientOutcome);
                }

            }
            var downloadedSprites2 = imageUris.Select(uri => imageLoader.GetSpriteAsync(uri)).ToArray();
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
