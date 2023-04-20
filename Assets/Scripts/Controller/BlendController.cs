using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BlendController : MonoBehaviour
{
    [SerializeField] public GameObject requirementPanel;
    [SerializeField] public SendTransactionJS sendTransactionJS;
    [SerializeField] public CraftAssetPopupController craftAssetPopupController;
    public bool CanBlend()
    {
        foreach (Transform child in requirementPanel.transform)
        {
            if (child.GetComponent<TemplateUIElementController>().selectedAssetId == null || child.GetComponent<TemplateUIElementController>().selectedAssetId == "")
            {
                return false; // return false if any child is empty
            }
        }

        return true; 
    }

    public string[] GetSelectedAssetIds()
    {
        List<string> idsList = new List<string>();
        foreach (Transform child in requirementPanel.transform)
        {
            idsList.Add(child.GetComponent<TemplateUIElementController>().selectedAssetId);
        }

        return idsList.ToArray();
    }

    public void SubmitBlend()
    {
        if (CanBlend())
        {
            sendTransactionJS.SendTransactionBlend(craftAssetPopupController.currentBlendId, GetSelectedAssetIds());
        }
        else
        {
            Debug.Log("User doesn't have all assets for blend");
        }
    }
}
