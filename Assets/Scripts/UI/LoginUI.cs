using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class LoginUI : MonoBehaviour
{

    [SerializeField] public GameObject loginPanelUI;

    public void LoggedIn()
    {
        loginPanelUI.SetActive(false);
    }
}

