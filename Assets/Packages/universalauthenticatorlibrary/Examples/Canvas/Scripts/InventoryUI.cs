using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.PlayerLoop;

public class InventoryUI : MonoBehaviour
{
    [SerializeField] private TextMeshProUGUI walletNameText;
    [SerializeField] private TextMeshProUGUI totalAssetText;
    [SerializeField] private TextMeshProUGUI currentPageText;
    [SerializeField] private DashboardController dashboardController;
    [SerializeField] private InventoryFetcherController inventoryFetcherController;

    public delegate void NextPageEventHandler();
    public static event NextPageEventHandler NextPageEvent;
    public delegate void PreviousPageEventHandler();
    public static event PreviousPageEventHandler PreviousPageEvent;

    private void OnEnable()
    {
        DashboardController.UserLoggedIn += UpdateUI;
        InventoryFetcherController.UiRefresh += UpdateUI;
    }

    private void UpdateUI()
    {
        SetWalletNameText(dashboardController.walletName);
        SetTotalAssetText(inventoryFetcherController.assetCount);
        SetCurrentPageText(inventoryFetcherController.currentPage);
    }

    public void SetWalletNameText(string wallet)
    {
        walletNameText.text = $"Welcome {wallet}";
    }
    public void SetTotalAssetText(int amount)
    {
        totalAssetText.text = $"Total assets - {amount}";
    }
    public void SetCurrentPageText(int currentPage)
    {
        currentPageText.text = $"{currentPage}";
    }

    public void NextPage()
    {
        NextPageEvent();
    }
    public void PreviousPage()
    {
        PreviousPageEvent();
    }
}
