using System.Collections;
using System.Collections.Generic;
using UnityEngine;

    public partial class NeftyBlend
    {
        public bool Success { get; set; }
        public Data Data { get; set; }
        public long QueryTime { get; set; }
    }

    public partial class Data
    {
        public long BlendId { get; set; }
        public string Contract { get; set; }
        public string CollectionName { get; set; }
        public string StartTime { get; set; }
        public long EndTime { get; set; }
        public long Max { get; set; }
        public long UseCount { get; set; }
        public DisplayData DisplayData { get; set; }
        public string CreatedAtTime { get; set; }
        public long IngredientsCount { get; set; }
        public long SecurityId { get; set; }
        public bool IsHidden { get; set; }
        public long AccountLimit { get; set; }
        public long AccountLimitCooldown { get; set; }
        public List<Ingredient> Ingredients { get; set; }
        public List<Roll> Rolls { get; set; }
        public object UpgradeSpecs { get; set; }
        public string Category { get; set; }
    }

    public partial class DisplayData
    {
        public string Name { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }
    }

    public partial class Ingredient
    {
        public string Type { get; set; }
        public long Index { get; set; }
        public long Amount { get; set; }
        public Effect Effect { get; set; }
        public Attributes Attributes { get; set; }
        public string DisplayData { get; set; }
        public IngredientSchema Schema { get; set; }
        public IngredientTemplate Template { get; set; }
    }

    public partial class Attributes
    {
        public List<Attribute> AttributesAttributes { get; set; }
        public string SchemaName { get; set; }
        public string CollectionName { get; set; }
    }

    public partial class Attribute
    {
        public string Name { get; set; }
        public List<string> AllowedValues { get; set; }
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

    public partial class IngredientSchema
    {
        public string Contract { get; set; }
        public string SchemaName { get; set; }
        public List<Format> Format { get; set; }
        public long CreatedAtBlock { get; set; }
        public string CreatedAtTime { get; set; }
        public string C { get; set; }
        public string S { get; set; }
    }

    public partial class Format
    {
        public string Name { get; set; }
        public TypeEnum Type { get; set; }
    }

    public partial class IngredientTemplate
    {
        public long TemplateId { get; set; }
        public string Contract { get; set; }
        public bool IsTransferable { get; set; }
        public bool IsBurnable { get; set; }
        public long IssuedSupply { get; set; }
        public long MaxSupply { get; set; }
        public Collection Collection { get; set; }
        public TemplateSchema Schema { get; set; }
        public PurpleImmutableData ImmutableData { get; set; }
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

    public partial class PurpleImmutableData
    {
        public string Era { get; set; }
        public string Img { get; set; }
        public string Name { get; set; }
        public long ZosId { get; set; }
        public string Description { get; set; }
    }

    public partial class TemplateSchema
    {
        public string SchemaName { get; set; }
        public List<Format> Format { get; set; }
        public long CreatedAtBlock { get; set; }
        public string CreatedAtTime { get; set; }
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
        public ResultTemplate Template { get; set; }
    }

    public partial class ResultTemplate
    {
        public string Contract { get; set; }
        public long TemplateId { get; set; }
        public bool IsTransferable { get; set; }
        public bool IsBurnable { get; set; }
        public long IssuedSupply { get; set; }
        public long MaxSupply { get; set; }
        public Collection Collection { get; set; }
        public TemplateSchema Schema { get; set; }
        public FluffyImmutableData ImmutableData { get; set; }
        public string CreatedAtTime { get; set; }
        public long CreatedAtBlock { get; set; }
        public string Name { get; set; }
    }

    public partial class FluffyImmutableData
    {
        public string Era { get; set; }
        public string Img { get; set; }
        public string Name { get; set; }
        public string Rarity { get; set; }
        public long ZosId { get; set; }
        public string Description { get; set; }
        public long ShieldStrength { get; set; }
    }

    public enum TypeEnum { Image, String, Uint64 };

