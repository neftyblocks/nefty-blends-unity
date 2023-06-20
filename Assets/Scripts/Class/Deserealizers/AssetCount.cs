using Newtonsoft.Json;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AssetCount
{
    [JsonProperty("success")]
    public bool success;

    [JsonProperty("data")]
    public int data;

    [JsonProperty("query_time")]
    public long queryTime;
}
