using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;

public class BlendUIElementController : MonoBehaviour, IPointerEnterHandler, IPointerExitHandler, IPointerClickHandler
{
    [SerializeField] public GameObject selectionBoardImage;
    [SerializeField] private Color hoverColor;
    [SerializeField] private Color selectedColor;
    [SerializeField] private bool isClicked;
    public delegate void UserSelectedBlendInEventHandler(int blendId);
    public static event UserSelectedBlendInEventHandler UserSelectedBlend;
    public void OnPointerEnter(PointerEventData eventData)
    {
        selectionBoardImage.SetActive(true);
    }

    public void OnPointerExit(PointerEventData eventData)
    {
        if (!isClicked)
        {
            selectionBoardImage.SetActive(false);
        }
    }
    public void OnPointerClick(PointerEventData pointerEventData)
    {
        int blendId = gameObject.GetComponent<BlendNFT>().GetBlendId();
        UserSelectedBlend(blendId);
    }

    public bool IsClicked()
    {
        return isClicked;
    }
}
