using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class LoginController : MonoBehaviour
{
    [SerializeField] SendTransactionJS sendTransactionJS;

   /* void Start()
    {
        IsLoggedIn(){

        }
    }*/
    public void LoginAnchor()
    {
        sendTransactionJS.LoginAnchor();
    }
    public void LoginCloudWallet()
    {
        sendTransactionJS.LoginCloudWallet();
    }

 /*   public void IsLoggedIn()
    {
        sendTransactionJS.IsLoggedIn();
    }*/
}
