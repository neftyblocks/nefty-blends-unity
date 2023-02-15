using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class InventoryUI : MonoBehaviour
{
    [SerializeField] private TextMeshProUGUI walletNameText;

    public void SetWalletNameText(string wallet)
    {
        walletNameText.text = $"Welcome {wallet}";
    }
}
