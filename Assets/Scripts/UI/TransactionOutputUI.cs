using System;
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class TransactionOutputUI : MonoBehaviour
{
    [SerializeField]public GameObject confirmationPanelUI;
    [SerializeField] public TextMeshProUGUI confirmationPanelText;

    public void ShowSuccess()
    {
        gameObject.transform.GetChild(0).gameObject.SetActive(true);
        confirmationPanelText.text = "Success!";
    }

    public void ShowError(string error)
    {
        gameObject.transform.GetChild(0).gameObject.SetActive(true);
        confirmationPanelText.text = "Fail!" + error;
    }

    public void CloseWindow()
    {
        confirmationPanelUI.SetActive(false);
    }
}
