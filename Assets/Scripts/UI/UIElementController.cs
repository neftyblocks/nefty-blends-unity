using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

/// <summary>
/// The UIElementController class manages the UI element's interactions and state changes, 
/// including click and hover events, and updating the display text.
/// </summary>
public class UIElementController : MonoBehaviour, IPointerEnterHandler, IPointerExitHandler, IPointerClickHandler
{
    [SerializeField] private GameObject selectionBoardImage;
    [SerializeField] private bool isClicked;
    [SerializeField] private TextMeshProUGUI assetNameText;
    [SerializeField] private TextMeshProUGUI mintNumberText;

    private Dictionary<Transform, Color> originalColors = new Dictionary<Transform, Color>();

    void Awake()
    {
        // Store the original colors of all child images and texts
        foreach (Transform child in transform)
        {
            Image childImage = child.GetComponent<Image>();
            if (childImage != null)
            {
                originalColors[child] = childImage.color;
            }

            Text childText = child.GetComponent<Text>();
            if (childText != null)
            {
                originalColors[child] = childText.color;
            }
        }
    }


    public void OnPointerEnter(PointerEventData eventData)
    {
        GreyOutAsset(true);
    }

    public void OnPointerExit(PointerEventData eventData)
    {
        if(!isClicked)
        {
            GreyOutAsset(false);
        }
    }

    /// On mouse click, the UI element clicked status is toggled and the IngredientSelector's selected asset is updated.
    public void OnPointerClick(PointerEventData pointerEventData)
    {
        var ingredientSelector = GameObject.Find("IngredientSelector").GetComponent<IngredientSelector>();
        isClicked = !isClicked;
        if (isClicked)
        {
            CheckForMatchingAssetIdsInOtherRequirements();
            ingredientSelector.SetSelectedAsset(gameObject.GetComponent<NFT>().GetAssetId(), gameObject.GetComponent<NFT>().GetMintNumber());
            UpdateGreyedOutWindows();
        }
        else
        {

            CheckForMatchingAssetIdsInOtherRequirements();
            ingredientSelector.SetSelectedAsset(string.Empty, -1);
            UpdateGreyedOutWindows();
            // if selectedassetId that was clicked does not equal the one that is inside this gameobject then update this gameobject with the asset id that was previously selected in another requirement field.
            if (ingredientSelector.selectedRequirementObject.GetComponent<RequirementUIElementController>().selectedAssetId != gameObject.GetComponent<NFT>().GetAssetId())
            {
                GetComponent<UIElementController>().SetIsClicked(false);
                GetComponent<UIElementController>().GreyOutAsset(false);
                ingredientSelector.SetSelectedAsset(gameObject.GetComponent<NFT>().GetAssetId(), gameObject.GetComponent<NFT>().GetMintNumber());
            }

        }
    }

    // If assetId from another requirement field is taken it will remove greyed out field
    public void UpdateGreyedOutWindows()
    {
        var craftAsset = GameObject.Find("IngredientPopup-UI").GetComponent<CraftAssetPopupUI>();
        craftAsset.DisplayBeingSelected();
    }

    // if there are other matching assetids set them as empty
    private void CheckForMatchingAssetIdsInOtherRequirements()
    {
        var currentAssetId = gameObject.GetComponent<NFT>().GetAssetId();
        var blendController = GameObject.Find("BlendController").GetComponent<BlendController>();
        var requirementPanel = blendController.requirementPanel;
        foreach (Transform child in requirementPanel.transform)
        {
            var requirementController = child.GetComponent<RequirementUIElementController>();
            if (requirementController != null && requirementController.selectedAssetId == currentAssetId)
            {
                requirementController.selectedAssetId = string.Empty;
                var textMeshPro = child.transform.Find("Selected_Ingredient_Background/SelectedIngredient").GetComponent<TextMeshProUGUI>();
                textMeshPro.text = string.Empty;
            }
        }
    }

    public void SetAssetNameText(string text)
    {
        assetNameText.text = text;
    }

    public void SetMintNumberText(string text)
    {
        mintNumberText.text = "#" + text;
    }

    public void SetIsClicked(bool condition)
    {
        isClicked = condition;
    }

    //Grey out asset to indicate that it is selected
    public void GreyOutAsset(bool toGrey)
    {
        foreach (KeyValuePair<Transform, Color> entry in originalColors)
        {
            Image childImage = entry.Key.GetComponent<Image>();
            if (childImage != null)
            {
                childImage.color = toGrey ? new Color(0.5f, 0.5f, 0.5f, 1) : entry.Value;
            }

            Text childText = entry.Key.GetComponent<Text>();
            if (childText != null)
            {
                childText.color = toGrey ? new Color(0.5f, 0.5f, 0.5f, 1) : entry.Value;
            }
        }

    }
}
