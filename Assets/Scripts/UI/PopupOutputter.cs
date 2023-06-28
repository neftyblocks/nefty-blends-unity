using TMPro;
using UnityEngine;
using UnityEngine.UI;

public interface IPopupOutputter
{
    void ShowSuccess(Sprite image,string rewardName);
    void ShowError(string error);
    void CloseWindow();
}

/// <summary>
/// The PopupOutputter class handles the UI elements and actions related to event outputs when submitting for instance when transactions to the blockchain.
/// It manages the confirmation panel, confirmation panel text, and provides methods to show success, show error, and close the window.
/// </summary>
public class PopupOutputter : MonoBehaviour, IPopupOutputter
{
    [SerializeField]public GameObject confirmationPanelUI;
    [SerializeField] public TextMeshProUGUI confirmationPanelText;
    [SerializeField] public GameObject confirmationPanelReward;

    // Shows a success message in the UI if transaction goes through.
    public void ShowSuccess(Sprite image, string rewardName)
    {
        gameObject.transform.GetChild(0).gameObject.SetActive(true);

        if (rewardName == "burn")
        {
            confirmationPanelText.text = "Sadly, you burned NFTs!";
        }
        else
        {
            confirmationPanelText.text = $"You crafted {rewardName}!";
        }

        confirmationPanelReward.GetComponent<Image>().sprite = image;
    }


    // Shows an error message in the UI if transaction fails when submitting.
    public void ShowError(string error)
    {
        gameObject.transform.GetChild(0).gameObject.SetActive(true);
        confirmationPanelText.text = error;
        confirmationPanelReward.GetComponent<Image>().sprite = Resources.Load<Sprite>("UI/Empty_Image");
    }

    public void CloseWindow()
    {
        confirmationPanelUI.SetActive(false);
    }
}
