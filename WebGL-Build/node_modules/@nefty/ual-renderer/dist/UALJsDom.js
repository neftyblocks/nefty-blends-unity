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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UALJsDom = void 0;
const universal_authenticator_library_1 = require("universal-authenticator-library");
const AccountInputModal_1 = require("./components/AccountInputModal");
const AuthButton_1 = require("./components/AuthButton");
const DownloadAuthenticatorModal_1 = require("./components/DownloadAuthenticatorModal");
const GetAuthenticatorModal_1 = require("./components/GetAuthenticatorModal");
const MessageModal_1 = require("./components/MessageModal");
/**
 * UnisonDom responsible for creating the UI elements of the Authenticator
 */
class UALJsDom {
    /**
     * UnisonDom responsible for creating the UI elements of the Authenticator
     *
     * @param Authenticator[] Array of authenticators to show the user
     * @param HTMLElement Container element for all Authenticator UI elements
     * @param buttonStyleOverride Allows the user to override the default styles of the auth start button
     * @stylePrefix Allows the user to override the prefix of class and id elements to avoid style conflicts
     */
    constructor(loginCallback, authenticators, containerElement, buttonStyleOverride = false) {
        this.authStateString = '';
        this.getAuthenticatorsView = null;
        this.authenticatorModal = null;
        this.downloadAuthenticatorView = null;
        this.messageModalView = null;
        this.accountInputModalView = null;
        this.loginCallback = loginCallback;
        this.authenticators = authenticators;
        this.containerElement = containerElement;
        this.buttonStyleOverride = buttonStyleOverride;
    }
    /**
     * Generates and appends the UI to the dom; this is user called because the container
     * element may not be available at initialization
     */
    generateUIDom() {
        const faStylesheet = document.createElement('link');
        faStylesheet.rel = 'stylesheet';
        faStylesheet.href = 'https://use.fontawesome.com/releases/v5.6.3/css/all.css';
        faStylesheet.integrity = 'sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/';
        faStylesheet.crossOrigin = 'anonymous';
        this.containerElement.appendChild(faStylesheet);
        const tippyJs = document.createElement('script');
        tippyJs.src = 'https://unpkg.com/tippy.js@3.4.1/dist/tippy.all.min.js';
        this.containerElement.appendChild(tippyJs);
        const tippyStylesheet = document.createElement('link');
        tippyStylesheet.rel = 'stylesheet';
        tippyStylesheet.href = 'https://unpkg.com/tippy.js@3.4.1/dist/tippy.css';
        this.containerElement.appendChild(tippyStylesheet);
        const lightTippyStylesheet = document.createElement('link');
        lightTippyStylesheet.rel = 'stylesheet';
        lightTippyStylesheet.href = 'https://unpkg.com/tippy.js@3.4.1/dist/themes/light.css';
        this.containerElement.appendChild(lightTippyStylesheet);
        const button = this.createButton();
        const buttonStyles = this.createButtonStyles(this.buttonStyleOverride);
        this.containerElement.appendChild(buttonStyles);
        this.containerElement.appendChild(button);
        this.attachLoginButtonWatcher();
        const authenticationModalStyles = this.createAuthenticatorModalStyles();
        this.authenticatorModal = this.createAuthenticatorModal();
        this.containerElement.appendChild(authenticationModalStyles);
        this.containerElement.appendChild(this.authenticatorModal);
        // bind any tooltips on buttons, tippy loads asychronously and may not be initially available
        const interval = setInterval(() => {
            if (!!window.tippy) {
                window.tippy(this.containerElement, {
                    target: '.tippy-binding',
                    theme: 'light',
                    arrow: 'true',
                    size: 'large'
                }, null);
                clearInterval(interval);
            }
        }, 50);
        // starts a cyclical redraw of the authenticator buttons
        // so if state change occurs they redraw
        this.startRefreshAuthenticatorsTimeout();
        if (this.buttonStyleOverride) {
            const styleStr = typeof this.buttonStyleOverride === 'boolean' ? '' : this.buttonStyleOverride.toString();
            this.containerElement.appendChild(this.createButtonStyles(styleStr));
        }
    }
    /**
     * Does a cyclical redraw of the authenticators so we can redraw on state change
     */
    startRefreshAuthenticatorsTimeout() {
        // update our comparison state string
        if (this.getAuthenticatorsStateString() !== this.authStateString) {
            this.drawAuthenticatorsButtons();
            this.authStateString = this.getAuthenticatorsStateString();
            // if all authenticators are errored, we want to show the download view
            const nonErroredAuthenticators = this.authenticators.filter((authenticator) => !authenticator.isErrored());
            if (nonErroredAuthenticators.length === 0) {
                this.showGetAuthenticators();
            }
        }
        setTimeout(() => {
            this.startRefreshAuthenticatorsTimeout();
        }, 250);
    }
    /**
     * Handles download clicks showing the individual authenticators download modal
     *
     * @param authenticator Authenticator for download representation
     */
    onDownloadClick(authenticator) {
        this.hideAuthenticatorSelection();
        if (this.getAuthenticatorsView) {
            this.getAuthenticatorsView.hide();
        }
        if (!this.downloadAuthenticatorView) {
            this.downloadAuthenticatorView = new DownloadAuthenticatorModal_1.DownloadAuthenticatorModal({
                onGoBack: () => {
                    this.downloadAuthenticatorView.hide();
                    this.showGetAuthenticators();
                },
                onClose: this.reset.bind(this)
            });
            this.downloadAuthenticatorView.attach(this.authenticatorModal);
        }
        this.downloadAuthenticatorView.open(authenticator);
    }
    /**
     * Calls reset on all authenticators, used when retrying authenticator initialization
     * when no active or authenticators are found for the current environment or all available
     * authenticators have errored out
     */
    resetAuthenticators() {
        this.reset();
        // show the modal overlay
        document.getElementById('ual-modal').style.display = 'block';
        this.showAuthenticatorSelection();
        this.authenticators.forEach((authenticator) => authenticator.reset());
    }
    showGetAuthenticators() {
        if (!this.getAuthenticatorsView) {
            this.getAuthenticatorsView = new GetAuthenticatorModal_1.GetAuthenticatorModal({
                authenticators: this.authenticators,
                onClose: this.reset.bind(this),
                onDownloadClick: this.onDownloadClick.bind(this),
                onResetAuthenticatorsClick: this.resetAuthenticators.bind(this)
            });
            this.getAuthenticatorsView.attach(this.authenticatorModal);
        }
        this.hideAuthenticatorSelection();
        this.getAuthenticatorsView.open();
    }
    /**
     * Generates unique string for comparing authenticator states
     */
    getAuthenticatorsStateString() {
        const states = this.authenticators.map((authenticator) => {
            return {
                authenticatorName: authenticator.getStyle().text,
                isLoading: authenticator.isLoading(),
                isErrored: authenticator.isErrored()
            };
        });
        return JSON.stringify(states);
    }
    /**
     * Cleans up existing authenticators and redraws them so we can
     * respond to authenticator state changes
     */
    drawAuthenticatorsButtons() {
        // cleanup
        const listNode = document.getElementById('ual-authenticators-list');
        // variation of this answer here for fast child removal
        // https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript#answer-15771070
        let last = listNode.lastChild;
        while (last != null) {
            listNode.removeChild(last);
            last = listNode.lastChild;
        }
        this.renderAuthenticationSelections(this.authenticators);
    }
    /**
     * Renders authenticators in the modal selection box
     *
     * @param authenticators Authenticators to render
     */
    renderAuthenticationSelections(authenticators) {
        const authenticatorsList = document.getElementById('ual-authenticators-list');
        authenticators.forEach((authenticator) => {
            const authButton = new AuthButton_1.AuthButton({ authenticator, onClick: () => {
                    this.onAuthButtonClickHandler(authenticator);
                } }).getComponentElement();
            authenticatorsList.appendChild(authButton);
        });
    }
    /**
     * Resets the ui to it's original state
     */
    reset() {
        this.showAuthenticatorSelection();
        if (this.accountInputModalView) {
            this.accountInputModalView.hide();
        }
        if (this.messageModalView) {
            this.messageModalView.hide();
        }
        if (this.getAuthenticatorsView) {
            this.getAuthenticatorsView.hide();
        }
        document.getElementById('ual-modal').style.display = 'none';
    }
    /**
     * Login Method handling login UI status and errors
     *
     * @param authenticator Authenticator to login with
     * @param accountName Optional account name for login
     */
    login(authenticator, accountName) {
        return __awaiter(this, void 0, void 0, function* () {
            const { text: authenticatorName } = authenticator.getStyle();
            this.hideAuthenticatorSelection();
            this.showMessage({
                title: 'Waiting for Login Response',
                message: `Confirm our login request with ${authenticatorName}`,
                onClose: this.reset.bind(this)
            });
            try {
                yield this.loginCallback(authenticator, accountName);
                this.reset();
            }
            catch (e) {
                if (e instanceof universal_authenticator_library_1.UALError && e.type === universal_authenticator_library_1.UALErrorType.Login) {
                    this.showMessage({
                        title: `${authenticatorName} errored while logging in:`,
                        message: e.message,
                        type: MessageModal_1.MessageTypes.ERROR
                    });
                }
                else {
                    this.showMessage({
                        title: 'Login Error:',
                        message: e.message,
                        type: MessageModal_1.MessageTypes.ERROR
                    });
                }
            }
        });
    }
    /**
     * Shows account name input for the provide authenticator
     */
    showAccountNameInput(authenticator) {
        this.hideAuthenticatorSelection();
        if (!this.accountInputModalView) {
            this.accountInputModalView = new AccountInputModal_1.AccountInputModal({
                onGoBack: this.showAuthModal.bind(this),
                onClose: this.showAuthModal.bind(this)
            });
            this.authenticatorModal.appendChild(this.accountInputModalView.getComponentElement());
        }
        this.accountInputModalView.showInput(authenticator, this.login.bind(this));
    }
    /**
     * Show Authenticator Selector view
     */
    showAuthenticatorSelection() {
        document.getElementById('ual-modal-selection-content').style.display = 'block';
    }
    /**
     * Show Authenticator Selector view
     */
    hideAuthenticatorSelection() {
        document.getElementById('ual-modal-selection-content').style.display = 'none';
    }
    /**
     * Generic message display modal for users.
     *
     * @param modalMessage Message to show
     */
    showMessage(modalMessage) {
        if (this.accountInputModalView) {
            this.accountInputModalView.hide();
        }
        if (!this.messageModalView) {
            this.messageModalView = new MessageModal_1.MessageModal();
            this.messageModalView.attach(this.authenticatorModal);
        }
        this.messageModalView.showMessage(modalMessage);
    }
    /**
     * Shows the authentication modal
     */
    showAuthModal() {
        const nonErroredAuthenticators = this.authenticators.filter((authenticator) => !authenticator.isErrored());
        // if we don't have any authenticators not in an errored stat reset them
        if (nonErroredAuthenticators.length === 0) {
            this.resetAuthenticators();
        }
        this.reset();
        this.showAuthenticatorSelection();
        document.getElementById('ual-modal').style.display = 'block';
    }
    /**
     * Adds login button watcher for displaying the auth modal
     */
    attachLoginButtonWatcher() {
        const button = document.getElementById('ual-button');
        button.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            this.showAuthModal();
        }));
    }
    /**
     * Renders the Modal to contain auth continue buttons
     */
    createAuthenticatorModal() {
        const modalDiv = document.createElement('div');
        modalDiv.id = 'ual-modal';
        // Authenticator Selection Modal
        const authenticatorSelectionModal = document.createElement('div');
        authenticatorSelectionModal.id = 'ual-modal-selection-content';
        authenticatorSelectionModal.innerHTML = `
      <span class="ual-modal-close">&times;</span>
      <p class="ual-modal-content-description">
        Please select a service to log in
      </p>
      <div id="ual-authenticators-list">
        <em>Loading Authenticators...</em>
      </div>
      <div id="ual-learnMoreContainer" class="opened">
        <div class="ual-open-learnMoreButton">
          &#9432; Learn more
        </div>
        <div class="ual-close-learnMoreButton">
          &#10006; I got it!
        </div>
        <p class="ual-infoExpanded">
          This option allows you to connect to your favorite key manager app.
        </p>
      </div>
    `;
        authenticatorSelectionModal.querySelector('.ual-modal-close').addEventListener('click', this.reset.bind(this));
        authenticatorSelectionModal.querySelector('.ual-open-learnMoreButton').addEventListener('click', () => {
            document.getElementById('ual-learnMoreContainer').className = 'closed';
        });
        authenticatorSelectionModal.querySelector('.ual-close-learnMoreButton').addEventListener('click', () => {
            document.getElementById('ual-learnMoreContainer').className = 'opened';
        });
        authenticatorSelectionModal.querySelector('.ual-modal-close').addEventListener('click', this.reset.bind(this));
        modalDiv.appendChild(authenticatorSelectionModal);
        return modalDiv;
    }
    /**
     * Determines if the authenticator is ready for dapp interaction
     *
     * @param authenticator UAL Authenticator
     */
    static authenticatorCanLogin(authenticator) {
        return !authenticator.isLoading() && !authenticator.isErrored();
    }
    /**
     * Handles the click action of Authenticator buttons
     *
     * @param authenticators Authenticators
     */
    onAuthButtonClickHandler(authenticator) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!UALJsDom.authenticatorCanLogin(authenticator)) {
                return;
            }
            if (yield authenticator.shouldRequestAccountName()) {
                this.showAccountNameInput(authenticator);
            }
            else {
                this.login(authenticator);
            }
        });
    }
    /**
     * Renders the Auth start button
     */
    createButton() {
        const button = document.createElement('button');
        button.id = 'ual-button';
        button.className = 'ual-button-gen'; // TODO: determine if this is needed
        button.innerHTML = 'UAL Login';
        return button;
    }
    /**
     * Generates the CSS styles for the Auth start button
     *
     * @param css Optional css override for user provided button styles
     */
    createButtonStyles(css) {
        const buttonStyles = document.createElement('style');
        const cssStyles = css || `
      #ual-button {
        font-family: "Proxima Nova",sans-serif;
        color: white;
        text-align: center;
        background-color: #d8dee5;
        border-radius: 6px;
        font-size: 1em;
        font-weight: bold;
        background-color: rgb(25,50,112);
        cursor: pointer;
        width: 225px;
        padding: 10px 0px;
      }

      @media only screen and (max-width: 480px) {
        #ual-button {
          width: calc(100% - 60px);
        }
      }
    `;
        buttonStyles.innerHTML = cssStyles;
        return buttonStyles;
    }
    /**
     * Generates the CSS styles for the Auth Modal
     */
    createAuthenticatorModalStyles() {
        const modalStyles = document.createElement('style');
        const modalCss = `
      @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

      /* The Modal (background) */
      #ual-modal {
        display: none; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 10; /* Sit on top */
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
      }

      /* Modal Content/Box */
      #ual-modal-get-authenticator, /* Authenticator download modal */
      #ual-modal-selection-content,
      #ual-modal-input-content {
        font-family: 'Source Sans Pro', sans-serif;
        background-color: #fefefe;
        margin: 10% auto;
        padding: 30px;
        border: 1px solid #888;
        border-radius: 6px;
        width: 370px;
      }

      @media only screen and (max-width: 480px) {
        #ual-modal {
          box-shadow: none;
          margin: 0;
          border-radius: 0px;
          overflow: none;
        }

        #ual-modal-selection-content {
          width: calc(100% - 30px);
          border: 0px;
          border-radius: 0px;
          padding: 15px;
          height: calc(100% - 30px);
          margin: 0px;
        }
      }

      .ual-modal-content-title {
        color: rgb(20, 35, 93);
        margin-top: 5px;
      }

      .ual-modal-content-description {
        color: rgb(20, 35, 93);
        width: 265px;
        font-size: 2em;
        margin: .7em auto
      }

      .ual-modal-text-box {
        width: 265px;
        margin: .7em auto
      }

      /* The Close Button */
      .ual-modal-close {
        color: #aaa;
        float: right;
        font-size: 2em;
        line-height: 0.5em;
        font-weight: bold;
      }

      .ual-modal-close:hover,
      .ual-modal-close:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
      }

      /* UALLearnMore */

      /* Button Toggle states */
      #ual-learnMoreContainer {
        width: 260px;
        margin: .7em auto;
      }

      #ual-learnMoreContainer.opened > .ual-open-learnMoreButton {
        display: block;
      }

      #ual-learnMoreContainer.opened > .ual-infoExpanded,
      #ual-learnMoreContainer.opened > .ual-close-learnMoreButton {
        display: none
      }

      #ual-learnMoreContainer.closed > .ual-infoExpanded,
      #ual-learnMoreContainer.closed > .ual-close-learnMoreButton {
        display: block;
      }

      #ual-learnMoreContainer.closed > .ual-open-learnMoreButton {
        display: none;
      }

      .ual-learnMoreText {
        color: rgba(49, 71, 128, 0.7);
        fontSize: 0.8rem;
        fontWeight: 100;
        margin: 0px;
      }

      .ual-open-learnMoreButton,
      .ual-close-learnMoreButton {
        marginTop: 0px;
        color: rgb(72, 151, 248);
        fontSize: 0.9rem;
        fontWeight: 100;
        cursor: pointer;
      }
    `;
        modalStyles.innerHTML = modalCss;
        return modalStyles;
    }
}
exports.UALJsDom = UALJsDom;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVUFMSnNEb20uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvVUFMSnNEb20udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEscUZBQXVGO0FBQ3ZGLHNFQUFrRTtBQUNsRSx3REFBb0Q7QUFDcEQsd0ZBQW9GO0FBQ3BGLDhFQUEwRTtBQUMxRSw0REFBb0Y7QUFVcEY7O0dBRUc7QUFDSCxNQUFhLFFBQVE7SUFhbkI7Ozs7Ozs7T0FPRztJQUNILFlBQ0UsYUFBZ0MsRUFDaEMsY0FBK0IsRUFDL0IsZ0JBQTZCLEVBQzdCLHNCQUF3QyxLQUFLO1FBcEJ2QyxvQkFBZSxHQUFXLEVBQUUsQ0FBQTtRQUU1QiwwQkFBcUIsR0FBaUMsSUFBSSxDQUFBO1FBQzFELHVCQUFrQixHQUF1QixJQUFJLENBQUE7UUFDN0MsOEJBQXlCLEdBQXNDLElBQUksQ0FBQTtRQUNuRSxxQkFBZ0IsR0FBd0IsSUFBSSxDQUFBO1FBQzVDLDBCQUFxQixHQUE2QixJQUFJLENBQUE7UUFnQjVELElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFBO1FBQ2xDLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFBO1FBQ3BDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQTtRQUN4QyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsbUJBQW1CLENBQUE7SUFDaEQsQ0FBQztJQUVEOzs7T0FHRztJQUNJLGFBQWE7UUFDbEIsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQW9CLENBQUE7UUFDdEUsWUFBWSxDQUFDLEdBQUcsR0FBRyxZQUFZLENBQUE7UUFDL0IsWUFBWSxDQUFDLElBQUksR0FBRyx5REFBeUQsQ0FBQTtRQUM3RSxZQUFZLENBQUMsU0FBUyxHQUFHLHlFQUF5RSxDQUFBO1FBQ2xHLFlBQVksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFBO1FBRXRDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMs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