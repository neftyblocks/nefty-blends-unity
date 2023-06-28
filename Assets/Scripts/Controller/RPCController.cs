using TMPro;
using UnityEngine;


/// <summary>
/// RPCController is responsible for handling the rpc change functionality.
/// </summary>
public class RPCController : MonoBehaviour
{
    [SerializeField] public TMP_Dropdown dropdown;
    [SerializeField] public SendTransactionJS sendTransactionJS;

    private void Start()
    {
        // Attach an event listener to the Dropdowns OnValueChanged event
        dropdown.onValueChanged.AddListener(OnDropdownValueChanged);
    }

    private void OnDropdownValueChanged(int value)
    {
        // Get the current value of the Dropdown
        string selectedOption = dropdown.options[value].text;
        sendTransactionJS.ChangeRPCEndpoint(selectedOption);
    }
}
