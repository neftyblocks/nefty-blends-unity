using Newtonsoft.Json;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ProtectionFilter 
{
    
    public int logical_operator { get; set; }
    public List<List<object>> filters { get; set; }
    

    public class CollectionHoldings
    {
        public string collection_name { get; set; }
        public int comparison_operator { get; set; }
        public int amount { get; set; }
    }

    public class TemplateHoldings
    {
        public string collection_name { get; set; }
        public int template_id { get; set; }
        public int comparison_operator { get; set; }
        public int amount { get; set; }
    }

    public class SchemaHoldings
    {
        public string collection_name { get; set; }
        public string schema_name { get; set; }
        public int comparison_operator { get; set; }
        public int amount { get; set; }
    }

    public class TokenHolding
    {
        public string token_contract { get; set; }
        public string token_symbol { get; set; }
        public int comparison_operator { get; set; }
        public string amount { get; set; }
    }
}
