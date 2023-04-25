using UnityEngine;
using UnityEngine.UI;

public class CollectionUI : MonoBehaviour
{
    [SerializeField] private Sprite colletionImage;
    [SerializeField] private GameObject collectionImageUI;
    [SerializeField] private CollectionFetcherController collectionFetcherController;

    async void Start()
    {
        DisplayCollectionImage(await collectionFetcherController.GetCollectionImageURL());   
    }
    public Sprite GetCollectionImage()
    {
        return colletionImage; 
    }

    public void DisplayCollectionImage(Sprite image)
    {
        collectionImageUI.GetComponent<Image>().sprite = image;
    }
}