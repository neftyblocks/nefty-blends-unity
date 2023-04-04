using Newtonsoft.Json;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Ingredient
{
    
    public bool Success { get; set; }
    [JsonProperty("data")]
    public List<Datum> DataData { get; set; }
    public long QueryTime { get; set; }
    

    public partial class Datum
    {
        public string Contract { get; set; }
        public string AssetId { get; set; }
        public string Owner { get; set; }
        public bool IsTransferable { get; set; }
        public bool IsBurnable { get; set; }
        public Collection Collection { get; set; }
        public Schema Schema { get; set; }
        public Template Template { get; set; }
        public MutableData MutableData { get; set; }
        public MutableData ImmutableData { get; set; }
        public long TemplateMint { get; set; }
        public List<object> BackedTokens { get; set; }
        public object BurnedByAccount { get; set; }
        public object BurnedAtBlock { get; set; }
        public object BurnedAtTime { get; set; }
        public long UpdatedAtBlock { get; set; }
        public string UpdatedAtTime { get; set; }
        public long TransferredAtBlock { get; set; }
        public string TransferredAtTime { get; set; }
        public long MintedAtBlock { get; set; }
        public string MintedAtTime { get; set; }
        public Data Data { get; set; }
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

    public partial class Data
    {
        public string Img { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string Rarity { get; set; }
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
        public string Type { get; set; }
    }

    public partial class Template
    {
        public long TemplateId { get; set; }
        public long MaxSupply { get; set; }
        public bool IsTransferable { get; set; }
        public bool IsBurnable { get; set; }
        public long IssuedSupply { get; set; }
        public Data ImmutableData { get; set; }
        public string CreatedAtTime { get; set; }
        public long CreatedAtBlock { get; set; }
    }
}
