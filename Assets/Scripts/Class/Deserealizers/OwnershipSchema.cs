using Newtonsoft.Json;
using System.Collections.Generic;

public class OwnershipSchema
{
    [JsonProperty("success")]
    public bool success { get; set; }
    [JsonProperty("data")]
    public Data data { get; set; }
    [JsonProperty("query_time")]
    public long queryTime { get; set; }

    public partial class Data
    {
        [JsonProperty("schemas")]
        public List<Schema> schemas { get; set; }
        [JsonProperty("templates")]
        public List<Template> templates { get; set; }
    }

    public partial class Schema
    {
        [JsonProperty("schema_name")]
        public string schemaName { get; set; }
        [JsonProperty("assets")]
        public int assets { get; set; }
    }

    public partial class Template
    {
        [JsonProperty("template_id")]
        public string templateId { get; set; }
        [JsonProperty("assets")]
        public int assets { get; set; }
    }
}
