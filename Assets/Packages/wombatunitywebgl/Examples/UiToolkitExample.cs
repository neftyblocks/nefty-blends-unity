using System;
using System.Threading.Tasks;
using WombatUnityWebGl.Examples.Ui;
using Newtonsoft.Json;
using UnityEngine;

namespace WombatUnityWebGl.Examples
{
    public class UiToolkitExample : MonoBehaviour
    {
        // Assign UnityTransport through the Editor
        private WombatPlugin _wombatPlugin;
        public LoginView LoginView;
        public MainView MainView;
        public string Account { get; private set; }

        public void Start()
        {
            _wombatPlugin = new GameObject(nameof(WombatPlugin)).AddComponent<WombatPlugin>();

            _wombatPlugin.OnLoggedIn += (loginEvent) =>
            {
                Account = loginEvent.Account;
                Debug.Log($"{loginEvent.Account} Logged In");
                MainView.Rebind(Account);
                LoginView.Hide();
                MainView.Show();
            };

            _wombatPlugin.OnError += (errorEvent) =>
            {
                Debug.Log($"Error: {errorEvent.Message}");
            };

            _wombatPlugin.OnTransactionSigned += (signEvent) =>
            {
                Debug.Log($"Transaction signed: {JsonConvert.SerializeObject(signEvent.Result)}");
            };

#if UNITY_WEBGL
            _wombatPlugin.Initialize("liquiidtest", new Network()
            {
                Port = 443,
                Blockchain = "WAX",
                ChainId = "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4",
                Host = "wax.greymass.com",
                Protocol = "https"
            });
#else
            Debug.Log("Wombat-Wallet can't be used on platforms other than WebGL");
#endif
        }

        public void Login()
        {
            _wombatPlugin.Login();
        }

        // transfer tokens using a session  
        public void Transfer(EosSharp.Core.Api.v1.Action action)
        {
            _wombatPlugin.Sign(new[] { action });
        }

        // ask the user to sign the transaction and then broadcast to chain
        public void Vote(EosSharp.Core.Api.v1.Action action)
        {
            _wombatPlugin.Sign(new[] { action });
        }

        // ask the user to sign the transaction and then broadcast to chain
        public void SellOrBuyRam(EosSharp.Core.Api.v1.Action action)
        {
            _wombatPlugin.Sign(new[] { action });
        }
    }

}
