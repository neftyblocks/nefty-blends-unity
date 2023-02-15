using System;
using System.Collections;
using System.Collections.Generic;
using Newtonsoft.Json;
using UnityEngine;

[Serializable]
public class Network
{
    [JsonProperty("blockchain")]
    public string Blockchain;
    [JsonProperty("host")]
    public string Host;
    [JsonProperty("port")]
    public int Port;
    [JsonProperty("protocol")]
    public string Protocol;
    [JsonProperty("chainId")]
    public string ChainId;

    public string HttpEndpoint => Port == 443 ? "https://" + Host : "http://" + Host + ":" + Port;
}

