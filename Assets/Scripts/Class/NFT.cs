using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class NFT : MonoBehaviour
{
    [SerializeField] private string assetId;
    [SerializeField] private string assetName;
    [SerializeField] private int mintNumber;

    public void SetAsssetId(string id)
    {
       assetId = id;
    }
    public string GetAssetId()
    {
        return assetId;
    }

    public void SetAssetName(string name)
    {
        assetName = name;
    }
    public string GetAssetName()
    {
        return assetName;
    }

    public void SetMintNumber(int mint)
    {
        mintNumber = mint;
    }
    public int GetMintNumber()
    {
        return mintNumber;
    }
}
