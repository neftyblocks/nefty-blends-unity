using System.Collections.Generic;
using UnityEngine;

/// <summary>
/// The UIManager class manages different UI screens and provides methods to enable and load specific UI screens.
/// It utilizes a dictionary to store references to the UI screens.
/// </summary>
public class UIManager : MonoBehaviour
{
    [SerializeField] private GameObject loginUI;
    [SerializeField] private GameObject inventoryUI;
    [SerializeField] private GameObject blendMenuUI;
    [SerializeField] private GameObject craftingUI;
    [SerializeField] private GameObject assetPopup;
    [SerializeField] private GameObject confirmationPopup;

    private Dictionary<UIType, GameObject> UIs = new Dictionary<UIType, GameObject>();

    // The types of UI screens available
    public enum UIType
    {
        LoginMenu,
        InventoryMenu,
        BlendMenu,
        CraftingMenu,
        AssetPopupMenu,
        ConfirmationPopupMenu,
    }

    private void Start()
    {
        UIs.Add(UIType.InventoryMenu, inventoryUI);
        UIs.Add(UIType.BlendMenu, blendMenuUI);
        UIs.Add(UIType.CraftingMenu, craftingUI);
        UIs.Add(UIType.AssetPopupMenu, assetPopup);
        UIs.Add(UIType.LoginMenu, loginUI);
        UIs.Add(UIType.ConfirmationPopupMenu, confirmationPopup);

        if (!UIs[UIType.LoginMenu].activeInHierarchy)
        {
            EnableUI(UIType.LoginMenu);
        }
    }

    public void EnableUI(UIType uiType)
    {
        if (!UIs[uiType].gameObject.activeInHierarchy)
        {
            UIs[uiType].SetActive(true);
        }
        else
        {
            UIs[uiType].SetActive(false);
        }
    }

    public void EnableBlendMainMenuUI()
    {
        GameObject blendMenu = UIs[UIType.BlendMenu];
        if (blendMenu.activeSelf)
        {
            return; 
        }

        foreach (KeyValuePair<UIType, GameObject> kvp in UIs)
        {
            if (kvp.Key != UIType.BlendMenu && kvp.Value.activeSelf)
            {
                kvp.Value.SetActive(false);
            }
        }

        blendMenu.SetActive(true);
        blendMenuUI.GetComponentInChildren<BlendListUI>().RefreshBlendSlots();
    }

    public void EnableInventoryMainMenuUI()
    {
        GameObject inventoryMenu = UIs[UIType.InventoryMenu];

        if (inventoryMenu.activeSelf)
        {
            return; 
        }

        foreach (KeyValuePair<UIType, GameObject> kvp in UIs)
        {
            if (kvp.Key != UIType.InventoryMenu && kvp.Value.activeSelf)
            {
                kvp.Value.SetActive(false);
            }
        }

        inventoryMenu.SetActive(true);
        var inventory = inventoryUI.GetComponentInChildren<InventoryUI>();
        inventory.RefreshInventorySlots(inventory.GetCurrentFilterSelected());
    }

    public void LoadMainMenu()
    {
        GameObject inventoryMenu = UIs[UIType.InventoryMenu];

        foreach (KeyValuePair<UIType, GameObject> kvp in UIs)
        {
            if (kvp.Key != UIType.InventoryMenu && kvp.Value.activeSelf)
            {
                kvp.Value.SetActive(false);
            }
        }

        inventoryMenu.SetActive(true);
        var inventory = inventoryUI.GetComponentInChildren<InventoryUI>();
        inventory.RefreshInventorySlots(inventory.GetCurrentFilterSelected());
    }

    public void EnableCraftingUI()
    {
        foreach (KeyValuePair<UIType, GameObject> ui in UIs)
        {
            if (ui.Key != UIType.CraftingMenu && ui.Value.activeInHierarchy)
            {
                ui.Value.SetActive(false);
            }
        }
        UIs[UIType.CraftingMenu].SetActive(true);
    }
    public void EnableAssetPopup()
    {
        foreach (KeyValuePair<UIType, GameObject> ui in UIs)
        {
            if (ui.Key != UIType.AssetPopupMenu && ui.Value.activeInHierarchy)
            {
                ui.Value.SetActive(false);
            }
        }
        UIs[UIType.CraftingMenu].SetActive(true);
        UIs[UIType.AssetPopupMenu].SetActive(true);
    }
}
