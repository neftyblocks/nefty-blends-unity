using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BlendController : MonoBehaviour
{
    [SerializeField] public GameObject requirementPanel;
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

    public void SubmitBlend()
    {
        if (CanBlend())
        {
            Debug.Log("All assets are selected.");
        }
        else
        {
            Debug.Log("User doesn't have all assets for blend");
        }
    }
}
