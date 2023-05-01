using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Collections.Generic;

public class NeftyBlend
{
    public bool success { get; set; }
    [JsonProperty("data")]
    public Data details { get; set; }
    public long queryTime { get; set; }

    public partial class Data
    {
        public long blendId { get; set; }
        public string contract { get; set; }
        public string collectionName { get; set; }
        public string startTime { get; set; }
        public long endTime { get; set; }
        public long max { get; set; }
        public long useCount { get; set; }
        public DisplayData displayData { get; set; }
        public string createdAtTime { get; set; }
        public long ingredientsCount { get; set; }
        public long securityId { get; set; }
        public bool isHidden { get; set; }
        public long accountLimit { get; set; }
        public long accountLimitCooldown { get; set; }
        public List<Ingredient> ingredients { get; set; }
        public List<Roll> rolls { get; set; }
        public object upgradeSpecs { get; set; }
        public string category { get; set; }
    }

    public partial class DisplayData
    {
        public string name { get; set; }
        public string image { get; set; }
        public string description { get; set; }
    }

    public partial class Ingredient
    {
        public string type { get; set; }
        public int index { get; set; }
        public int amount { get; set; }
        public Effect effect { get; set; }
        [JsonProperty("ft_amount")]
        public FtAmount ftAmount { get; set; }
        public Attributes attributes { get; set; }
        public Collection collection { get; set; }
        public string displayData { get; set; }
        public IngredientSchema schema { get; set; }
        public IngredientTemplate template { get; set; }
    }

    public partial class FtAmount
    {
        public int amount { get; set; }
        public string tokenSymbol { get; set; }
        public string tokenContract { get; set; }
        public long tokenPrecision { get; set; }
    }

    public partial class Attributes
    {
        [JsonProperty("attributes")]
        public List<Attribute> attributesAttributes { get; set; }
        public string schemaName { get; set; }
        [JsonProperty("collection_name")]
        public string collectionName { get; set; }
    }

    public partial class Attribute
    {
        public string name { get; set; }
        [JsonProperty("allowed_values")]
        public List<string> allowedValues { get; set; }
    }

    public partial class Effect
    {
        public string type { get; set; }
        public Payload payload { get; set; }
    }

    public partial class Payload
    {
        public long type { get; set; }
    }

    public partial class IngredientSchema
    {
        public string contract { get; set; }
        [JsonProperty("schema_name")]
        public string schemaName { get; set; }
        public List<Format> format { get; set; }
        public long createdAtBlock { get; set; }
        public string createdAtTime { get; set; }
        public string c { get; set; }
        public string s { get; set; }
    }

    public partial class Format
    {
        public string name { get; set; }
        public TypeEnum type { get; set; }
    }

    public partial class IngredientTemplate
    {
        [JsonProperty("template_id")]
        public int templateId { get; set; }
        public string contract { get; set; }
        public bool isTransferable { get; set; }
        public bool isBurnable { get; set; }
        public long issuedSupply { get; set; }
        public long maxSupply { get; set; }
        public Collection collection { get; set; }
        public TemplateSchema schema { get; set; }
        [JsonProperty("immutable_data")]
        public ImmutableData immutableData { get; set; }
        public string createdAtTime { get; set; }
        public long createdAtBlock { get; set; }
        public string name { get; set; }
    }

    public partial class Collection
    {
        [JsonProperty("collection_name")]
        public string collectionName { get; set; }
        public string name { get; set; }
        public string img { get; set; }
        public string author { get; set; }
        public bool allowNotify { get; set; }
        public List<string> authorizedAccounts { get; set; }
        public List<string> notifyAccounts { get; set; }
        public double marketFee { get; set; }
        public long createdAtBlock { get; set; }
        public string createdAtTime { get; set; }
    }

    public partial class TemplateSchema
    {
        public string schemaName { get; set; }
        public List<Format> format { get; set; }
        public long createdAtBlock { get; set; }
        public string createdAtTime { get; set; }
    }

    public partial class Roll
    {
        public long index { get; set; }
        public List<Outcome> outcomes { get; set; }
        [JsonProperty("total_odds")]
        public int totalOdds { get; set; }
    }

    public partial class Outcome
    {
        public int odds { get; set; }
        public List<Result> results { get; set; }
    }

    public partial class Result
    {
        public string type { get; set; }
        public ResultTemplate template { get; set; }
    }

    public partial class ResultTemplate
    {
        public string contract { get; set; }
        public long templateId { get; set; }
        public bool isTransferable { get; set; }
        public bool isBurnable { get; set; }
        public long issuedSupply { get; set; }
        public long maxSupply { get; set; }
        public Collection collection { get; set; }
        public TemplateSchema schema { get; set; }
        [JsonProperty("immutable_data")]
        public ImmutableData immutableData { get; set; }
        public string createdAtTime { get; set; }
        public long createdAtBlock { get; set; }
        public string name { get; set; }
    }

    public partial class ImmutableData
    {
        public string img { get; set; }
        public string name { get; set; }
        public string rarity { get; set; }
    }
    public enum TypeEnum { Image, String, Uint64, IPFS };
}
