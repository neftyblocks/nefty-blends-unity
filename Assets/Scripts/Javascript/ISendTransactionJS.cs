
public interface ISendTransactionJS
{
    void SendBlendTransaction(int blendId, string[] assetIds, string[] contractNames, string[] tokenSymbol, string[] tokenQuantity, int ftCount, int assetCount, bool isSecured, string[] protectedAssets,int protectedAssetsCount);
}
