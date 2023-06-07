using TMPro;
using UnityEngine;

/// <summary>
/// The IngredientSelector class is responsible for managing and setting the chosen asset in a selectedRequirementObject. 
/// This involves not just setting the asset ID, but also updating the associated UI text component to reflect the selected asset's ID. 
/// </summary>
public class IngredientSelector : MonoBehaviour
{
    // This is the SelectedRequirementObject that is currently being managed by this IngredientSelector instance.
    public GameObject selectedRequirementObject { get; set; }

    // SetSelectedAsset updates the chosen asset for the selectedRequirementObject by updating both the internal 
    // asset ID and the visible asset ID in the corresponding UI text element.
    public void SetSelectedAsset(string assetId)
    {
        selectedRequirementObject.GetComponent<TemplateUIElementController>().selectedAssetId = assetId;
        selectedRequirementObject.transform.Find("Selected_Ingredient_Background/SelectedIngredient").GetComponent<TextMeshProUGUI>().text = assetId;
    }
}
