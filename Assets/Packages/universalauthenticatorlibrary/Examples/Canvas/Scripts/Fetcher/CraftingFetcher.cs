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

    [SerializeField] private static Dictionary<string, Sprite> _spriteCache = new Dictionary<string, Sprite>();
    [SerializeField] public PluginController pluginController;
    [SerializeField] public CraftingUI craftingUI;
    [SerializeField] public UIManager uIManager;


    private void OnEnable()
    {
        // Event: When Blend Image is clicked
        BlendUIElementController.UserSelectedBlend += ReceiveBlendId;
    }

    public async void ReceiveBlendId(int blendId)
    {
        var (rollSprites, requirementSprites) = await GetCraftingAssets(blendId);
/*        var ingredientSprites = await GetIngredientAssets(blendId);
*/
        uIManager.EnableCraftingUI();
        craftingUI.DisplayAssetImages(rollSprites, requirementSprites);

    }
    public async Task<NeftyBlend> GetDeserializedDataNOTCLEANCODE<NeftyBlend>(string url, int blendId)
    {
        var jsonResponse = await GetTextAsync(url);

        return JsonConvert.DeserializeObject<NeftyBlend>(jsonResponse);
    }

    //delete this later
    public async Task<Blend> GetDeserializedData<Blend>(string link , int slotLimit, int currentPage)
    {
        var url = $"https://aa.neftyblocks.com/neftyblends/v1/blends?collection_name={pluginController.GetCollectionName()}&visibility=visible&render_markdown=false&page={currentPage}&limit={slotLimit}&order=desc&sort=created_at_time";
        var jsonResponse = await GetTextAsync(url);

        return JsonConvert.DeserializeObject<Blend>(jsonResponse);
    }
    public async Task<(Sprite[], Sprite[])> GetCraftingAssets(int blendId)
    {
        try
        {
            var url = $"https://aa.neftyblocks.com/neftyblends/v1/blends/blend.nefty/{blendId}?render_markdown=true";

            var resultObject = await GetDeserializedDataNOTCLEANCODE<NeftyBlend>(url, blendId);

            if (!resultObject.Success)
            {
                Debug.LogError("No data found for the given crafting recipe.");
                return (null,null);
            }
            List<string> imageUris = new List<string>();
            var rollOutcome = resultObject.MainData.Rolls[0].Outcomes[0].Results[0].Template.ImmutableData.Img;
            imageUris.Add(rollOutcome);
            var downloadedSprites = imageUris.Select(uri => GetSpriteAsync(uri)).ToArray();
            var spriteResults = await Task.WhenAll(downloadedSprites);

            List<string> imageUrisIngredients = new List<string>();
            foreach (var ingredient in resultObject.MainData.Ingredients)
            {
                var ingredientOutcome = ingredient.Template.ImmutableData.Img;
                imageUrisIngredients.Add(ingredientOutcome);

            }
            var downloadedSprites2 = imageUrisIngredients.Select(uri => GetSpriteAsync(uri)).ToArray();
            var spriteResults2 = await Task.WhenAll(downloadedSprites2);

            return (spriteResults, spriteResults2);
        }
        catch (Exception ex)
        {
            Debug.Log($"Error: {ex}");
            return (null, null);
        }
    }

    public async Task<(Sprite[], Sprite[])> GetIngredientAssets(int blendId)
    {
        try
        {
            var url = $"https://aa.neftyblocks.com/neftyblends/v1/blends/blend.nefty/{blendId}/ingredients/0/assets?owner={"xswvw.wam"}&page=1&limit=100&order=desc&sort=asset_id";

            var resultObject = await GetDeserializedDataNOTCLEANCODE<Ingredient>(url, blendId);
            Debug.Log(resultObject.DataData.ToString());
            /*            if (!resultObject.)
                        {
                            Debug.LogError("No data found for the given crafting recipe.");
                            return (null, null);
                        }
                        List<string> imageUris = new List<string>();
                        var rollOutcome = resultObject.DataData
                        imageUris.Add(rollOutcome);
                        var downloadedSprites = imageUris.Select(uri => GetSpriteAsync(uri)).ToArray();
                        var spriteResults = await Task.WhenAll(downloadedSprites);

                        List<string> imageUrisIngredients = new List<string>();
                        foreach (var ingredient in resultObject.Data.Ingredients)
                        {
                            var ingredientOutcome = ingredient.Template.ImmutableData.Img;
                            imageUrisIngredients.Add(ingredientOutcome);

                        }
                        var downloadedSprites2 = imageUrisIngredients.Select(uri => GetSpriteAsync(uri)).ToArray();
                        var spriteResults2 = await Task.WhenAll(downloadedSprites2);

                        return (spriteResults, spriteResults2);*/
            return (null, null);

        }
        catch (Exception ex)
        {
            Debug.Log($"Error: {ex}");
            return (null, null);
        }
    }

    public async Task<string> GetTextAsync(string url)
    {
        var request = UnityWebRequest.Get(url);
        request.SetRequestHeader("Content-Type", "application/json");
        var operation = request.SendWebRequest();

        while (!operation.isDone)
        {
            await Task.Yield();
        }

        if (request.result != UnityWebRequest.Result.Success)
        {
            throw new UnityException(request.error);
        }
        return request.downloadHandler.text;
    }

    public async Task<Sprite> GetSpriteAsync(string imageUri)
    {

        if (_spriteCache.TryGetValue(imageUri, out Sprite sprite))
        {
            Debug.Log($"{imageUri} already cached");
            return sprite;
        }

        var url = $"https://resizer.neftyblocks.com?ipfs={imageUri}&width=300&static=false";
        var request = UnityWebRequestTexture.GetTexture(url);

        request.SetRequestHeader("Cache-Control", "max-age=3600");
        request.SetRequestHeader("Pragma", "cache");

        var operation = request.SendWebRequest();

        while (!operation.isDone)
        {
            await Task.Yield();
        }

        if (request.result != UnityWebRequest.Result.Success)
        {
            throw new UnityException(request.error);
        }

        var texture = ((DownloadHandlerTexture)request.downloadHandler).texture;
        sprite = Sprite.Create(texture, new Rect(0, 0, texture.width, texture.height), Vector2.one * 0.5f);

        if (!_spriteCache.ContainsKey(imageUri))
        {
            _spriteCache.Add(imageUri, sprite);
        }

        return sprite;
    }
}
