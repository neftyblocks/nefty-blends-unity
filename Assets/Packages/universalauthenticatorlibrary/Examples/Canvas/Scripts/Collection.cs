using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Collection
{
    public bool success { get; set; }
    public CollectionData data { get; set; }
    public long query_time { get; set; }

    public class CollectionData
    {
        public string contract { get; set; }
        public string collection_name { get; set; }
        public string name { get; set; }
        public string img { get; set; }
        public string author { get; set; }
        public bool allow_notify { get; set; }
        public List<string> authorized_accounts { get; set; }
        public List<string> notify_accounts { get; set; }
        public double market_fee { get; set; }
        public CollectionDataData data { get; set; }
        public string created_at_time { get; set; }
        public string created_at_block { get; set; }
    }

    public class CollectionDataData
    {
        public string img { get; set; }
        public string url { get; set; }
        public string name { get; set; }
        public string images { get; set; }
        public string socials { get; set; }
        public string description { get; set; }
        public string creator_info { get; set; }
    }
}