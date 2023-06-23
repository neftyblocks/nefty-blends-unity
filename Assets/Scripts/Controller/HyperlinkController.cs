using System.Collections;
using UnityEngine;

public class HyperlinkController : MonoBehaviour
{
    public void OpenChannel()
    {
        var templateNFTComponent = transform.parent.GetComponent<TemplateNFT>();

        Application.OpenURL(templateNFTComponent.GetMarketplaceLink());
    }
    public void ToggleHyperlinkButton(bool isActive)
    {
        var button = gameObject.transform.Find("HyperlinkButton");
        button.gameObject.SetActive(isActive);
    }
}
