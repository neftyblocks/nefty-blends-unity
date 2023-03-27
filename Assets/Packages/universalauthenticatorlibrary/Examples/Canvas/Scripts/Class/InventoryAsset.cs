using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class InventoryAsset
{
    public int total { get; set; }
    public List<Item> items { get; set; }

    public class Image
    {
        public string alt { get; set; }
        public Dictionary<string, int> dimensions { get; set; }
        public Dictionary<string, int> position { get; set; }
        public string url { get; set; }
        public string hash { get; set; }
        public string shadow { get; set; }
        public bool trusted { get; set; }
    }

    public class Asset
    {
        public string name { get; set; }
        public Image image { get; set; }
        public object video { get; set; }
        public bool is_burnable { get; set; }
        public bool is_transferable { get; set; }
        public string mint { get; set; }
        public string template_id { get; set; }
        public string schema_name { get; set; }
        public object backed_tokens { get; set; }
        public string owner { get; set; }
        public string rarity { get; set; }
        public string max_supply { get; set; }
        public string issued_supply { get; set; }
    }

    public class Item
    {
        public string id { get; set; }
        public Asset asset { get; set; }
        public List<Asset> assets { get; set; }
        public string collection_id { get; set; }
        public string collection_name { get; set; }
        public Image collection_img { get; set; }
        public Dictionary<string, object> collected { get; set; }
    }
}
