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
        public string contract { get; set; }
        [JsonProperty("asset_id")]
        public string assetId { get; set; }
        public string owner { get; set; }
        public bool isTransferable { get; set; }
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
        public long updatedAtBlock { get; set; }
        public string updatedAtTime { get; set; }
        public long transferredAtBlock { get; set; }
        public string transferredAtTime { get; set; }
        public long mintedAtBlock { get; set; }
        public string mintedAtTime { get; set; }
        public Data data { get; set; }
        public string name { get; set; }
    }

    public partial class Collection
    {
        public string collectionName { get; set; }
        public string name { get; set; }
        public string img { get; set; }
        public string author { get; set; }
        public bool allowNotify { get; set; }
        public string[] authorizedAccounts { get; set; }
        public string[] notifyAccounts { get; set; }
        public double marketFee { get; set; }
        public long createdAtBlock { get; set; }
        public string createdAtTime { get; set; }
    }

    public partial class Data
    {
        public string img { get; set; }
        public string info { get; set; }
        public string name { get; set; }
        public string product { get; set; }
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
        public long? quantity { get; set; }
    }

    public partial class MutableData
    {
    }

    public partial class Schema
    {
        public string schemaName { get; set; }
        public List<Format> format { get; set; }
        public long createdAtBlock { get; set; }
        public string createdAtTime { get; set; }
    }

    public partial class Format
    {
        public string name { get; set; }
        public string type { get; set; }
    }

    public partial class Template
    {
        public long templateId { get; set; }
        public long maxSupply { get; set; }
        public bool isTransferable { get; set; }
        public bool isBurnable { get; set; }
        public long issuedSupply { get; set; }
        public Data immutableData { get; set; }
        public string createdAtTime { get; set; }
        public long createdAtBlock { get; set; }
    }
}
