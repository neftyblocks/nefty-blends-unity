using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Collections.Generic;

public class NeftyBlend
{
    [JsonProperty("success")]
    public bool success { get; set; }

    [JsonProperty("data")]
    public Data details { get; set; }

    [JsonProperty("query_time")]
    public long queryTime { get; set; }


    public partial class Data
    {
        [JsonProperty("blend_id")]
        public string blendId { get; set; }

        [JsonProperty("contract")]
        public string contract { get; set; }

        [JsonProperty("collection_name")]
        public string collectionName { get; set; }

        [JsonProperty("start_time")]
        public string startTime { get; set; }

        [JsonProperty("end_time")]
        public string endTime { get; set; }

        [JsonProperty("max")]
        public string max { get; set; }

        [JsonProperty("use_count")]
        public string useCount { get; set; }

        [JsonProperty("display_data")]
        public DisplayData displayData { get; set; }

        [JsonProperty("created_at_time")]
        public string createdAtTime { get; set; }

        [JsonProperty("ingredients_count")]
        public int ingredientsCount { get; set; }

        [JsonProperty("security_id")]
        public int securityId { get; set; }

        [JsonProperty("is_hidden")]
        public bool isHidden { get; set; }

        [JsonProperty("account_limit")]
        public string accountLimit { get; set; }

        [JsonProperty("account_limit_cooldown")]
        public string accountLimitCooldown { get; set; }

        [JsonProperty("ingredients")]
        public List<Ingredient> ingredients { get; set; }

        [JsonProperty("rolls")]
        public List<Roll> rolls { get; set; }

        [JsonProperty("upgrade_specs")]
        public object upgradeSpecs { get; set; }

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
        public int index { get; set; }
        [JsonProperty("amount")]
        public int amount { get; set; }
        [JsonProperty("effect")]
        public Effect effect { get; set; }
        [JsonProperty("ft_amount")]
        public FtAmount ftAmount { get; set; }
        public Attributes attributes { get; set; }
        [JsonProperty("collection")]
        public Collection collection { get; set; }
        [JsonProperty("display_data")]
        public string displayData { get; set; }
        public IngredientSchema schema { get; set; }
        [JsonProperty("template")]
        public IngredientTemplate template { get; set; }
    }

    public partial class FtAmount
    {
        [JsonProperty("amount")]
        public long amount { get; set; }
        [JsonProperty("token_symbol")]
        public string tokenSymbol { get; set; }
        [JsonProperty("token_contract")]
        public string tokenContract { get; set; }
        [JsonProperty("token_precision")]
        public int tokenPrecision { get; set; }
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
        [JsonProperty("type")]
        public string type { get; set; }

        [JsonProperty("payload")]
        public Payload payload { get; set; }
    }

    public partial class Payload
    {
        [JsonProperty("type")]
        public int type { get; set; }
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
        public string type { get; set; }
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

        [JsonProperty("pool")]
        public Pool pool { get; set; }
    }

    public partial class Pool
    {
        [JsonProperty("pool_name")]
        public string poolName { get; set; }

        [JsonProperty("display_data")]
        public string displayData { get; set; }
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
        public string video { get; set; }
        public string name { get; set; }
        public string rarity { get; set; }
    }
    public enum TypeEnum { Image, String, Uint64, IPFS };
}
