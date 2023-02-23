using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class CollectionUI : MonoBehaviour
{
    [SerializeField] public Sprite colletionImage;
    [SerializeField] GameObject collectionImageUI;

    public Sprite GetCollectionImage()
    {
        return colletionImage; 
    }

    public void SetCollectionImage(Sprite image)
    {
        collectionImageUI.GetComponent<Image>().sprite = image;
    }
}