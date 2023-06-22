using UnityEngine;

public class TemplateNFT : MonoBehaviour
{
    [SerializeField] private int blendIngredientIndex;
    [SerializeField] private string requirementType;
    [SerializeField] private string requirementHash;
    [SerializeField] private string marketplaceLink;
    private FT fungibleToken;
    public void SetBlendIngredientIndex(int blendIngredientIndex)
    {
        this.blendIngredientIndex = blendIngredientIndex;
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
    public void SetRequirementHash(string requirementHash)
    {
        this.requirementHash = requirementHash;
    }
    public void SetRequirementType(string requirementType)
    {
        this.requirementType = requirementType;
    }
    public string GetRequirementType()
    {
        return requirementType;
    }
    public void SetFungibleToken(FT fungibleToken)
    {
        this.fungibleToken = fungibleToken;
    }
    public FT GetFungibleToken()
    {
        return fungibleToken;
    }
}
