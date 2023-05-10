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
        Debug.Log("hello");
        loginPanelUI.SetActive(false);
        Debug.Log(walletName);
        pluginController.SetWalletName(walletName);
        uIManager.EnableInventoryMainMenuUI();
        walletText.text = walletName; 
    }

    public void TemporaryHideButton()
    {
        uIManager.EnableInventoryMainMenuUI();
    }
}

