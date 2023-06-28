"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("jest-localstorage-mock");
const promise_1 = __importDefault(require("promise"));
const UALJs_1 = require("./UALJs");
const AutologinAuthenticator_1 = require("./AuthMocks/AutologinAuthenticator");
const BaseMockAuthenticator_1 = require("./AuthMocks/BaseMockAuthenticator");
const InvalidateAuthenticator_1 = require("./AuthMocks/InvalidateAuthenticator");
jest.useFakeTimers();
// jest.useFakeTimers() changes the order in which promises are run
// Issue: https://github.com/facebook/jest/pull/6876
// Workaround: https://github.com/facebook/jest/issues/7151
global.Promise = promise_1.default;
describe('Authenticators', () => {
    let containerElement;
    let ual;
    let authenticator;
    let login;
    let isLoading;
    beforeEach(() => {
        localStorage.clear();
        authenticator = new BaseMockAuthenticator_1.BaseMockAuthenticator([], null);
        login = jest.fn().mockResolvedValue([{}]);
        isLoading = jest.fn().mockReturnValue(false);
        authenticator.login = login;
        authenticator.isLoading = isLoading;
        document.body.innerHTML = `
      <div id="buttonContainer"></div>
    `;
        containerElement = document.getElementById('buttonContainer');
        ual = createNewUALJs(authenticator, containerElement);
    });
    afterEach(() => {
        localStorage.clear();
        document.body.innerHTML = '';
    });
    it('throw error when no autologin authenticators are provided', () => {
        let errorThrown = true;
        try {
            ual = new UALJs_1.UALJs((users) => { console.info('users', users); }, [], 'my cool app', []);
            ual.init();
            errorThrown = false;
        }
        catch (e) {
            expect(e.message).toBe('Render Configuration is required when no auto login authenticator is provided');
            errorThrown = true;
        }
        expect(errorThrown).toBeTruthy();
    });
    describe('login', () => {
        it('calls login with provided authenticator', () => __awaiter(void 0, void 0, void 0, function* () {
            ual.init();
            yield ual.loginUser(authenticator);
            expect(authenticator.login).toBeCalledTimes(1);
        }));
        it('does not login if authenticator is still loading', () => {
            authenticator.isLoading = jest.fn().mockReturnValue(true);
            ual = createNewUALJs(authenticator, containerElement);
            ual.init();
            ual.loginUser(authenticator);
            expect(authenticator.isLoading).toHaveBeenCalled();
            expect(authenticator.login).not.toHaveBeenCalled();
        });
        it('eventually logs in once authenticator is no longer loading', () => __awaiter(void 0, void 0, void 0, function* () {
            authenticator.isLoading = jest.fn().mockReturnValue(true);
            ual = createNewUALJs(authenticator, containerElement);
            ual.init();
            const promise = ual.loginUser(authenticator);
            jest.advanceTimersByTime(250);
            expect(authenticator.isLoading).toHaveBeenCalled();
            expect(authenticator.login).not.toHaveBeenCalled();
            authenticator.isLoading = jest.fn().mockReturnValue(false);
            jest.advanceTimersByTime(250);
            yield promise;
            expect(authenticator.login).toHaveBeenCalled();
        }));
        describe('error is thrown by authenticator', () => {
            const loginError = new Error('Login Error');
            beforeEach(() => {
                authenticator.login = jest.fn().mockImplementation(() => { throw loginError; });
                console.error = jest.fn();
            });
            it('throws original caught error', () => __awaiter(void 0, void 0, void 0, function* () {
                let didThrow = true;
                try {
                    ual.init();
                    yield ual.loginUser(authenticator);
                    didThrow = false;
                }
                catch (error) {
                    expect(console.error).toHaveBeenCalled();
                    expect(error).toEqual(loginError);
                }
                expect(didThrow).toBe(true);
            }));
            it('clears session keys', () => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    ual.init();
                    yield ual.loginUser(authenticator);
                }
                catch (error) {
                    expect(console.error).toHaveBeenCalled();
                    expect(error).toEqual(loginError);
                }
                expect(localStorage.getItem('ual-session-expiration')).toBeNull();
                expect(localStorage.getItem('ual-session-authenticator')).toBeNull();
                expect(localStorage.getItem('ual-session-account-name')).toBeNull();
            }));
        });
    });
    describe('logout', () => {
        it('clears session keys', () => __awaiter(void 0, void 0, void 0, function* () {
            authenticator.shouldRequestAccountName = jest.fn().mockResolvedValue(true);
            ual = createNewUALJs(authenticator, containerElement);
            ual.init();
            yield ual.loginUser(authenticator, 'mycoolUser');
            yield ual.logoutUser();
            expect(localStorage.getItem('ual-session-expiration')).toBeNull();
            expect(localStorage.getItem('ual-session-authenticator')).toBeNull();
            expect(localStorage.getItem('ual-session-account-name')).toBeNull();
        }));
        it('calls logout on the authenticator provided', () => __awaiter(void 0, void 0, void 0, function* () {
            authenticator = new BaseMockAuthenticator_1.BaseMockAuthenticator([], null);
            authenticator.logout = jest.fn().mockResolvedValue(true);
            ual = createNewUALJs(authenticator, containerElement);
            ual.init();
            yield ual.loginUser(authenticator, 'mycoolUser');
            yield ual.logoutUser();
            expect(authenticator.logout).toHaveBeenCalled();
        }));
    });
    describe('session login', () => {
        it('does not login automatically when there is not a stored session state', () => __awaiter(void 0, void 0, void 0, function* () {
            ual.init();
            yield runPromises();
            expect(authenticator.login).not.toHaveBeenCalled();
        }));
        it('logs in for non account name required', () => __awaiter(void 0, void 0, void 0, function* () {
            const invalidateSeconds = authenticator.shouldInvalidateAfter();
            const invalidateAt = new Date();
            invalidateAt.setSeconds(invalidateAt.getSeconds() + invalidateSeconds);
            localStorage.setItem('ual-session-expiration', invalidateAt.toString());
            localStorage.setItem('ual-session-authenticator', authenticator.constructor.name);
            ual.init();
            yield runPromises();
            expect(authenticator.login).toHaveBeenCalled();
        }));
        it('logs in for account name required', () => __awaiter(void 0, void 0, void 0, function* () {
            authenticator.shouldRequestAccountName = jest.fn().mockResolvedValue(true);
            ual = createNewUALJs(authenticator, containerElement);
            const invalidateSeconds = authenticator.shouldInvalidateAfter();
            const invalidateAt = new Date();
            invalidateAt.setSeconds(invalidateAt.getSeconds() + invalidateSeconds);
            localStorage.setItem('ual-session-expiration', invalidateAt.toString());
            localStorage.setItem('ual-session-authenticator', authenticator.constructor.name);
            localStorage.setItem('ual-session-account-name', 'reqacctname');
            ual.init();
            yield runPromises();
            expect(authenticator.login).toHaveBeenCalledWith('reqacctname');
        }));
        it('are set on login when account name is not required', () => __awaiter(void 0, void 0, void 0, function* () {
            ual.init();
            yield ual.loginUser(authenticator);
            expect(localStorage.getItem('ual-session-expiration')).not.toBeNull();
            expect(localStorage.getItem('ual-session-authenticator')).toEqual(authenticator.constructor.name);
        }));
        it('are set on login when account name is required', () => __awaiter(void 0, void 0, void 0, function* () {
            authenticator.shouldRequestAccountName = jest.fn().mockResolvedValue(true);
            ual = createNewUALJs(authenticator, containerElement);
            ual.init();
            yield ual.loginUser(authenticator, 'mycoolUser');
            expect(localStorage.getItem('ual-session-expiration')).not.toBeNull();
            expect(localStorage.getItem('ual-session-authenticator')).toEqual(authenticator.constructor.name);
            expect(localStorage.getItem('ual-session-account-name')).toEqual('mycoolUser');
        }));
    });
    describe('autologin', () => {
        it('logs in when an autologin authenticator is provided', () => __awaiter(void 0, void 0, void 0, function* () {
            authenticator = new AutologinAuthenticator_1.AutologinAuthenticator([], null);
            authenticator.login = login;
            ual = createNewUALJs(authenticator, containerElement);
            ual.init();
            yield runPromises();
            expect(authenticator.login).toBeCalledTimes(1);
        }));
        it('does not log in when an autologin authenticator is not provided', () => __awaiter(void 0, void 0, void 0, function* () {
            authenticator = new BaseMockAuthenticator_1.BaseMockAuthenticator([], null);
            authenticator.login = login;
            ual = createNewUALJs(authenticator, containerElement);
            ual.init();
            yield runPromises();
            expect(authenticator.login).not.toBeCalled();
        }));
    });
    describe('invalidate', () => {
        it('sets a short expiration that invalidates the next session', () => __awaiter(void 0, void 0, void 0, function* () {
            authenticator = new InvalidateAuthenticator_1.InvalidateAuthenticator([], null);
            authenticator.login = login;
            ual = createNewUALJs(authenticator, containerElement);
            ual.init();
            yield ual.loginUser(authenticator, 'mycoolUser');
            expect(localStorage.getItem('ual-session-expiration')).not.toBeNull();
            expect(localStorage.getItem('ual-session-authenticator')).toEqual(authenticator.constructor.name);
            expect(localStorage.getItem('ual-session-account-name')).toEqual('mycoolUser');
            ual = createNewUALJs(authenticator, containerElement);
            ual.init();
            yield runPromises();
            expect(localStorage.getItem('ual-session-expiration')).toBeNull();
            expect(localStorage.getItem('ual-session-authenticator')).toBeNull();
            expect(localStorage.getItem('ual-session-account-name')).toBeNull();
        }));
        it('invalidates on the second of ual-session-expiration instead of after', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockDate = new Date('2099-01-01T00:00:00');
            const realDate = Date;
            // @ts-ignore
            global.Date = class extends Date {
                constructor(date) {
                    if (date) {
                        super(date);
                    }
                    return mockDate;
                }
            };
            localStorage.setItem('ual-session-expiration', mockDate.toString());
            localStorage.setItem('ual-session-authenticator', authenticator.constructor.name);
            ual.init();
            yield runPromises();
            expect(authenticator.login).not.toHaveBeenCalled();
            global.Date = realDate;
        }));
    });
    describe('get authenticator name', () => {
        it('should be able to get authenticator name', () => {
            const expectedName = 'authenticator';
            expect(authenticator.getName()).toBe(expectedName);
        });
    });
});
const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
};
const runPromises = () => __awaiter(void 0, void 0, void 0, function* () {
    // jest.useFakeTimers() changes the order in which promises are run
    // Issue: https://github.com/facebook/jest/pull/6876
    // Workaround: https://github.com/facebook/jest/issues/7151
    // the code below along with the global.Promise pollyfill
    // are workarounds to ensure promises are run in their intended order
    Promise.resolve().then(() => jest.advanceTimersByTime(1));
    yield sleep(1);
});
const createNewUALJs = (authenticator, containerElement) => (new UALJs_1.UALJs(() => true, [], 'my cool app', [authenticator], {
    containerElement
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVUFMSnMudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9VQUxKcy50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0NBQStCO0FBQy9CLHNEQUFxQztBQUVyQyxtQ0FBK0I7QUFFL0IsK0VBQTJFO0FBQzNFLDZFQUF5RTtBQUN6RSxpRkFBNkU7QUFFN0UsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFBO0FBQ3BCLG1FQUFtRTtBQUNuRSxvREFBb0Q7QUFDcEQsMkRBQTJEO0FBQzNELE1BQU0sQ0FBQyxPQUFPLEdBQUcsaUJBQXNCLENBQUE7QUFFdkMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLEdBQUcsRUFBRTtJQUM5QixJQUFJLGdCQUE2QixDQUFBO0lBQ2pDLElBQUksR0FBVSxDQUFBO0lBQ2QsSUFBSSxhQUE0QixDQUFBO0lBQ2hDLElBQUksS0FBSyxDQUFBO0lBQ1QsSUFBSSxTQUFTLENBQUE7SUFFYixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFBO1FBRXBCLGFBQWEsR0FBRyxJQUFJLDZDQUFxQixDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUNuRCxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLGlCQUFpQixDQUFDLENBQUMsRUFBRSxDQUFXLENBQUMsQ0FBQTtRQUNuRCxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUM1QyxhQUFhLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtRQUMzQixhQUFhLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQTtRQUVuQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRzs7S0FFekIsQ0FBQTtRQUVELGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUUsQ0FBQTtRQUU5RCxHQUFHLEdBQUcs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