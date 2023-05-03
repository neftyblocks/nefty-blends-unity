using System.Runtime.InteropServices;
using UnityEngine;

public class SendTransactionJS : MonoBehaviour, ISendTransactionJS
{
    [DllImport("__Internal")]
    private static extern void SubmitBlend(int blendId, string[] assetIds,int count);
    [DllImport("__Internal")]
    private static extern void SubmitBlendToken(int blendId, string[] contractName, string[] tokenQuantity, string[] tokenSymbol,int count);
    [DllImport("__Internal")]
    private static extern void SubmitBlendTokenAndAsset(int blendId, string[] assetIds, string[] contractNames, string[] tokenSymbol, string[] tokenQuantity, int ftCount,int assetCount);


    public void SendTransactionAsset(int blendId, string[] assetIds, int count)
    {
        // Submits via WAXJS blend contract
        SubmitBlend(blendId, assetIds,count);
    }

    public void SendTransactionToken(int blendId, string[] contractNames, string[] tokenSymbol, string[] tokenQuantity, int count)
    {
        SubmitBlendToken(blendId, contractNames, tokenQuantity, tokenSymbol,count);
     }
    public void SendTransactionAssetAndToken(int blendId, string[] assetIds, string[] contractNames, string[] tokenSymbol, string[] tokenQuantity, int ftCount,int assetCount)
    {
        SubmitBlendTokenAndAsset(blendId, assetIds, contractNames, tokenSymbol, tokenQuantity, ftCount,assetCount);
    }
}
