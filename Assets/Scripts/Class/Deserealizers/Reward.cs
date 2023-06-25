using Newtonsoft.Json;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Reward
{ 
    [JsonProperty("success")]
    public bool success { get; set; }

    [JsonProperty("data")]
    public List<Datum> data { get; set; }

    [JsonProperty("query_time")]
    public long queryTime { get; set; }

    public partial class Datum
    {
        [JsonProperty("claim_id")]
        public long claimId { get; set; }

        [JsonProperty("contract")]
        public string contract { get; set; }

        [JsonProperty("claimer")]
        public string claimer { get; set; }

        [JsonProperty("blend_id")]
        public long blendId { get; set; }

        [JsonProperty("results")]
        public List<Result> results { get; set; }

        [JsonProperty("transferred_assets")]
        public List<TransferredAsset> transferredAssets { get; set; }

        [JsonProperty("own_assets")]
        public List<object> ownAssets { get; set; }

        [JsonProperty("txid")]
        public string txid { get; set; }

        [JsonProperty("created_at_block")]
        public long createdAtBlock { get; set; }

        [JsonProperty("created_at_time")]
        public string createdAtTime { get; set; }

        [JsonProperty("updated_at_block")]
        public long updatedAtBlock { get; set; }

        [JsonProperty("updated_at_time")]
        public string updatedAtTime { get; set; }
    }

    public partial class Result
    {
        [JsonProperty("template")]
        public ResultTemplate template { get; set; }
    }

    public partial class ResultTemplate
    {
        [JsonProperty("contract")]
        public string contract { get; set; }

        [JsonProperty("template_id")]
        public long templateId { get; set; }

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
        public List<object> notifyAccounts { get; set; }

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
        [JsonProperty("video")]
        public string video { get; set; }

        [JsonProperty("name")]
        public string name { get; set; }

        [JsonProperty("rarity")]
        public string rarity { get; set; }
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

    public partial class TransferredAsset
    {
        [JsonProperty("contract")]
        public string contract { get; set; }

        [JsonProperty("asset_id")]
        public string assetId { get; set; }

        [JsonProperty("owner")]
        public object owner { get; set; }

        [JsonProperty("is_transferable")]
        public bool isTransferable { get; set; }

        [JsonProperty("is_burnable")]
        public bool isBurnable { get; set; }

        [JsonProperty("collection")]
        public Collection collection { get; set; }

        [JsonProperty("schema")]
        public Schema schema { get; set; }

        [JsonProperty("template")]
        public TransferredAssetTemplate template { get; set; }

        [JsonProperty("mutable_data")]
        public MutableData mutableData { get; set; }

        [JsonProperty("immutable_data")]
        public MutableData immutableData { get; set; }

        [JsonProperty("template_mint")]
        public long templateMint { get; set; }

        [JsonProperty("backed_tokens")]
        public List<object> backedTokens { get; set; }

        [JsonProperty("burned_by_account")]
        public string burnedByAccount { get; set; }

        [JsonProperty("burned_at_block")]
        public long burnedAtBlock { get; set; }

        [JsonProperty("burned_at_time")]
        public string burnedAtTime { get; set; }

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

        [JsonProperty("data")]
        public Data data { get; set; }

        [JsonProperty("name")]
        public string name { get; set; }
    }

    public partial class Data
    {
        [JsonProperty("img")]
        public string img { get; set; }

        [JsonProperty("name")]
        public string name { get; set; }
    }

    public partial class MutableData
    {
    }

    public partial class TransferredAssetTemplate
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

        [JsonProperty("immutable_data")]
        public Data immutableData { get; set; }

        [JsonProperty("created_at_time")]
        public string createdAtTime { get; set; }

        [JsonProperty("created_at_block")]
        public long createdAtBlock { get; set; }
    }
}
