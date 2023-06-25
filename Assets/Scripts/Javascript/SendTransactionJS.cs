using System.Runtime.InteropServices;
using UnityEngine;

/// <summary>
/// This class is responsible for communicating with the JavaScript environment inside the Plugin/WrapperJS.jslib file 
/// </summary>
public class SendTransactionJS : MonoBehaviour, ISendTransactionJS
{
    // Import JavaScript functions from the internal scope Plugin/WrapperJS.jslib file.
    [DllImport("__Internal")]
    private static extern void SubmitBlend(int blendId, string[] assetIds, string[] contractNames, string[] tokenSymbol, string[] tokenQuantity, int ftCount, int assetCount);
    [DllImport("__Internal")]
    private static extern void SendSecuredBlend(int blendId, string[] assetIds, string[] contractNames, string[] tokenSymbol, string[] tokenQuantity, int ftCount, int assetCount, string[] protectedAssets, int protectedAssetsCount);
    [DllImport("__Internal")]
    private static extern void LoginAnchorJS();
    [DllImport("__Internal")]
    private static extern void LoginCloudWalletsJS();
    [DllImport("__Internal")]
    private static extern void IsBlendProtectionEligibleJS(int securityId,string collectionName);
    [DllImport("__Internal")]
    private static extern void ChangeRPCEndpointJS(string rpcLink);
    [DllImport("__Internal")]
    private static extern void LogoutJS();


    // This method calls the JS function to send a secured blend transaction.
    public void SendSecuredBlendTransaction(int blendId, string[] assetIds, string[] contractNames, string[] tokenSymbol, string[] tokenQuantity, int ftCount, int assetCount, string[] protectedAssets, int protectedAssetsCount)
    {
        SendSecuredBlend(blendId, assetIds, contractNames, tokenSymbol, tokenQuantity, ftCount, assetCount, protectedAssets, protectedAssetsCount);
    }

    // This method calls the JS function to send a blend transaction.
    public void SendBlendTransaction(int blendId, string[] assetIds, string[] contractNames, string[] tokenSymbol, string[] tokenQuantity, int ftCount, int assetCount)
    {
        SubmitBlend(blendId, assetIds, contractNames, tokenSymbol, tokenQuantity, ftCount, assetCount);
    }

    // This method calls the JS function to login to an anchor through UAL.
    public void LoginAnchor()
    {
        LoginAnchorJS();
    }
    // This method calls the JS function to login to a cloud wallet through UAL.
    public void LoginCloudWallet()
    {
        LoginCloudWalletsJS();
    }

    // This method changes the RPC endpoint by calling a JS function.
    public void ChangeRPCEndpoint(string rpcLink)
    {
        ChangeRPCEndpointJS(rpcLink);
    }

    // This method calls a JS function to check the eligibility for blend protection.
    public void IsBlendProtectionEligible(int securityId,string collectionName)
    {
        IsBlendProtectionEligibleJS(securityId,collectionName);
    }
    // Logs out user by clearing localstorage in JS
    public void Logout()
    {
        LogoutJS();
    }
}
