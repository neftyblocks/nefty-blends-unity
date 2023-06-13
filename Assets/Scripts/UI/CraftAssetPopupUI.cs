using System.Linq;
using UnityEngine;
using UnityEngine.UI;

/// <summary>
/// CraftAssetPopupUI is responsible for creating, managing and displaying the crafting assets in the user interface.
/// </summary>
public class CraftAssetPopupUI : MonoBehaviour
{
    [SerializeField] public RectTransform craftAssetPanel;
    [SerializeField] public BlendController blendController;
    [SerializeField] public GameObject ingredientPrefab;
    [SerializeField] public GameObject[] ingredientSlots;
    [SerializeField] private UIController uIController;

    public void InstantiateCraftAssetPopupUI(ExactIndexIngredientAssetsResult exactIndexIngredientAssetsResult)
    {
        ResetSlots(ingredientSlots);
        InstantiateSlots(exactIndexIngredientAssetsResult.sprites.Count, ingredientPrefab, craftAssetPanel, ref ingredientSlots);
    }

    // Display automatically selected items in the popup as selected.
    public void DisplayBeingSelected()
    {
        var selectedIds = blendController.GetSelectedAssetList();
        foreach (var ingredientSlot in ingredientSlots)
        {
            var ingredientId = ingredientSlot.GetComponent<NFT>().GetAssetId();
            if (selectedIds.Contains(ingredientId))
            {
                ingredientSlot.GetComponent<UIElementController>().SetIsClicked(true);
                ingredientSlot.GetComponent<UIElementController>().GreyOutAsset(true);
            }
            else
            {
                ingredientSlot.GetComponent<UIElementController>().SetIsClicked(false);
                ingredientSlot.GetComponent<UIElementController>().GreyOutAsset(false);
            }
        }
    }

    public void ResetSlots(GameObject[] gameObjects)
    {
        for (int i = 0; i < gameObjects.Length; i++)
        {
            if (gameObjects[i] != null)
            {
                Destroy(gameObjects[i]);
            }
            gameObjects[i] = null;
        }
    }

    public void CloseUI()
    {
        gameObject.SetActive(false);
    }

    private void InstantiateSlots(int slotCount, GameObject slotPrefab, RectTransform container, ref GameObject[] slots)
    {
        slots = new GameObject[slotCount];

        for (int i = 0; i < slotCount; i++)
        {
            slots[i] = Instantiate(slotPrefab, container);
            slots[i].tag = "Craft";
        }
    }

    public void DisplayAssetImages(ExactIndexIngredientAssetsResult exactIndexIngredientAssetsResult)
    {
        if (exactIndexIngredientAssetsResult != null)
        {
            InstantiateCraftAssetPopupUI(exactIndexIngredientAssetsResult);

            for (int i = 0; i < exactIndexIngredientAssetsResult.sprites.Count; i++)
            {
                Transform nftImage = ingredientSlots[i].transform.Find("NFT_Image");
                nftImage.GetComponent<Image>().sprite = exactIndexIngredientAssetsResult.sprites[i];
                ingredientSlots[i].GetComponent<NFT>().SetAsssetId(exactIndexIngredientAssetsResult.assetIds[i]);
                ingredientSlots[i].GetComponent<NFT>().SetAssetName(exactIndexIngredientAssetsResult.assetNames[i]);
                ingredientSlots[i].GetComponent<NFT>().SetMintNumber(exactIndexIngredientAssetsResult.mintNumbers[i]);
            }
            UpdateAssetText();
        }
        uIController.ChangePrefabColor();
        DisplayBeingSelected();
    }
    public void UpdateAssetText()
    {
        for (int i = 0; i < ingredientSlots.Length; i++)
        {
            ingredientSlots[i].GetComponent<UIElementController>().SetAssetNameText(ingredientSlots[i].GetComponent<NFT>().GetAssetName());
            ingredientSlots[i].GetComponent<UIElementController>().SetMintNumberText(ingredientSlots[i].GetComponent<NFT>().GetMintNumber().ToString());
        }
    }
}
