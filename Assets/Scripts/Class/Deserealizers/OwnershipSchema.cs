using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class OwnershipSchema
{
    public bool success { get; set; }
    public Data data { get; set; }
    public long queryTime { get; set; }

    public partial class Data
    {
        public List<Schema> schemas { get; set; }
        public List<Template> templates { get; set; }
    }

    public partial class Schema
    {
        public string schemaName { get; set; }
        public long assets { get; set; }
    }

    public partial class Template
    {
        public long templateId { get; set; }
        public long assets { get; set; }
    }

}
