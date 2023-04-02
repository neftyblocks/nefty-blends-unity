using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TemplateNFT : MonoBehaviour
{
    [SerializeField] private int templateId;

    public void SetTemplateId(int id)
    {
        templateId = id;
    }
    public int GetBlendId()
    {
        return templateId;
    }
}
