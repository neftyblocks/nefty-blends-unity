using EosSharp.Core.Api.v1;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using UnityEngine;
using UniversalAuthenticatorLibrary;

public class TrasnferController : MonoBehaviour
{

    [SerializeField]DashboardController dashboardController;

    public async Task TransferAction()
    {
        List<string> assets = new List<string>();
        GameObject[] slotObjects = GameObject.FindGameObjectsWithTag("Asset");
        foreach (GameObject slotObject in slotObjects)
        {
            var slotScript = slotObject.GetComponent<NFT>();
            if (slotScript.GetComponent<UIElementController>().IsClicked()) {
                assets.Add(slotScript.GetAssetId());
            }
        }
        
        var action = new EosSharp.Core.Api.v1.Action
        {

            account = "atomicassets",
            name = "transfer",
            authorization = new List<PermissionLevel>
                {
                    new PermissionLevel()
                    {
                        actor =
                            "............1", 
                        permission =
                            "............2" 
                    }
                },

            data = new Dictionary<string, object>
                {
                    {"from", "test"},
                    {"to", "test"},
                    {"asset_ids", assets.ToArray()},
                    {"memo", "test"}
                }
        };
        try
        {

            await dashboardController.user.SignTransaction(new[] { action });
        }
        catch (Exception e)
        {
            Debug.Log(e);
            throw;
        }
    }

    public async void Transfer()
    {
        await TransferAction();
    }
}
