using UnityEngine;
using UnityEngine.EventSystems;

/// <summary>
/// This class manages the behavior of the blend UI elements inside the popup with respect to mouse pointer events.
/// </summary>
public class BlendUIElementController : MonoBehaviour, IPointerEnterHandler, IPointerExitHandler, IPointerClickHandler
{
    [SerializeField] private GameObject selectionBoardImage;
    [SerializeField] private bool isClicked;
    [SerializeField] private GameObject playSound;
    public delegate void UserSelectedBlendInEventHandler(int blendId);
    public static event UserSelectedBlendInEventHandler UserSelectedBlend;

    private void Start()
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
    public void OnPointerClick(PointerEventData pointerEventData)
    {
        playSound.GetComponent<ButtonSound>().PlayButtonSound();
        int blendId = gameObject.GetComponent<BlendNFT>().GetBlendId();
        UserSelectedBlend(blendId);
    }

    public bool IsClicked()
    {
        return isClicked;
    }
}
