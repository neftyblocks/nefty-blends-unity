using System.Collections;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.Rendering;

/// <summary>
/// This class manages the behavior of the blend UI elements .
/// </summary>
public class BlendUIElementController : MonoBehaviour, IPointerEnterHandler, IPointerExitHandler, IPointerClickHandler
{
    [SerializeField] private GameObject selectionBoardImage;
    [SerializeField] private GameObject playSound;
    public delegate void UserSelectedBlendInEventHandler(int blendId);
    public static event UserSelectedBlendInEventHandler UserSelectedBlend;
    private const float TooltipDelay = 0.05f; // tooltip delay time in seconds
    private Coroutine tooltipCoroutine; // reference to tooltip coroutine

    private void Start()
    {
        playSound = GameObject.Find("Audio Source");
    }

    public void OnPointerEnter(PointerEventData eventData)
    {
        ShowSelectionBoard();
        tooltipCoroutine = StartCoroutine(ShowTooltipAfterDelay(TooltipDelay));
    }

    public void OnPointerExit(PointerEventData eventData)
    {
        HideSelectionBoard();
        if (tooltipCoroutine != null)
        {
            StopCoroutine(tooltipCoroutine);
            tooltipCoroutine = null;
        }
        HideTooltip();
    }

    public void OnPointerClick(PointerEventData pointerEventData)
    {
        PlayButtonClickSound();
        HideTooltip();
        NotifyUserSelection();
    }

    private IEnumerator ShowTooltipAfterDelay(float delay)
    {
        yield return new WaitForSeconds(delay);
        ShowTooltip();
    }

    private void ShowTooltip()
    {
        TooltipManager.tooltipManager.SetAndShowShowTooltip(gameObject.GetComponent<BlendNFT>().GetBlendName());
    }

    private void HideTooltip()
    {
        TooltipManager.tooltipManager.HideTooltip();
    }

    private void ShowSelectionBoard()
    {
        selectionBoardImage.SetActive(true);
    }

    private void HideSelectionBoard()
    {
        selectionBoardImage.SetActive(false);
    }

    private void PlayButtonClickSound()
    {
        playSound.GetComponent<ButtonSound>().PlayButtonSound();
    }

    private void NotifyUserSelection()
    {
        int blendId = gameObject.GetComponent<BlendNFT>().GetBlendId();
        UserSelectedBlend(blendId);
    }
}
