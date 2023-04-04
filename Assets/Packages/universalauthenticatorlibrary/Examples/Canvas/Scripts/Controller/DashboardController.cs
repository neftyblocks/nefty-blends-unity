using AnchorLinkTransportSharp.Src.Transports.Canvas;
using UnityEngine;
using UnityEngine.SceneManagement;
using UniversalAuthenticatorLibrary;
using UniversalAuthenticatorLibrary.Src.Authenticators.Anchor;
using UniversalAuthenticatorLibrary.Src.Canvas;
using UnityEngine.UI;

public class DashboardController : MonoBehaviour
{
    public UnityCanvasUAL UnityCanvasUAL;
    public User user { get; set; }
    public string walletName { get; set; }
    public delegate void UserLoggedInEventHandler();
    public static event UserLoggedInEventHandler UserLoggedIn;

    async void Start()
    {
        await UnityCanvasUAL.Init();
        UnityCanvasUAL.OnUserLogin += UserLogin;
    }
   
    private async void UserLogin(User _user)
    {
        user = _user;
        walletName = await user.GetAccountName();
        Debug.Log(walletName);
        UserLoggedIn();
    }
}
