
public interface ISendTransactionJS
{
    void SendTransactionAsset(int blendId, string[] assetIds,int count);
    void SendTransactionToken(int blendId, string[] contractNames, string[] tokenSymbol, string[] tokenQuantity, int count);
    void SendTransactionAssetAndToken(int blendId, string[] assetIds, string[] contractNames, string[] tokenSymbol, string[] tokenQuantity, int ftCount, int assetCount);
}
