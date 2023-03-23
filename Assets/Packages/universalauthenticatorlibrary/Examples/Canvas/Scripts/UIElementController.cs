using UnityEngine;
using UnityEngine.UI;
using UnityEngine.EventSystems;

public class UIElementController : MonoBehaviour, IPointerEnterHandler, IPointerExitHandler, IPointerClickHandler
{
    [SerializeField] public GameObject slotImage;
    [SerializeField] public string assetId;
    [SerializeField] public GameObject selectionBoardImage;
    [SerializeField] private Color hoverColor;
    [SerializeField] private Color selectedColor;
    [SerializeField] private bool isClicked;
    [SerializeField] private Sprite loadingImage;

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

    public GameObject GetSlotImage()
    {
        return slotImage;
    }

    public string GetAssetId()
    {
        return assetId;
    }
    public bool IsClicked()
    {
        return isClicked;
    }
}
