using TMPro;
using UnityEngine;

public interface IPopupOutputter
{
    void ShowSuccess();
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


    // Shows a success message in the UI if transaction goes through.
    public void ShowSuccess()
    {
        gameObject.transform.GetChild(0).gameObject.SetActive(true);
        confirmationPanelText.text = "Blend has been successful!";
    }

    // Shows an error message in the UI if transaction fails when submitting.
    public void ShowError(string error)
    {
        gameObject.transform.GetChild(0).gameObject.SetActive(true);
        confirmationPanelText.text = error;
    }

    public void CloseWindow()
    {
        confirmationPanelUI.SetActive(false);
    }
}
