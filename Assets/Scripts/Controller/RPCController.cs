using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class RPCController : MonoBehaviour
{
    [SerializeField] public TMP_Dropdown dropdown;
    [SerializeField] public SendTransactionJS sendTransactionJS;

    private void Start()
    {
        // Attach an event listener to the Dropdown's OnValueChanged event
        dropdown.onValueChanged.AddListener(OnDropdownValueChanged);
    }

    private void OnDropdownValueChanged(int value)
    {
        // Get the current value of the Dropdown
        string selectedOption = dropdown.options[value].text;

        // Log the selected option to the console
        Debug.Log("Selected option: " + selectedOption);
        sendTransactionJS.ChangeRPCEndpoint(selectedOption);
    }
}
