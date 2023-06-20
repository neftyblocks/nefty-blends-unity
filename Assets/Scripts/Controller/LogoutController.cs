using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class LogoutController : MonoBehaviour
{
    [SerializeField] public bool isToggled = true;
    [SerializeField] public GameObject logoutButton;
    [SerializeField] public SendTransactionJS sendTransactionJS;

    private void Start()
    {
        ToggleLogoutButton();
        sendTransactionJS = GameObject.Find("Javascript-Wrapper").GetComponent<SendTransactionJS>();
    }
    public void ToggleLogoutButton()
    {
        isToggled = !isToggled;
        logoutButton.SetActive(isToggled);
    }
    public void Logout()
    {
        sendTransactionJS.Logout();
    }
}
