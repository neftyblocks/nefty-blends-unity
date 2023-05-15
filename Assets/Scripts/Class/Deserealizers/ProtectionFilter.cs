using Newtonsoft.Json;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ProtectionFilter 
{
    [JsonProperty("logical_operator")]
    public int logicalOperator { get; set; }

    [JsonProperty("filters")]
    public List<List<object>> filters { get; set; }

    public class Filter
    {
        [JsonProperty("collection_name")]
        public string collectionName { get; set; }

        [JsonProperty("template_id")]
        public int? templateId { get; set; }

        [JsonProperty("schema_name")]
        public string schemaName { get; set; }

        [JsonProperty("token_contract")]
        public string tokenContract { get; set; }

        [JsonProperty("token_symbol")]
        public string tokenSymbol { get; set; }

        [JsonProperty("comparison_operator")]
        public int comparisonOperator { get; set; }

        [JsonProperty("amount")]
        public object amount { get; set; }
    }
}
