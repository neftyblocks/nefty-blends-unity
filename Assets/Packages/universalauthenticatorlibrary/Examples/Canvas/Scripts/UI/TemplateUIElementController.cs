using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;

public class TemplateUIElementController : MonoBehaviour, IPointerEnterHandler, IPointerExitHandler, IPointerClickHandler
{
    [SerializeField] public GameObject selectionBoardImage;
    [SerializeField] private bool isClicked;
    public delegate void UserSelectedBlendInEventHandler(int ingredientIndex);
    public static event UserSelectedBlendInEventHandler UserSelectedIngredient;

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
        int ingredientIndex = gameObject.GetComponent<TemplateNFT>().GetBlendIngredientIndex();
        UserSelectedIngredient(ingredientIndex);
    }

    public bool IsClicked()
    {
        return isClicked;
    }
}
