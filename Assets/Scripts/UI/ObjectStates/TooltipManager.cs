using TMPro;
using UnityEngine;

public class TooltipManager : MonoBehaviour
{
    public static TooltipManager tooltipManager;
    public TextMeshProUGUI tooltipText;
    private Vector3 tooltipOffset = new Vector3(10, 10, 0);  // Offset tooltip to avoid covering the mouse

    void Awake()
    {
        if(tooltipManager != null && tooltipManager != this)
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
        transform.position = Input.mousePosition + tooltipOffset;
    }

    public void SetAndShowShowTooltip(string message)
    {
        gameObject.SetActive(true);
        tooltipText.text = message;
    }

    public void HideTooltip()
    {
        gameObject.SetActive(false);
        tooltipText.text= string.Empty;
    }
}
