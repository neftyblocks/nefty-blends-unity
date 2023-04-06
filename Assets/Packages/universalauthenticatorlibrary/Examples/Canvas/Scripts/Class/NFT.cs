using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class NFT : MonoBehaviour
{
    [SerializeField] private string assetId;    
    public void SetAsssetId(string id)
    {
       assetId = id;
    }
    public string GetAssetId()
    {
        return assetId;
    }
}
