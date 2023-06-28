using TMPro;
using UnityEngine;

public class TooltipManager : MonoBehaviour
{
    public static TooltipManager tooltipManager;
    public TextMeshProUGUI tooltipText;
    public RectTransform tooltipRect;  // reference to the RectTransform component of your tooltip
    private Vector3 tooltipOffset = new Vector3(10, 10, 0);  // Offset tooltip to avoid covering the mouse

    void Awake()
    {
        if (tooltipManager != null && tooltipManager != this)
        {
            Destroy(gameObject);
        }
        else
        {
            tooltipManager = this;
        }
    }

    void Start()
    {
        Cursor.visible = true;
        gameObject.SetActive(false);
    }

    private void Update()
    {
        Vector3 newPos = Input.mousePosition + tooltipOffset;

        // Make sure the tooltip is completely visible
        if (newPos.x + tooltipRect.rect.width > Screen.width)
        {
            newPos.x = Input.mousePosition.x - tooltipOffset.x - tooltipRect.rect.width;
        }
        if (newPos.y - tooltipRect.rect.height < 0)
        {
            newPos.y = Input.mousePosition.y + tooltipOffset.y + tooltipRect.rect.height;
        }

        transform.position = newPos;
    }

    public void SetAndShowShowTooltip(string message)
    {
        gameObject.SetActive(true);
        tooltipText.text = message;
    }

    public void HideTooltip()
    {
        gameObject.SetActive(false);
        tooltipText.text = string.Empty;
    }
}
