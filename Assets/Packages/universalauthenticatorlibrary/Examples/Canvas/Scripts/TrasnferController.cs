using EosSharp.Core.Api.v1;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using UnityEditor.Graphs;
using UnityEngine;
using UniversalAuthenticatorLibrary;
using UniversalAuthenticatorLibrary.Examples.Canvas;

public class TrasnferController : MonoBehaviour
{

    [SerializeField]UALCanvasExample uALCanvasExample;

    public async Task TransferAction()
    {    
        List<string> assets = new List<string>();
        GameObject[] slotObjects = GameObject.FindGameObjectsWithTag("Asset");
        foreach (GameObject slotObject in slotObjects)
        {
            var slotScript = slotObject.GetComponent<UIElementController>();
            if (slotScript.IsClicked()) {
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
                            "............1", // ............1 will be resolved to the signing accounts permission
                        permission =
                            "............2" // ............2 will be resolved to the signing accounts authority
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
            await uALCanvasExample.GetUser().SignTransaction(new[] { action });
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
