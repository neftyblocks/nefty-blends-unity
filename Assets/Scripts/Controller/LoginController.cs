using UnityEngine;

/// <summary>
/// LoginController is responsible for handling the login functionality.
/// </summary>
public class LoginController : MonoBehaviour
{
    [SerializeField] SendTransactionJS sendTransactionJS;

    // Calls the LoginAnchor method of SendTransactionJS for anchor login.
    public void LoginAnchor()
    {
        sendTransactionJS.LoginAnchor();
    }
    // Calls the LoginCloudWallet method of SendTransactionJS for cloud wallet login.
    public void LoginCloudWallet()
    {
        sendTransactionJS.LoginCloudWallet();
    }
}
