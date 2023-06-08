using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;

/// <summary>
/// InventoryElementState controls the behaviour of inventory elements with respect to mouse pointer events by displaying borders.
/// </summary>
public class InventoryElementState : MonoBehaviour, IPointerEnterHandler, IPointerExitHandler
{
    [SerializeField] private GameObject selectionBoardImage;
    [SerializeField] private bool isClicked;

    public void OnPointerEnter(PointerEventData eventData)
    {
        selectionBoardImage.SetActive(true);
    }

    public void OnPointerExit(PointerEventData eventData)
    {
        selectionBoardImage.SetActive(false);
    }
}


