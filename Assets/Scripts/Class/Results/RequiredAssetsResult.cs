using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class RequiredAssetsResult
{
    public List<Sprite> requirementSprites { get; set; } = new List<Sprite>();
    public List<string> requirementText { get; set; } = new List<string>();
    public List<string> requirementType { get; set; } = new List<string>();
    public List<FT> fungibleToken { get; set; } = new List<FT>();
    public List<string> tokenContract { get; set; } = new List<string>();
    public List<int> requiredAssetAmount { get; set; } = new List<int>();
    public List<int> ingredientIndex { get; set; } = new List<int>();
    public List<int> templateId { get; set; } = new List<int>();

    
}
public class FT
{
    public int amount { get; set; }
    public int tokenPrecision { get; set; }
    public string contractName { get; set; }
    public string tokenSymbol { get; set; }

    public string GetFormattedAmount()
    {
        return (amount / Math.Pow(10, tokenPrecision)).ToString("0." + new string('0', tokenPrecision)) + " " + tokenSymbol;
    }

    public string GetFormattedTokenSymbol()
    {
        return tokenPrecision + "," + tokenSymbol;
    }
}

