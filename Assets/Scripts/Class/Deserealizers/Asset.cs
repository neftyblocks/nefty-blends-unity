using Newtonsoft.Json;
using System.Collections.Generic;

public class Asset
{
    public bool success { get; set; }
    [JsonProperty("data")]
    public List<Details> details { get; set; }
    public long queryTime { get; set; }

    public partial class Details
    {
        [JsonProperty("contract")]
        public string contract { get; set; }
        [JsonProperty("asset_id")]
        public string assetId { get; set; }
        public string owner { get; set; }
        [JsonProperty("is_transferable")]
        public bool isTransferable { get; set; }
        [JsonProperty("is_burnable")]
        public bool isBurnable { get; set; }
        public Collection collection { get; set; }
        public Schema schema { get; set; }
        public Template template { get; set; }
        public MutableData mutableData { get; set; }
        public ImmutableData immutableData { get; set; }
        [JsonProperty("template_mint")]
        public int templateMint { get; set; }
        public List<object> backedTokens { get; set; }
        public object burnedByAccount { get; set; }
        public object burnedAtBlock { get; set; }
        public object burnedAtTime { get; set; }
        [JsonProperty("updated_at_block")]
        public long updatedAtBlock { get; set; }
        [JsonProperty("updated_at_time")]
        public string updatedAtTime { get; set; }
        [JsonProperty("transferred_at_block")]
        public long transferredAtBlock { get; set; }
        [JsonProperty("transferred_at_time")]
        public string transferredAtTime { get; set; }
        [JsonProperty("minted_at_block")]
        public long mintedAtBlock { get; set; }
        [JsonProperty("minted_at_time")]
        public string mintedAtTime { get; set; }
        public Data data { get; set; }
        public string name { get; set; }
    }

    public partial class Collection
    {
        [JsonProperty("collection_name")]
        public string collectionName { get; set; }
        public string name { get; set; }
        public string img { get; set; }
        public string author { get; set; }
        [JsonProperty("allow_notify")]
        public bool allowNotify { get; set; }
        [JsonProperty("authorized_accounts")]
        public string[] authorizedAccounts { get; set; }
        [JsonProperty("notify_accounts")]
        public string[] notifyAccounts { get; set; }
        [JsonProperty("market_fee")]
        public double marketFee { get; set; }
        [JsonProperty("created_at_block")]
        public long createdAtBlock { get; set; }
        [JsonProperty("created_at_time")]
        public string createdAtTime { get; set; }
    }

    public partial class Data
    {
        public string img { get; set; }
        public string info { get; set; }
        public string name { get; set; }
        [JsonProperty("video")]
        public string video { get; set; }
        public string product { get; set; }
        [JsonProperty("quantity")]
        public long? quantity { get; set; }
        public string description { get; set; }
        public string rarity { get; set; }
        public string type { get; set; }
        public long? slots { get; set; }
    }

    public partial class ImmutableData
    {
        public string img { get; set; }
        public string name { get; set; }
        public string product { get; set; }
        [JsonProperty("quantity")]
        public long? quantity { get; set; }
    }

    public partial class MutableData
    {
    }

    public partial class Schema
    {
        [JsonProperty("schema_name")]
        public string schemaName { get; set; }
        public List<Format> format { get; set; }
        [JsonProperty("created_at_block")]
        public long createdAtBlock { get; set; }
        [JsonProperty("created_at_time")]
        public string createdAtTime { get; set; }
    }

    public partial class Format
    {
        public string name { get; set; }
        public string type { get; set; }
    }

    public partial class Template
    {
        [JsonProperty("template_id")]
        public long templateId { get; set; }
        [JsonProperty("max_supply")]
        public long maxSupply { get; set; }
        [JsonProperty("is_transferable")]
        public bool isTransferable { get; set; }
        [JsonProperty("is_burnable")]
        public bool isBurnable { get; set; }
        [JsonProperty("issued_supply")]
        public long issuedSupply { get; set; }
        public Data immutableData { get; set; }
        [JsonProperty("created_at_time")]
        public string createdAtTime { get; set; }
        [JsonProperty("created_at_block")]
        public long createdAtBlock { get; set; }
    }
}
