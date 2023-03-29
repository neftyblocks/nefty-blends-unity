using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PluginController : MonoBehaviour
{
    [SerializeField] string collectionName;

    public string GetCollectionName()
    {
        return collectionName;
    }
}
