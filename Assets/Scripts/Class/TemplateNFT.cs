using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TemplateNFT : MonoBehaviour
{
    [SerializeField] private int blendIngredientIndex;
    [SerializeField] private string requirementType;

    public void SetBlendIngredientIndex(int id)
    {
        blendIngredientIndex = id;
    }
    public int GetBlendIngredientIndex()
    {
        return blendIngredientIndex;
    }

    public void SetRequirementType(string type)
    {
        requirementType = type;
    }
    public string GetRequirementType()
    {
        return requirementType;
    }
}
