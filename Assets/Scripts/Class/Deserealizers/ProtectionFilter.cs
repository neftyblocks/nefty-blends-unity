using Newtonsoft.Json;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ProtectionFilter
{
    [JsonProperty("logical_operator")]
    public int logical_operator { get; set; }

    [JsonProperty("filters")]
    public List<List<object>> filters { get; set; }


    public class CollectionHoldings
    {
        [JsonProperty("collection_name")]
        public string collection_name { get; set; }

        [JsonProperty("comparison_operator")]
        public int comparison_operator { get; set; }

        [JsonProperty("amount")]
        public int amount { get; set; }
    }

    public class TemplateHoldings
    {
        [JsonProperty("collection_name")]
        public string collection_name { get; set; }

        [JsonProperty("template_id")]
        public int template_id { get; set; }

        [JsonProperty("comparison_operator")]
        public int comparison_operator { get; set; }

        [JsonProperty("amount")]
        public int amount { get; set; }
    }

    public class SchemaHoldings
    {
        [JsonProperty("collection_name")]
        public string collection_name { get; set; }

        [JsonProperty("schema_name")]
        public string schema_name { get; set; }

        [JsonProperty("comparison_operator")]
        public int comparison_operator { get; set; }

        [JsonProperty("amount")]
        public int amount { get; set; }
    }

    public class TokenHolding
    {
        [JsonProperty("token_contract")]
        public string token_contract { get; set; }

        [JsonProperty("token_symbol")]
        public string token_symbol { get; set; }

        [JsonProperty("comparison_operator")]
        public int comparison_operator { get; set; }

        [JsonProperty("amount")]
        public string amount { get; set; }
    }
}
