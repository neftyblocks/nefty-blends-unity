using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class OwnershipSchema
{
    
        public bool Success { get; set; }
        public Data data { get; set; }
        public long QueryTime { get; set; }
    

    public partial class Data
    {
        public List<Schema> Schemas { get; set; }
        public List<Template> Templates { get; set; }
    }

    public partial class Schema
    {
        public string SchemaName { get; set; }
        public long Assets { get; set; }
    }

    public partial class Template
    {
        public long TemplateId { get; set; }
        public long Assets { get; set; }
    }
}
