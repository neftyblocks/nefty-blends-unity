using TMPro;
using UnityEngine;
using UnityEngine.UI;

/// <summary>
/// The UIController class manages various UI elements and provides methods to change colors, fonts, and sprites.
/// Inside Hierarchy under UIController you can change elements inside the Inspector
/// </summary>
public class UIController : MonoBehaviour
{
    private string textPrimary = "PrimaryText";
    private string primaryImage = "PrimaryImage";
    private string secondaryImage = "SecondaryImage";

    private string primaryBackground = "PrimaryBackground";
    private string secondaryBackground = "SecondaryBackground";
    private string tertiaryBackground = "TertiaryBackground";

    [SerializeField] private Sprite primaryButtonSprite;
    [SerializeField] private Sprite secondaryButtonSprite;
    [SerializeField] private Sprite primaryBackgroundSprite;
    [SerializeField] private Sprite secondaryBackgroundSprite;
    [SerializeField] private Sprite tertiaryBackgroundSprite;
    [SerializeField] private Color prefabColor;


    [SerializeField] private Color primaryTextColor;
    [SerializeField] private Color primaryButtonColor;
    [SerializeField] private Color secondaryButtonColor;
    [SerializeField] private bool setToDefault;
    [SerializeField] bool toggleDebugging;
    [SerializeField] GameObject debugButton;



    private void Awake()
    {
        IsDebugEnabled();
        if (!setToDefault)
        {
            ChangeColor(textPrimary, primaryTextColor);
            ChangeSprites(primaryImage, primaryButtonSprite, primaryButtonColor);
            ChangeSprites(primaryBackground, primaryBackgroundSprite, Color.white);
            ChangeSprites(secondaryBackground, secondaryBackgroundSprite, Color.white);
            ChangeSprites(tertiaryBackground, tertiaryBackgroundSprite, Color.white);
            ChangeSprites(secondaryImage, secondaryButtonSprite, secondaryButtonColor);
        }
    }

    public void ChangeFont(TextMeshProUGUI[] array, TMP_FontAsset font)
    {
        foreach (var arrayObject in array)
        {
            arrayObject.font = font;
        }
    }

    private void IsDebugEnabled()
    {
        debugButton.SetActive(toggleDebugging);
    }

    private void ChangeColor(string objectTag, Color color)
    {
        var foundObjects = GameObject.FindGameObjectsWithTag(objectTag);

        foreach (var foundObject in foundObjects)
        {
            foundObject.GetComponent<TextMeshProUGUI>().color = color;
        }
    }

    private void ChangeSprites(string objectTag, Sprite newSprite,Color color)
    {
        var foundObjects = GameObject.FindGameObjectsWithTag(objectTag);

        foreach (var foundObject in foundObjects)
        {
            Image image = foundObject.GetComponent<Image>();
            if (image != null)
            {
                image.sprite = newSprite;
                image.color = color;
            }
        }
    }

    public void ChangePrefabColor()
    {
        if (!setToDefault)
        {
            var prefabTag = "Prefab";
            var foundObjects = GameObject.FindGameObjectsWithTag(prefabTag);

            foreach (var foundObject in foundObjects)
            {
                Image image = foundObject.GetComponent<Image>();
                if (image != null)
                {
                    image.color = prefabColor;
                }
            }
        }
    }
}
