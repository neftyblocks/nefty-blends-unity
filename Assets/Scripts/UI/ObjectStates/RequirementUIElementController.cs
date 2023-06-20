using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;

/// <summary>
/// RequirementUIElementController controls the behaviour of inventory elements inside the popup with respect to mouse pointer events.
/// It manages selection borders and user interactions with inventory items.
/// </summary>
public class RequirementUIElementController : MonoBehaviour, IPointerEnterHandler, IPointerExitHandler, IPointerClickHandler
{
    [SerializeField] private GameObject playSound;
    [SerializeField] private GameObject selectionBoardImage;
    [SerializeField] private bool isClicked;
    public delegate void UserSelectedBlendInEventHandler(int ingredientIndex);
    public static event UserSelectedBlendInEventHandler UserSelectedIngredient;
    public delegate void UserSelectedGameobjectInEventHandler(GameObject game);
    public static event UserSelectedGameobjectInEventHandler UserSelectedGameobject;
    [SerializeField] public string selectedAssetId;

    public void Start()
    {
        playSound = GameObject.Find("Audio Source");
    }

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

    /// OnPointerClick is triggered when the user clicks on the GameObject.
    /// This method handles user selection of ingredients.
    public void OnPointerClick(PointerEventData pointerEventData)
    {
        if (gameObject.GetComponent<TemplateNFT>().GetRequirementType() != "FT_INGREDIENT")
        {
            playSound.GetComponent<ButtonSound>().PlayButtonSound();
            int ingredientIndex = gameObject.GetComponent<TemplateNFT>().GetBlendIngredientIndex();
            UserSelectedIngredient(ingredientIndex);
            UserSelectedGameobject(gameObject);
            GameObject.Find("IngredientSelector").GetComponent<IngredientSelector>().selectedRequirementObject = gameObject;
        }
    }

    public bool IsClicked()
    {
        return isClicked;
    }
}
