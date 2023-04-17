using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using UnityEngine;

public class JS : MonoBehaviour
{
    [DllImport("__Internal")]
    private static extern void Hello(int blend_id, string[] asset_ids, int count);

    [DllImport("__Internal")]
    private static extern void HelloString(string str);

    [DllImport("__Internal")]
    private static extern void PrintFloatArray(float[] array, int size);

    [DllImport("__Internal")]
    private static extern int AddNumbers(int x, int y);

    [DllImport("__Internal")]
    private static extern string StringReturnValueFunction();

    [DllImport("__Internal")]
    private static extern void StringArray(string[] array, int size);

    void Start()
    {

    }

    public void Test()
    {
        string[] myArray = new string[] { "123", "124", "124" }; 
        Hello(123, myArray, myArray.Length);
    
    }
}
