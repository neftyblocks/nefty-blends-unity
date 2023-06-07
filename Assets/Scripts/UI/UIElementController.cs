using TMPro;
using UnityEngine;
using UnityEngine.EventSystems;

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
    public void OnPointerClick(PointerEventData pointerEventData)
    {
        isClicked = isClicked ? false : true;
        GameObject.Find("BlendInputter").GetComponent<IngredientSelector>().SetSelectedAsset(gameObject.GetComponent<NFT>().GetAssetId());
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
