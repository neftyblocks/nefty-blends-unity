using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TemplateNFT : MonoBehaviour
{
    [SerializeField] private int templateId;
    [SerializeField] private int blendIngredientIndex;

    public void SetTemplateId(int id)
    {
        templateId = id;
    }
    public int GetTemplateId()
    {
        return templateId;
    }

    public void SetBlendIngredientIndex(int id)
    {
        blendIngredientIndex = id;
    }
    public int GetBlendIngredientIndex()
    {
        return blendIngredientIndex;
    }
}
