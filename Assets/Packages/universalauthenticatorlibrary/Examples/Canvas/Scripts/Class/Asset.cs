using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Asset
{
   
        public bool Success { get; set; }
        public List<Datum> Data { get; set; }
        public long QueryTime { get; set; }
    
    public partial class Datum
    {
        public Contract Contract { get; set; }
        public string AssetId { get; set; }
        public string Owner { get; set; }
        public bool IsTransferable { get; set; }
        public bool IsBurnable { get; set; }
        public Collection Collection { get; set; }
        public Schema Schema { get; set; }
        public Template Template { get; set; }
        public MutableData MutableData { get; set; }
        public DatumImmutableData ImmutableData { get; set; }
        public long TemplateMint { get; set; }
        public List<object> BackedTokens { get; set; }
        public string BurnedByAccount { get; set; }
        public long? BurnedAtBlock { get; set; }
        public string BurnedAtTime { get; set; }
        public long UpdatedAtBlock { get; set; }
        public string UpdatedAtTime { get; set; }
        public long TransferredAtBlock { get; set; }
        public string TransferredAtTime { get; set; }
        public long MintedAtBlock { get; set; }
        public string MintedAtTime { get; set; }
        public AssetData Data { get; set; }
        public string Name { get; set; }
    }

    public partial class Collection
    {
        [JsonProperty("collection_name")]
        public string CollectionName { get; set; }
        public string Name { get; set; }
        public string Img { get; set; }
        public bool AllowNotify { get; set; }
        public List<string> AuthorizedAccounts { get; set; }
        public List<NotifyAccount> NotifyAccounts { get; set; }
        public double MarketFee { get; set; }
        public long CreatedAtBlock { get; set; }
        public string CreatedAtTime { get; set; }
    }

    public partial class AssetData
    {
        public string Era { get; set; }
        public string Img { get; set; }
        public string Name { get; set; }
        public long ZosId { get; set; }
        public string Healing { get; set; }
        public string Description { get; set; }
        public string Hat { get; set; }
        public string Top { get; set; }
        public string Face { get; set; }
        public string Shoes { get; set; }
        public string Bottoms { get; set; }
        public string Survivor { get; set; }
        public long? MaxHealth { get; set; }
        public string Rarity { get; set; }
        public long? ShieldStrength { get; set; }
        public long? WeaponStrength { get; set; }
    }

    public partial class DatumImmutableData
    {
        public string Hat { get; set; }
        public string Top { get; set; }
        public string Img { get; set; }
        public string Face { get; set; }
        public string Name { get; set; }
        public string Shoes { get; set; }
        public string Bottoms { get; set; }
    }

    public partial class MutableData
    {
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

    public partial class Template
    {
        public long TemplateId { get; set; }
        public long MaxSupply { get; set; }
        public bool IsTransferable { get; set; }
        public bool IsBurnable { get; set; }
        public long IssuedSupply { get; set; }
        public TemplateImmutableData ImmutableData { get; set; }
        public string CreatedAtTime { get; set; }
        public long CreatedAtBlock { get; set; }
    }

    public partial class TemplateImmutableData
    {
        public string Era { get; set; }
        public string Img { get; set; }
        public string Name { get; set; }
        public long ZosId { get; set; }
        public string Healing { get; set; }
        public string Description { get; set; }
        public string Survivor { get; set; }
        public long? MaxHealth { get; set; }
        public string Rarity { get; set; }
        public long? ShieldStrength { get; set; }
        public long? WeaponStrength { get; set; }
    }

    public enum NotifyAccount { CentralZos, SupplyZos };

    public enum Contract { Atomicassets };

    public enum TypeEnum { Image, String, Uint64 };
}
