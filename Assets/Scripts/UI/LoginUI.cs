using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

/// <summary>
/// The LoginUI class handles the UI elements and actions related to the login process.
/// </summary>
public class LoginUI : MonoBehaviour
{

    [SerializeField] public GameObject loginPanelUI;
    [SerializeField] public PluginController pluginController;
    [SerializeField] public UIManager uIManager;
    [SerializeField] public TextMeshProUGUI walletText;

    // Updates the UI elements after a successful login that is caleld in WrapperJS.jslib file
    public void LoggedIn(string walletName)
    {
        loginPanelUI.SetActive(false);
        pluginController.SetWalletName(walletName);
        uIManager.LoadMainMenu();
        walletText.text = walletName; 
    }

    public void TemporaryHideButton()
    {
        uIManager.LoadMainMenu();
    }
}

