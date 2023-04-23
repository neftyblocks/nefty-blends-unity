using System.Runtime.InteropServices;
using UnityEngine;

public class SendTransactionJS : MonoBehaviour, ISendTransactionJS
{
    [DllImport("__Internal")]
    private static extern void SubmitBlend(int blendId, string[] assetIds, int count);

    [DllImport("__Internal")]
    private static extern void HelloString(string str);

    [DllImport("__Internal")]
    private static extern void PrintFloatArray(float[] array, int size);

    [DllImport("__Internal")]
    private static extern int AddNumbers(int x, int y);

    [DllImport("__Internal")]
    private static extern string StringReturnValueFunction();

    [DllImport("__Internal")]
    private static extern void StringArray(string[] array, int size);

    public void SendTransactionBlend(int blendId, string[] assetIds)
    {
        // Submits via WAXJS blend contract
        SubmitBlend(blendId, assetIds, assetIds.Length);
    }
}
