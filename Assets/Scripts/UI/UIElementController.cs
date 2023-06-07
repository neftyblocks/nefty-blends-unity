using TMPro;
using UnityEngine;
using UnityEngine.EventSystems;

/// <summary>
/// The UIElementController class manages the UI element's interactions and state changes, 
/// including click and hover events, and updating the display text.
/// </summary>
public class UIElementController : MonoBehaviour, IPointerEnterHandler, IPointerExitHandler, IPointerClickHandler
{
    [SerializeField] private GameObject selectionBoardImage;
    [SerializeField] private bool isClicked;
    [SerializeField] private TextMeshProUGUI assetNameText;
    [SerializeField] private TextMeshProUGUI mintNumberText;

    public void OnPointerEnter(PointerEventData eventData)
    {
        DisplayBorder(true);
    }

    public void OnPointerExit(PointerEventData eventData)
    {
        if(!isClicked)
        {
            DisplayBorder(false);
        }
    }

    /// On mouse click, the UI element clicked status is toggled and the IngredientSelector's selected asset is updated.
    public void OnPointerClick(PointerEventData pointerEventData)
    {
        isClicked = isClicked ? false : true;
        GameObject.Find("IngredientSelector").GetComponent<IngredientSelector>().SetSelectedAsset(gameObject.GetComponent<NFT>().GetAssetId());
    }

    public void SetAssetNameText(string text)
    {
        assetNameText.text = text;
    }

    public void SetMintNumberText(string text)
    {
        mintNumberText.text = "#" + text;
    }

    public void SetIsClicked(bool condition)
    {
        isClicked = condition;
    }

    public void DisplayBorder(bool condition)
    {
        selectionBoardImage.SetActive(condition);
    }
}
