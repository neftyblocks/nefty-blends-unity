using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using UnityEngine;

public class RewardFetcher : MonoBehaviour, IFetcher
{
    [SerializeField] public ImageLoader imageLoader;
    [SerializeField] public PopupOutputter popupOutputter;

    public async Task<Ownership> GetDeserializedData<Ownership>(string url)
    {
        var jsonResponse = await imageLoader.GetTextAsync(url);
        return JsonConvert.DeserializeObject<Ownership>(jsonResponse);
    }

    public async void DeseralizeReward(string json)
    {
        var deserializedData = JsonConvert.DeserializeObject<RewardJson>(json);
        string txId = deserializedData.txId;
        int blendId = deserializedData.blendId;
        var reward = await GetRewardData(txId, blendId);
        popupOutputter.ShowSuccess(reward.rewardSprite,reward.rewardName);
    }

    public async Task<RewardAsset> GetRewardData(string txId, int blendId)
    {
        var result = new RewardAsset();

        try
        {
            var url = $"{PluginController.apiUrl}/neftyblends/v1/blends/blend.nefty/{blendId}/claims?tx_id={txId}&page=1&limit=100&order=desc&sort=claim_time";
            var deserializedJsonResult = await GetDeserializedData<Reward>(url);

            if (deserializedJsonResult.data.Count == 0 || deserializedJsonResult.data[0].results.Count == 0)
            {
                Debug.Log("burn");
                result.rewardName = "burn";
                result.rewardSprite = await imageLoader.GetSpriteAsync(null);
                return result;
            }

            result.rewardName = deserializedJsonResult.data[0].results[0].template.immutableData.name;
            result.rewardSprite = await imageLoader.GetSpriteAsync(deserializedJsonResult.data[0].results[0].template.immutableData.img ?? deserializedJsonResult.data[0].results[0].template.immutableData.video ?? null);

            return result;
        }
        catch (Exception ex)
        {
            Debug.LogError($"Error: {ex}");
            return null;
        }
    }
}


public class RewardAsset
{
    public Sprite rewardSprite { get; set; }
    public string rewardName { get; set; }

}

public class RewardJson
{
    [JsonProperty("txId")]
    public string txId { get; set; }

    [JsonProperty("blendId")]
    public int blendId { get; set; }
}
