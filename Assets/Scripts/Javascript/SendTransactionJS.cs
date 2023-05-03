using System.Runtime.InteropServices;
using UnityEngine;

public class SendTransactionJS : MonoBehaviour, ISendTransactionJS
{
    [DllImport("__Internal")]
    private static extern void SubmitBlend(int blendId, string[] assetIds, string[] contractNames, string[] tokenSymbol, string[] tokenQuantity, int ftCount,int assetCount);

    public void SendBlendTransaction(int blendId, string[] assetIds, string[] contractNames, string[] tokenSymbol, string[] tokenQuantity, int ftCount,int assetCount)
    {
        SubmitBlend(blendId, assetIds, contractNames, tokenSymbol, tokenQuantity, ftCount,assetCount);
    }
}
