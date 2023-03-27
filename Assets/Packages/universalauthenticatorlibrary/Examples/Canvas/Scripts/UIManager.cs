using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class UIManager : MonoBehaviour
{
    [SerializeField] private GameObject inventoryUI;
    [SerializeField] private GameObject blendMenuUI;

    private Dictionary<UIType, GameObject> UIs = new Dictionary<UIType, GameObject>();

    public enum UIType
    {
        InventoryMenu,
        BlendMenu,
    }

    private void Awake()
    {
        UIs.Add(UIType.InventoryMenu, inventoryUI);
        UIs.Add(UIType.BlendMenu, blendMenuUI);

        if (!UIs[UIType.InventoryMenu].activeInHierarchy)
        {
            EnableUI(UIType.InventoryMenu);
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
        foreach (KeyValuePair<UIType, GameObject> ui in UIs)
        {
            if (ui.Key != UIType.BlendMenu && ui.Value.activeInHierarchy)
            {
                ui.Value.SetActive(false);
            }
        }
        UIs[UIType.BlendMenu].SetActive(true); 
    }
    public void EnableInventoryMainMenuUI()
    {
        foreach (KeyValuePair<UIType, GameObject> ui in UIs)
        {
            if (ui.Key != UIType.InventoryMenu && ui.Value.activeInHierarchy)
            {
                ui.Value.SetActive(false);
            }
        }
        UIs[UIType.InventoryMenu].SetActive(true);
    }
}
