using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TemplateNFT : MonoBehaviour
{
    [SerializeField] private int blendIngredientIndex;
    [SerializeField] private string requirementType;
    [SerializeField] private string requirementHash;
    [SerializeField] private FT fungibleToken;
    public void SetBlendIngredientIndex(int id)
    {
        blendIngredientIndex = id;
    }
    public int GetBlendIngredientIndex()
    {
        return blendIngredientIndex;
    }
    public string GetRequirementHash()
    {
        return requirementHash;
    }
    public void SetRequirementHash(string hash)
    {
        requirementHash = hash;
    }
    public void SetRequirementType(string type)
    {
        requirementType = type;
    }
    public string GetRequirementType()
    {
        return requirementType;
    }
    public void SetFungibleToken(FT ft)
    {
        fungibleToken = ft;
    }
    public FT GetFungibleToken()
    {
        return fungibleToken;
    }
}
