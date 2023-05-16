using System.Runtime.InteropServices;
using UnityEngine;

public class SendTransactionJS : MonoBehaviour, ISendTransactionJS
{
    [DllImport("__Internal")]
    private static extern void SubmitBlend(int blendId, string[] assetIds, string[] contractNames, string[] tokenSymbol, string[] tokenQuantity, int ftCount,int assetCount, bool isSecured, string[] protectedAssets, int protectedAssetsCount);

    [DllImport("__Internal")]
    private static extern void LoginAnchorJS();

    [DllImport("__Internal")]
    private static extern void LoginCloudWalletsJS();

    [DllImport("__Internal")]
    private static extern void IsBlendProtectionEligibleJS(int securityId);

    public void SendBlendTransaction(int blendId, string[] assetIds, string[] contractNames, string[] tokenSymbol, string[] tokenQuantity, int ftCount,int assetCount,bool isSecured, string[] protectedAssets, int protectedAssetsCount)
    {
        SubmitBlend(blendId, assetIds, contractNames, tokenSymbol, tokenQuantity, ftCount,assetCount,isSecured, protectedAssets, protectedAssetsCount);
    }

    public void LoginAnchor()
    {
        LoginAnchorJS();
    }
    public void LoginCloudWallet()
    {
        LoginCloudWalletsJS();
    }

    public void IsBlendProtectionEligible(int securityId)
    {
        IsBlendProtectionEligibleJS(securityId);
    }
}
