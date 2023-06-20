
public interface ISendTransactionJS
{
    void SendBlendTransaction(int blendId, string[] assetIds, string[] contractNames, string[] tokenSymbol, string[] tokenQuantity, int ftCount, int assetCount);
    void SendSecuredBlendTransaction(int blendId, string[] assetIds, string[] contractNames, string[] tokenSymbol, string[] tokenQuantity, int ftCount, int assetCount, string[] protectedAssets,int protectedAssetsCount);
    void IsBlendProtectionEligible(int securityId);
}
