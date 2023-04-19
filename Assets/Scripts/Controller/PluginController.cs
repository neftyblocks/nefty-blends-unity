using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PluginController : MonoBehaviour
{
    [SerializeField] string collectionName;
    public static string apiUrl = "https://aa.neftyblocks.com";
    public static string ipfsUrl = "https://resizer.neftyblocks.com";
    public string GetCollectionName()
    {
        return collectionName;
    }
}
