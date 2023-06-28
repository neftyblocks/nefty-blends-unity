using Newtonsoft.Json;
using System.Collections.Generic;

public partial class Collection
{
    [JsonProperty("success")]
    public bool success { get; set; }

    [JsonProperty("data")]
    public CollectionData data { get; set; }

    [JsonProperty("query_time")]
    public long queryTime { get; set; }

    public class CollectionData
    {
        [JsonProperty("contract")]
        public string contract { get; set; }

        [JsonProperty("collection_name")]
        public string collection_name { get; set; }

        [JsonProperty("name")]
        public string name { get; set; }

        [JsonProperty("img")]
        public string img { get; set; }

        [JsonProperty("author")]
        public string author { get; set; }

        [JsonProperty("allow_notify")]
        public bool allow_notify { get; set; }

        [JsonProperty("authorized_accounts")]
        public List<string> authorized_accounts { get; set; }

        [JsonProperty("notify_accounts")]
        public List<string> notify_accounts { get; set; }

        [JsonProperty("market_fee")]
        public double market_fee { get; set; }

        [JsonProperty("data")]
        public CollectionDataData data { get; set; }

        [JsonProperty("created_at_time")]
        public string created_at_time { get; set; }

        [JsonProperty("created_at_block")]
        public string created_at_block { get; set; }
    }

    public class CollectionDataData
    {
        [JsonProperty("img")]
        public string img { get; set; }

        [JsonProperty("url")]
        public string url { get; set; }

        [JsonProperty("name")]
        public string name { get; set; }

        [JsonProperty("images")]
        public string images { get; set; }

        [JsonProperty("socials")]
        public string socials { get; set; }

        [JsonProperty("description")]
        public string description { get; set; }

        [JsonProperty("creator_info")]
        public string creator_info { get; set; }
    }
}
