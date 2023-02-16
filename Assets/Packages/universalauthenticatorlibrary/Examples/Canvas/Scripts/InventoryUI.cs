using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class InventoryUI : MonoBehaviour
{
    [SerializeField] private TextMeshProUGUI walletNameText;
    [SerializeField] private TextMeshProUGUI totalAssetText;


    public void SetWalletNameText(string wallet)
    {
        walletNameText.text = $"Welcome {wallet}";
    }
    public void SetTotalAssetText(int amount)
    {
        totalAssetText.text = $"Total assets - {amount}";
    }
}
