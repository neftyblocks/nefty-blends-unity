using System;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Threading;
using UnityEngine;
using UnityEngine.Rendering;

public class BlendNFT : MonoBehaviour
{
    [SerializeField] private int blendId;
    [SerializeField] private string contract;
    [SerializeField] private string blendName;

    public void SetBlendId(int id)
    {
        blendId = id;
    }
    public int GetBlendId()
    {
        return blendId;
    }

    public void SetBlendName(string name)
    {
        blendName = name;
    }
    public string GetBlendName()
    {
        return blendName;
    }
    public void SetContractName(string contractName)
    {
        contract = contractName;
    }
    public string GetContractName()
    {
        return contract;
    }
}
