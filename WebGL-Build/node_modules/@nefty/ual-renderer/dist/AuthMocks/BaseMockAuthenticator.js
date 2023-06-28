"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseMockAuthenticator = void 0;
const universal_authenticator_library_1 = require("universal-authenticator-library");
class BaseMockAuthenticator extends universal_authenticator_library_1.Authenticator {
    init() {
        return Promise.resolve();
    }
    login() {
        return Promise.resolve([{}]);
    }
    getStyle() {
        return {
            text: 'Base Mock',
            textColor: 'black',
            background: 'background-color: green'
        };
    }
    getError() {
        return null;
    }
    getOnboardingLink() {
        return 'http://localhost';
    }
    isErrored() {
        return false;
    }
    isLoading() {
        return false;
    }
    reset() {
        console.info('reset base mock authenticator');
    }
    shouldRender() {
        return true;
    }
    shouldAutoLogin() {
        return false;
    }
    shouldRequestAccountName() {
        return Promise.resolve(false);
    }
    logout() {
        return Promise.resolve();
    }
    requiresGetKeyConfirmation() {
        return false;
    }
    getName() {
        return 'authenticator';
    }
}
exports.BaseMockAuthenticator = BaseMockAuthenticator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZU1vY2tBdXRoZW50aWNhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0F1dGhNb2Nrcy9CYXNlTW9ja0F1dGhlbnRpY2F0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUZBQWtGO0FBRWxGLE1BQWEscUJBQXNCLFNBQVEsK0NBQWE7SUFDL0MsSUFBSTtRQUNULE9BQU8sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQzFCLENBQUM7SUFDTSxLQUFLO1FBQ1YsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFXLENBQUMsQ0FBQTtJQUN4QyxDQUFDO0lBQ00sUUFBUTtRQUNiLE9BQU87WUFDTCxJQUFJLEVBQUUsV0FBVztZQUNqQixTQUFTLEVBQUUsT0FBTztZQUNsQixVQUFVLEVBQUUseUJBQXlCO1NBQ3ZCLENBQUE7SUFDbEIsQ0FBQztJQUNNLFFBQVE7UUFDYixPQUFPLElBQUksQ0FBQTtJQUNiLENBQUM7SUFDTSxpQkFBaUI7UUFDdEIsT0FBTyxrQkFBa0IsQ0FBQTtJQUMzQixDQUFDO0lBQ00sU0FBUztRQUNkLE9BQU8sS0FBSyxDQUFBO0lBQ2QsQ0FBQztJQUNNLFNBQVM7UUFDZCxPQUFPLEtBQUssQ0FBQTtJQUNkLENBQUM7SUFDTSxLQUFLO1FBQ1YsT0FBTyxDQUFDLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxDQUFBO0lBQy9DLENBQUM7SUFDTSxZQUFZO1FBQ2pCLE9BQU8sSUFBSSxDQUFBO0lBQ2IsQ0FBQztJQUNNLGVBQWU7UUFDcEIsT0FBTyxLQUFLLENBQUE7SUFDZCxDQUFDO0lBQ00sd0JBQXdCO1FBQzdCLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUMvQixDQUFDO0lBQ00sTUFBTTtRQUNYLE9BQU8sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQzFCLENBQUM7SUFDTSwwQkFBMEI7UUFDL0IsT0FBTyxLQUFLLENBQUE7SUFDZCxDQUFDO0lBQ00sT0FBTztRQUNaLE9BQU8sZUFBZSxDQUFBO0lBQ3hCLENBQUM7Q0FDRjtBQS9DRCxzREErQ0MifQ==