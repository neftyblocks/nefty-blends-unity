using UnityEngine;

public class NFT : MonoBehaviour
{
    [SerializeField] private string assetId;
    [SerializeField] private string assetName;
    [SerializeField] private int mintNumber;

    public void SetAssetId(string assetId)
    {
       this.assetId = assetId;
    }
    public string GetAssetId()
    {
        return assetId;
    }

    public void SetAssetName(string assetName)
    {
        this.assetName = assetName;
    }
    public string GetAssetName()
    {
        return assetName;
    }

    public void SetMintNumber(int mintNumber)
    {
        this.mintNumber = mintNumber;
    }
    public int GetMintNumber()
    {
        return mintNumber;
    }
}
