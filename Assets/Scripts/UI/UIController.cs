using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class UIController : MonoBehaviour
{
    private string textPrimary = "PrimaryText";
    [SerializeField] private TextMeshProUGUI[] textPrimaryArray;
    [SerializeField] private Color primaryColor;
    private void Awake()
    {
        TextMeshProUGUI[] foundObjects = GameObject.FindObjectsOfType<TextMeshProUGUI>();

        foreach (TextMeshProUGUI textObject in foundObjects)
        {
            if (textObject.CompareTag(textPrimary))
            {
                textObject.color = primaryColor;
/*                textObject.font = font;
*/            }
        }
    }

    public void ChangeFont(TextMeshProUGUI[] array, TMP_FontAsset font)
    {
        foreach (var arrayObject in array)
        {
            arrayObject.font = font;
        }
    }

    public void ChangeColor(TextMeshProUGUI[] array, Color color)
    {
        foreach (var arrayObject in array)
        {
            arrayObject.color = color;
        }
    }
}
