using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using UnityEngine;

public interface ISendTransactionJS
{
    void SendTransactionBlend(int blendId, string[] assetIds);
}
