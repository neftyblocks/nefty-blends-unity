var WombatUnityWebGlPlugin =  {
    $wombatWebglState: {
        network: null,
        appName: null,
        rpcEndpoint: null,
        OnLogin: null,
        OnSign: null,
        OnError: null,
        Debug: true
    },

    WombatInit: async function (appNameString, networkJsonString, rpcEndpointString){
        if(wombatWebglState.Debug){
            console.log("init called");
        }

        var msg = "";
        var error = false;

        try {
            const appName = UTF8ToString(appNameString);
            const networkJson = JSON.parse(UTF8ToString(networkJsonString));
            const rpcEndpoint = UTF8ToString(rpcEndpointString);

            const connected = await window.scatter.connect(appName);
            wombatWebglState.scatter = window.scatter;

            wombatWebglState.network = networkJson;
            wombatWebglState.appName = appName;
            wombatWebglState.rpcEndpoint = rpcEndpoint;

            if(!connected) {
                msg = "Connection failed";
                error = true;
            }
            else if(wombatWebglState.Debug){
                console.log("Wombat Initialized!");
            }
        } catch(e) {
            if(wombatWebglState.Debug){
                console.log(e.message);
            }
            error = true;
            msg = JSON.stringify({ message: e.message });
        }

        if(error){
		    var length = lengthBytesUTF8(msg) + 1;
		    var buffer = _malloc(length);
		    stringToUTF8(msg, buffer, length);

		    try {
			    Module.dynCall_vi(wombatWebglState.OnError, buffer);
		    } finally {
			    _free(buffer);
		    }
        }
    },

    WombatLogin: async function () {
        if(wombatWebglState.Debug){
            console.log("Login called");        
        }

        var msg = "";
        var error = false;

        try {

            const rpcEndpoint = wombatWebglState.rpcEndpoint;
            const identity = await this.scatter.getIdentity({
                accounts: [wombatWebglState.network]
            });

            msg = JSON.stringify({ account: identity.accounts[0].name, public_key: identity.accounts[0].publicKey });
        } catch(e) {
            if(wombatWebglState.Debug){
                console.log(e.message);
            }
            error = true;
            msg = JSON.stringify({ message: e.message });

            const origin = window.location.href;
            window.open('https://app.getwombat.io/dapp-view?url=' + origin);
        }

        var length = lengthBytesUTF8(msg) + 1;
		var buffer = _malloc(length);
		stringToUTF8(msg, buffer, length);

		try {
            if(error)
	            Module.dynCall_vi(wombatWebglState.OnError, buffer);
            else
                Module.dynCall_vi(wombatWebglState.OnLogin, buffer);
		} finally {
			_free(buffer);
        }
    },

    WombatSign: async function (actionDataJsonString) {
        if(wombatWebglState.Debug){
            console.log("Sign called");        
            console.log(UTF8ToString(actionDataJsonString));
        }

        var msg = "";
        var error = false;

        if(!wombatWebglState.scatter) {
            msg = JSON.stringify({ message: "Login First!" });
            error = true;
        }

        if(!error){
            const actionDataJson = JSON.parse(UTF8ToString(actionDataJsonString));
            try {

                const rpc = new eosjs_jsonrpc.default(wombatWebglState.rpcEndpoint);
                const eos = wombatWebglState.scatter.eos(wombatWebglState.network, eosjs_api.default, {rpc});

                const result = await eos.transact({
                    actions: actionDataJson
                },
                {
                    blocksBehind: 3,
                    expireSeconds: 30
                });

                var msg = JSON.stringify({ result: result });
				console.log(msg);
			    var length = lengthBytesUTF8(msg) + 1;
			    var buffer = _malloc(length);
			    stringToUTF8(msg, buffer, length);

			    try {
				    Module.dynCall_vi(wombatWebglState.OnSign, buffer);
			    } finally {
				    _free(buffer);
			    }
                return;
            } catch(e) {
                if(wombatWebglState.Debug){
                    console.log(e.message);
                }
                error = true;
                msg = JSON.stringify({ message: e.message });
            }
        }

        var length = lengthBytesUTF8(msg) + 1;
		var buffer = _malloc(length);
		stringToUTF8(msg, buffer, length);

		try {
            if(error)
	            Module.dynCall_vi(wombatWebglState.OnError, buffer);
            else
                Module.dynCall_vi(wombatWebglState.OnLogin, buffer);
		} finally {
			_free(buffer);
        }
    },

    WombatSetOnLogin: function (callback) {
        if(wombatWebglState.Debug){
            console.log("WombatSetOnLogin called");        
        }
        wombatWebglState.OnLogin = callback;
    },

    WombatSetOnSign: function (callback) {
        if(wombatWebglState.Debug){
            console.log("WombatSetOnSign called");        
        }
        wombatWebglState.OnSign = callback;
    },

    WombatSetOnError: function (callback) {
        if(wombatWebglState.Debug){
            console.log("WombatSetOnError called");        
        }
        wombatWebglState.OnError = callback;
    },

};

autoAddDeps(WombatUnityWebGlPlugin, '$wombatWebglState');
mergeInto(LibraryManager.library, WombatUnityWebGlPlugin);
