using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class LoginUI : MonoBehaviour
{

    [SerializeField] public GameObject loginPanelUI;
    [SerializeField] public PluginController pluginController;
    [SerializeField] public UIManager uIManager;
    [SerializeField] public TextMeshProUGUI walletText;
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

