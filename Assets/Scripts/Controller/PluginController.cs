using UnityEngine;

/// <summary>
/// PluginController is a class that handles the collection and wallet information.
/// </summary>
public class PluginController : MonoBehaviour
{
    [SerializeField] string collectionName;
    [SerializeField] public static string walletName { get; set; }
    public static string apiUrl = "https://aa.neftyblocks.com";
    public static string ipfsUrl = "https://resizer.neftyblocks.com";
    public string GetCollectionName()
    {
        return collectionName;
    }
    public string GetWalletName()
    {
        return walletName;
    }

    public void SetWalletName(string name)
    {
        walletName = name;
    }
}
