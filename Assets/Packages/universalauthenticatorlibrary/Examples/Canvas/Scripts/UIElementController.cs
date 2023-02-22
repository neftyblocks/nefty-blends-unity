using UnityEngine;
using UnityEngine.UI;
using UnityEngine.EventSystems;

public class UIElementController : MonoBehaviour, IPointerEnterHandler, IPointerExitHandler, IPointerClickHandler
{
    [SerializeField] public GameObject slotImage;
    [SerializeField] public GameObject selectionBoardImage;
    [SerializeField] private Color baseColor;
    [SerializeField] private Color hoverColor;
    [SerializeField] private Color selectedColor;

    void Start()
    {
/*        baseColor = slotImage.GetComponent<Image>().color;
*/    }

    public void OnPointerEnter(PointerEventData eventData)
    {
    /*    slotImage.GetComponent<Image>().color = hoverColor;
        selectionBoardImage.SetActive(true);*/
    }

    public void OnPointerExit(PointerEventData eventData)
    {
/*        slotImage.GetComponent<Image>().color = baseColor;
        selectionBoardImage.SetActive(false);*/

    }
    public void OnPointerClick(PointerEventData pointerEventData)
    {
        /*Debug.Log(gameObject);
        slotImage.GetComponent<Image>().color = selectedColor;
        selectionBoardImage.SetActive(true);*/
    }

    public void SetLoadingImage(bool condition)
    {
        Debug.Log(slotImage+" "+condition);
        slotImage.SetActive(condition);
    }
}
