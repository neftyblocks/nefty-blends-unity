using Newtonsoft.Json;

public class AssetCount
{
    [JsonProperty("success")]
    public bool success;

    [JsonProperty("data")]
    public int data;

    [JsonProperty("query_time")]
    public long queryTime;
}
