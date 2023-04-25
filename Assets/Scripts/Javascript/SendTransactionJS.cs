using System.Runtime.InteropServices;
using UnityEngine;

public class SendTransactionJS : MonoBehaviour, ISendTransactionJS
{
    [DllImport("__Internal")]
    private static extern void SubmitBlend(int blendId, string[] assetIds, int count);

    public void SendTransactionBlend(int blendId, string[] assetIds)
    {
        // Submits via WAXJS blend contract
        SubmitBlend(blendId, assetIds, assetIds.Length);
    }
}
