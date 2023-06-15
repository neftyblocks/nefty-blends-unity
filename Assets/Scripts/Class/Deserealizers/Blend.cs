using Newtonsoft.Json;
using System;
using System.Collections.Generic;

public class Blend
{
    [JsonProperty("success")]
    public bool success { get; set; }

    [JsonProperty("data")]
    public List<Data> data { get; set; }

    [JsonProperty("query_time")]
    public long queryTime { get; set; }
    public partial class Data
    {
        [JsonProperty("blend_id")]
        public int blendId { get; set; }

        [JsonProperty("contract")]
        public string contract { get; set; }

        [JsonProperty("collection_name")]
        public string collectionName { get; set; }

        [JsonProperty("start_time")]
        public long startTime { get; set; }

        [JsonProperty("end_time")]
        public long endTime { get; set; }

        [JsonProperty("max")]
        public long max { get; set; }

        [JsonProperty("use_count")]
        public long useCount { get; set; }

        [JsonProperty("display_data")]
        public DisplayData displayData { get; set; }

        [JsonProperty("created_at_time")]
        public string createdAtTime { get; set; }

        [JsonProperty("ingredients_count")]
        public long ingredientsCount { get; set; }

        [JsonProperty("security_id")]
        public long securityId { get; set; }

        [JsonProperty("is_hidden")]
        public bool isHidden { get; set; }

        [JsonProperty("account_limit")]
        public long accountLimit { get; set; }

        [JsonProperty("account_limit_cooldown")]
        public long accountLimitCooldown { get; set; }

        [JsonProperty("ingredients")]
        public List<Ingredient> ingredients { get; set; }

        [JsonProperty("rolls")]
        public List<Roll> rolls { get; set; }

        [JsonProperty("category")]
        public string category { get; set; }
    }

    public partial class DisplayData
    {
        [JsonProperty("name")]
        public string name { get; set; }

        [JsonProperty("image")]
        public string image { get; set; }

        [JsonProperty("description")]
        public string description { get; set; }
    }

    public partial class Ingredient
    {
        [JsonProperty("type")]
        public string type { get; set; }

        [JsonProperty("index")]
        public long index { get; set; }

        [JsonProperty("amount")]
        public long amount { get; set; }

        [JsonProperty("effect")]
        public Effect effect { get; set; }

        [JsonProperty("template")]
        public Template template { get; set; }

        public DisplayData displayData { get; set; }
    }

    public partial class Effect
    {
        [JsonProperty("type")]
        public string type { get; set; }

        [JsonProperty("payload")]
        public Payload payload { get; set; }
    }

    public partial class Payload
    {
        [JsonProperty("type")]
        public long type { get; set; }
    }

    public partial class Template
    {
        [JsonProperty("template_id")]
        public long templateId { get; set; }

        [JsonProperty("contract")]
        public string contract { get; set; }

        [JsonProperty("is_transferable")]
        public bool isTransferable { get; set; }

        [JsonProperty("is_burnable")]
        public bool isBurnable { get; set; }

        [JsonProperty("issued_supply")]
        public long issuedSupply { get; set; }

        [JsonProperty("max_supply")]
        public long maxSupply { get; set; }

        [JsonProperty("collection")]
        public Collection collection { get; set; }

        [JsonProperty("schema")]
        public Schema schema { get; set; }

        [JsonProperty("immutable_data")]
        public ImmutableData immutableData { get; set; }

        [JsonProperty("created_at_time")]
        public string createdAtTime { get; set; }

        [JsonProperty("created_at_block")]
        public long createdAtBlock { get; set; }

        [JsonProperty("name")]
        public string name { get; set; }
    }

    public partial class Collection
    {
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
        public List<string> notifyAccounts { get; set; }

        [JsonProperty("market_fee")]
        public double marketFee { get; set; }

        [JsonProperty("created_at_block")]
        public long createdAtBlock { get; set; }

        [JsonProperty("created_at_time")]
        public string createdAtTime { get; set; }
    }

    public partial class ImmutableData
    {
        [JsonProperty("img")]
        public string img { get; set; }

        [JsonProperty("name")]
        public string name { get; set; }
    }

    public partial class Schema
    {
        [JsonProperty("schema_name")]
        public string schemaName { get; set; }

        [JsonProperty("format")]
        public List<Format> format { get; set; }

        [JsonProperty("created_at_block")]
        public long createdAtBlock { get; set; }

        [JsonProperty("created_at_time")]
        public string createdAtTime { get; set; }
    }

    public partial class Format
    {
        [JsonProperty("name")]
        public string name { get; set; }

        [JsonProperty("type")]
        public string type { get; set; }
    }

    public partial class Roll
    {
        [JsonProperty("index")]
        public long index { get; set; }

        [JsonProperty("outcomes")]
        public List<Outcome> outcomes { get; set; }

        [JsonProperty("total_odds")]
        public long totalOdds { get; set; }
    }

    public partial class Outcome
    {
        [JsonProperty("odds")]
        public long odds { get; set; }

        [JsonProperty("results")]
        public List<Result> results { get; set; }
    }

    public partial class Result
    {
        [JsonProperty("type")]
        public string type { get; set; }

        [JsonProperty("template")]
        public Template template { get; set; }
    }
}
