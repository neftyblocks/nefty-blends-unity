using Newtonsoft.Json;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Blend
{
   
        public bool Success { get; set; }
        public List<Datum> Data { get; set; }
        public long QueryTime { get; set; }
    

    public partial class Datum
    {
        public long BlendId { get; set; }
        public string Contract { get; set; }
        public string CollectionName { get; set; }
        public string StartTime { get; set; }
        public long EndTime { get; set; }
        public long Max { get; set; }
        public long UseCount { get; set; }
        public string DisplayData { get; set; }
        public string CreatedAtTime { get; set; }
        public long IngredientsCount { get; set; }
        public long SecurityId { get; set; }
        public bool IsHidden { get; set; }
        public long AccountLimit { get; set; }
        public long AccountLimitCooldown { get; set; }
        public List<Ingredient> Ingredients { get; set; }
        public List<Roll> Rolls { get; set; }
        public object Upgrades { get; set; }
        public string Category { get; set; }
    }

    public partial class Ingredient
    {
        public string Type { get; set; }
        public long Index { get; set; }
        public long Amount { get; set; }
        public Effect Effect { get; set; }
        public Template Template { get; set; }
        public object DisplayData { get; set; }
    }

    public partial class Effect
    {
        public string Type { get; set; }
        public Payload Payload { get; set; }
    }

    public partial class Payload
    {
        public long Type { get; set; }
    }

    public partial class Template
    {
        public long TemplateId { get; set; }
        public string Contract { get; set; }
        public bool IsTransferable { get; set; }
        public bool IsBurnable { get; set; }
        public long IssuedSupply { get; set; }
        public long MaxSupply { get; set; }
        public Collection Collection { get; set; }
        public Schema Schema { get; set; }
        [JsonProperty("immutable_data")]
        public ImmutableData ImmutableData { get; set; }
        public string CreatedAtTime { get; set; }
        public long CreatedAtBlock { get; set; }
        public string Name { get; set; }
    }

    public partial class Collection
    {
        public string CollectionName { get; set; }
        public string Name { get; set; }
        public string Img { get; set; }
        public string Author { get; set; }
        public bool AllowNotify { get; set; }
        public List<string> AuthorizedAccounts { get; set; }
        public List<string> NotifyAccounts { get; set; }
        public double MarketFee { get; set; }
        public long CreatedAtBlock { get; set; }
        public string CreatedAtTime { get; set; }
    }

    public partial class ImmutableData
    {
        public string Img { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string Rarity { get; set; }
        public string Description { get; set; }
    }

    public partial class Schema
    {
        public string SchemaName { get; set; }
        public List<Format> Format { get; set; }
        public long CreatedAtBlock { get; set; }
        public string CreatedAtTime { get; set; }
    }

    public partial class Format
    {
        public string Name { get; set; }
        public TypeEnum Type { get; set; }
    }

    public partial class Roll
    {
        public long Index { get; set; }
        public List<Outcome> Outcomes { get; set; }
        public long TotalOdds { get; set; }
    }

    public partial class Outcome
    {
        public long Odds { get; set; }
        public List<Result> Results { get; set; }
    }

    public partial class Result
    {
        public string Type { get; set; }
        public Template Template { get; set; }
    }

    public enum TypeEnum { Image, Ipfs, String, Uint64 };

}
