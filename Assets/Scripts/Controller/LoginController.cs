using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class LoginController : MonoBehaviour
{
    [SerializeField] SendTransactionJS sendTransactionJS;

    public void LoginAnchor()
    {
        sendTransactionJS.LoginAnchor();
    }
    public void LoginCloudWallet()
    {
        sendTransactionJS.LoginCloudWallet();
    }
}
