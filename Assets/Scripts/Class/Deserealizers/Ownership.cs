using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Ownership
{
    [JsonProperty("success")]
    public bool success { get; set; }

    [JsonProperty("data")]
    public AssetData data { get; set; }

    [JsonProperty("query_time")]
    public long queryTime { get; set; }

    public class AssetData
    {
        [JsonProperty("collections")]
        public List<CollectionElement> collections { get; set; }

        [JsonProperty("templates")]
        public List<Template> templates { get; set; }

        [JsonProperty("assets")]
        public long assets { get; set; }
    }

    public class CollectionElement
    {
        [JsonProperty("collection")]
        public CollectionCollection collection { get; set; }

        [JsonProperty("assets")]
        public long assets { get; set; }
    }

    public class CollectionCollection
    {
        [JsonProperty("contract")]
        public string contract { get; set; }

        [JsonProperty("collection_name")]
        public string collectionName { get; set; }

        [JsonProperty("name")]
        public string name { get; set; }

        [JsonProperty("img")]
        public string img { get; set; }

        [JsonProperty("author")]
        public string author { get; set; }

        [JsonProperty("allow_notify")]
        public bool allowNotify { get; set; }

        [JsonProperty("authorized_accounts")]
        public List<string> authorizedAccounts { get; set; }

        [JsonProperty("notify_accounts")]
        public List<object> notifyAccounts { get; set; }

        [JsonProperty("market_fee")]
        public double marketFee { get; set; }

        [JsonProperty("data")]
        public CollectionData data { get; set; }

        [JsonProperty("created_at_time")]
        public string createdAtTime { get; set; }

        [JsonProperty("created_at_block")]
        public long createdAtBlock { get; set; }
    }

    public class CollectionData
    {
        [JsonProperty("img")]
        public string img { get; set; }

        [JsonProperty("url")]
        public Uri url { get; set; }

        [JsonProperty("name")]
        public string name { get; set; }

        [JsonProperty("socials")]
        public string socials { get; set; }

        [JsonProperty("description")]
        public string description { get; set; }

        [JsonProperty("creator_info")]
        public string creatorInfo { get; set; }
    }

    public class Template
    {
        [JsonProperty("collection_name")]
        public string collectionName { get; set; }

        [JsonProperty("template_id")]
        public long templateId { get; set; }

        [JsonProperty("assets")]
        public long assets { get; set; }
    }
}
