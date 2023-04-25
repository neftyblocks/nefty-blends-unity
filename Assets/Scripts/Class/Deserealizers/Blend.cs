using Newtonsoft.Json;
using System.Collections.Generic;

public class Blend
{
    public bool success { get; set; }
    public List<Datum> data { get; set; }
    public long queryTime { get; set; }

    public partial class Datum
    {
        [JsonProperty("blend_id")]
        public int blendId { get; set; }
        public string contract { get; set; }
        public string collectionName { get; set; }
        public string startTime { get; set; }
        public long endTime { get; set; }
        public long max { get; set; }
        public long useCount { get; set; }
        public string displayData { get; set; }
        public string createdAtTime { get; set; }
        public long ingredientsCount { get; set; }
        public long securityId { get; set; }
        public bool isHidden { get; set; }
        public long accountLimit { get; set; }
        public long accountLimitCooldown { get; set; }
        public List<Ingredient> ingredients { get; set; }
        public List<Roll> rolls { get; set; }
        public object upgrades { get; set; }
        public string category { get; set; }
    }

    public partial class Ingredient
    {
        public string type { get; set; }
        public long index { get; set; }
        public long amount { get; set; }
        public Effect effect { get; set; }
        public Template template { get; set; }
        public object displayData { get; set; }
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

    public partial class Template
    {
        public long templateId { get; set; }
        public string contract { get; set; }
        public bool isTransferable { get; set; }
        public bool isBurnable { get; set; }
        public long issuedSupply { get; set; }
        public long maxSupply { get; set; }
        public Collection collection { get; set; }
        public Schema schema { get; set; }
        [JsonProperty("immutable_data")]
        public ImmutableData immutableData { get; set; }
        public string createdAtTime { get; set; }
        public long createdAtBlock { get; set; }
        public string name { get; set; }
    }

    public partial class Collection
    {
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

    public partial class ImmutableData
    {
        public string img { get; set; }
        public string name { get; set; }
        public string type { get; set; }
        public string rarity { get; set; }
        public string description { get; set; }
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
        public TypeEnum type { get; set; }
    }

    public partial class Roll
    {
        public long index { get; set; }
        public List<Outcome> outcomes { get; set; }
        public long totalOdds { get; set; }
    }

    public partial class Outcome
    {
        public long odds { get; set; }
        public List<Result> results { get; set; }
    }

    public partial class Result
    {
        public string type { get; set; }
        public Template template { get; set; }
    }

    public enum TypeEnum { Image, Ipfs, String, Uint64 }
}
