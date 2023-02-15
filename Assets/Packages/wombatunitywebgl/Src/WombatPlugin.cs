using System;
using System.Collections.Generic;
using UnityEngine;
using System.Runtime.InteropServices;
using AOT;
using EosSharp;
using EosSharp.Core;
using EosSharp.Core.Api.v1;
using Newtonsoft.Json;
using Action = EosSharp.Core.Api.v1.Action;

public class WombatErrorEvent
{
    [JsonProperty("message")]
    public string Message;
}

public class WombatLoginEvent
{
    [JsonProperty("account")]
    public string Account;

    [JsonProperty("public_key")]
    public string PublicKey;
}

public class WombatSignEvent
{
    [JsonProperty("result")]
    public PushTransactionResponse Result;
}

public class WombatPlugin : MonoBehaviour
{
#if UNITY_WEBGL
    private static WombatPlugin _instance;

    public bool IsInitialized => _instance._isInitialized;
    public bool IsLoggedIn => _instance._isLoggedIn;
    public string Account => _instance._account;

    private bool _isInitialized = false;
    private bool _isLoggedIn = false;
    private string _account;

    private Network _network;
    public Network Network => _instance._network;

    private Action<WombatLoginEvent> _onLoggedIn;
    public Action<WombatLoginEvent> OnLoggedIn
    {
        get => _instance._onLoggedIn;
        set => _instance._onLoggedIn = value;
    }

    private Action<WombatSignEvent> _onTransactionSigned;
    public Action<WombatSignEvent> OnTransactionSigned
    {
        get => _instance._onTransactionSigned;
        set => _instance._onTransactionSigned = value;
    }

    private Action<WombatErrorEvent> _onError;
    public Action<WombatErrorEvent> OnError
    {
        get => _instance._onError;
        set => _instance._onError = value;
    }

    public delegate void OnLoginCallback(System.IntPtr onLoginPtr);

    public delegate void OnSignCallback(System.IntPtr onSignPtr);

    public delegate void OnErrorCallback(System.IntPtr onErrorPtr);

    [DllImport("__Internal")]
    private static extern void WombatInit(string rpcAddress, string networkJsonString, string rpcEndpoint);

    [DllImport("__Internal")]
    private static extern void WombatLogin();

    [DllImport("__Internal")]
    private static extern void WombatSign(string actionDataJsonString);

    [DllImport("__Internal")]
    private static extern void WombatSetOnLogin(OnLoginCallback onLoginCallback);

    [DllImport("__Internal")]
    private static extern void WombatSetOnSign(OnSignCallback onSignCallback);

    [DllImport("__Internal")]
    private static extern void WombatSetOnError(OnErrorCallback onErrorCallback);

    private void Awake()
    {
        // If there is an instance, and it's not me, delete myself.

        if (_instance != null && _instance != this)
        {
            Destroy(this);
        }
        else
        {
            _instance = this;
        }

    }

    void Update()
    {
        DispatchEventQueue();
    }

    void Start()
    {
    }

    public void Sign(Action[] actions)
    {
        if (!_instance._isInitialized)
        {
            Debug.Log("Not initialized");
            return;
        }

        if (!_instance._isLoggedIn)
        {
            Debug.Log("Not Logged in");
            return;
        }

        foreach (var action in actions)
        {
            action.authorization = new List<PermissionLevel>()
            {
                new PermissionLevel()
                {
                    actor = _account,
                    permission = "active"
                }
            };
        }

        // TODO, [JsonIgnore] hex_data in EosSharp.Core.Action
        WombatSign(JsonConvert.SerializeObject(actions));
    }

    public void Login()
    {
        WombatLogin();
    }

    public void Initialize(string appName, Network network)
    {
        WombatSetOnLogin(DelegateOnLoginEvent);
        WombatSetOnSign(DelegateOnSignEvent);
        WombatSetOnError(DelegateOnErrorEvent);
        WombatInit(appName, JsonConvert.SerializeObject(network), network.HttpEndpoint);
        _instance._isInitialized = true;
        _instance._network = network;
    }

    [MonoPInvokeCallback(typeof(OnLoginCallback))]
    public static void DelegateOnLoginEvent(System.IntPtr onLoginPtr)
    {
        Debug.Log("DelegateOnLoginEvent called");

        var msg = Marshal.PtrToStringAuto(onLoginPtr);
        if (msg?.Length == 0 || msg == null)
            throw new ApplicationException("LoginCallback Message is null");
        
        _instance._eventList.Add(string.Copy(msg));
    }

    [MonoPInvokeCallback(typeof(OnSignCallback))]
    public static void DelegateOnSignEvent(System.IntPtr onSignPtr)
    {
        Debug.Log("DelegateOnSignEvent called");

        var msg = Marshal.PtrToStringAuto(onSignPtr);
        if (msg?.Length == 0 || msg == null)
            throw new ApplicationException("SignCallback Message is null");
        
        _instance._eventList.Add(string.Copy(msg));
    }

    [MonoPInvokeCallback(typeof(OnErrorCallback))]
    public static void DelegateOnErrorEvent(System.IntPtr onErrorPtr)
    {
        Debug.Log("DelegateOnErrorEvent called");

        var msg = Marshal.PtrToStringAuto(onErrorPtr);
        if (msg?.Length == 0 || msg == null)
            throw new ApplicationException("SignCallback Message is null");

        _instance._eventList.Add(string.Copy(msg));
    }

    private readonly List<string> _eventList = new List<string>();
    public void DispatchEventQueue()
    {
        var messageListCopy = new List<string>(_instance._eventList);
        _instance._eventList.Clear();

        foreach (var msg in messageListCopy)
        {
            var loginEvent = JsonConvert.DeserializeObject<WombatLoginEvent>(msg);
            if (!string.IsNullOrEmpty(loginEvent?.Account))
            {
                _instance._account = loginEvent?.Account;
                if (loginEvent?.Account != null)
                    _instance._isLoggedIn = true;
                _instance.OnLoggedIn?.Invoke(loginEvent);
                continue;
            }

            var errorEvent = JsonConvert.DeserializeObject<WombatErrorEvent>(msg);
            if (!string.IsNullOrEmpty(errorEvent?.Message))
            {
                _instance.OnError?.Invoke(errorEvent);
                continue;
            }

            var signEvent = JsonConvert.DeserializeObject<WombatSignEvent>(msg);
            if (signEvent?.Result != null)
            {
                _instance.OnTransactionSigned.Invoke(signEvent);
            }
        }
    }
#else
    public Network Network;

    public Action<WombatLoginEvent> OnLoggedIn;

    public Action<WombatSignEvent> OnTransactionSigned;

    public Action<WombatErrorEvent> OnError;

    public void Login()
    {
        throw new NotImplementedException("Wombat is not supported on Platforms other than WebGL");
    }

    public void Sign(Action[] actions)
    {
        throw new NotImplementedException("Wombat is not supported on Platforms other than WebGL");
    }

    public void Sign(Action action)
    {
        throw new NotImplementedException("Wombat is not supported on Platforms other than WebGL");
    }
#endif
}
