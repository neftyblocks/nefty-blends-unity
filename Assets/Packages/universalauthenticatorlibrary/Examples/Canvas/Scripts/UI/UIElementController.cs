using TMPro;
using UnityEngine;
using UnityEngine.EventSystems;

public class UIElementController : MonoBehaviour, IPointerEnterHandler, IPointerExitHandler, IPointerClickHandler
{
    [SerializeField] public GameObject selectionBoardImage;
    [SerializeField] private bool isClicked;
    [SerializeField] private TextMeshProUGUI assetNameText;
    [SerializeField] private TextMeshProUGUI mintNumberText;

    public void OnPointerEnter(PointerEventData eventData)
    {
        selectionBoardImage.SetActive(true);
    }

    public void OnPointerExit(PointerEventData eventData)
    {
        if(!isClicked)
        {
            selectionBoardImage.SetActive(false);
        }
    }
    public void OnPointerClick(PointerEventData pointerEventData)
    {
        isClicked = isClicked ? false : true;

    }

    public bool IsClicked()
    {
        return isClicked;
    }

    public void SetAssetNameText(string text)
    {
        assetNameText.text = text;
    }

    public void SetMintNumberText(string text)
    {
        mintNumberText.text = text;
    }
}
