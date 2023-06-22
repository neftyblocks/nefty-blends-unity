using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TemplateNFT : MonoBehaviour
{
    [SerializeField] private int blendIngredientIndex;
    [SerializeField] private string requirementType;
    [SerializeField] private string requirementHash;
    [SerializeField] private string marketplaceLink;

    [SerializeField] private FT fungibleToken;
    public void SetBlendIngredientIndex(int id)
    {
        blendIngredientIndex = id;
    }
    public int GetBlendIngredientIndex()
    {
        return blendIngredientIndex;
    }
    public void SetMarketplaceLink(string marketplaceLink)
    {
        this.marketplaceLink = marketplaceLink;
    }
    public string GetMarketplaceLink()
    {
        return marketplaceLink;
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
