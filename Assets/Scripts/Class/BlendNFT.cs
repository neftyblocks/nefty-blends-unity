using UnityEngine;

public class BlendNFT : MonoBehaviour
{
    [SerializeField] private int blendId;
    [SerializeField] private string contract;
    [SerializeField] private string blendName;

    public void SetBlendId(int blendId)
    {
        this.blendId = blendId;
    }
    public int GetBlendId()
    {
        return blendId;
    }

    public void SetBlendName(string blendName)
    {
        this.blendName = blendName;
    }
    public string GetBlendName()
    {
        return blendName;
    }
    public void SetContractName(string contract)
    {
        this.contract = contract;
    }
    public string GetContractName()
    {
        return contract;
    }
}
