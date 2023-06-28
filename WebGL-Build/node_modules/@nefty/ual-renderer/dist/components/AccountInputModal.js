"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountInputModal = void 0;
const UALJsAbstractBaseComponent_1 = require("../UALJsAbstractBaseComponent");
const AuthButton_1 = require("./AuthButton");
/**
 * @param options { onGoBack, onClose } // goback and close callbacks
 */
class AccountInputModal extends UALJsAbstractBaseComponent_1.UALJsAbstractBaseComponent {
    constructor(options) {
        super(options);
    }
    generateStyles() {
        return `
      @media only screen and (max-width: 480px) {
        #ual-modal-input-content {
          width: calc(100% - 30px);
          border: 0px;
          border-radius: 0px;
          padding: 15px;
          height: calc(100% - 30px);
          margin: 0px;
        }

        #ual-account-input {
          width: calc(100% - 15px) !important;
        }
      }

      #ual-account-input {
        border-radius: 6px;
        height: 2em;
        font-size: 1em;
        padding: 5px;
        width: 250px;
        display: block;
        margin: .7em auto;
      }

      #ual-account-input-error {
        color: red;
        font-weight: bold;
        margin-top: 10px;
        display: none;
      }

      .ual-go-back {
        font-size: 1rem;
        color: rgb(72, 151, 248);
        cursor: pointer;
        width: 260px;
        margin: .7em auto;
      }
    `;
    }
    /**
     * Generates the Modal DOM, binds go-back, and close handlers
     */
    generateDom() {
        const accountInputModal = document.createElement('div');
        accountInputModal.id = 'ual-modal-input-content';
        accountInputModal.innerHTML = `
      <span class="ual-modal-close">&times;</span>
      <p class="ual-modal-content-description">
        Next, please enter your Account Name
      </p>
      <input
        id="ual-account-input"
        type="text"
        placeholder="Account Name"
        autocapitalize="none"
      />
      <div id="ual-account-input-error"></div>
      <div id="ual-input-continue-button-container"></div>
      <div class="ual-go-back">&lt;&lt; Go Back</div>
    `;
        accountInputModal.querySelector('.ual-modal-close').addEventListener('click', () => {
            this.getInputField().value = '';
            this.hide();
            this.options.onClose();
        });
        accountInputModal.querySelector('.ual-go-back').addEventListener('click', this.options.onGoBack);
        return accountInputModal;
    }
    /**
     * Sets and displays account input error
     *
     * @param inputError Error message to show
     */
    showAccountNameInputError(inputError) {
        const accountInputError = this.dom.querySelector('#ual-account-input-error');
        accountInputError.innerHTML = inputError;
        accountInputError.style.display = 'block';
    }
    /**
     * Clears account input error and hides it
     */
    clearAccountNameInputError() {
        const accountInputError = this.dom.querySelector('#ual-account-input-error');
        accountInputError.innerHTML = '';
        accountInputError.style.display = 'none';
    }
    getInputField() {
        return this.dom.querySelector('#ual-account-input');
    }
    /**
     * Displays the input modal and ties it to the authenticator requesting
     * username.  Then calls login callback to complete login when clicked.
     *
     * @param authenticator Authenticator you wiish to login with
     * @param login login callback passed from UAL
     */
    showInput(authenticator, login) {
        const inputButtonContainer = this.dom.querySelector('#ual-input-continue-button-container');
        // cleanup the button since we re-create it on render
        // variation of this answer here for fast child removal
        // https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript#answer-15771070
        let last = inputButtonContainer.lastChild;
        while (last != null) {
            inputButtonContainer.removeChild(last);
            last = inputButtonContainer.lastChild;
        }
        let inputField = this.getInputField();
        // replace the account input so we can clear our authenticator specific listeners
        inputField.parentNode.replaceChild(inputField.cloneNode(true), inputField);
        // move our assignment to the clean input field
        inputField = this.getInputField();
        const onClick = () => {
            if (inputField.value.trim() === '') {
                this.showAccountNameInputError('Account Name is required');
                return;
            }
            this.clearAccountNameInputError();
            login(authenticator, inputField.value);
        };
        inputButtonContainer.appendChild(new AuthButton_1.AuthButton({ authenticator, onClick: onClick.bind(this) }).getComponentElement());
        const accountEnterHandler = (e) => {
            const key = e.which || e.keyCode;
            if (key === 13) {
                inputButtonContainer.children[0].click();
            }
        };
        inputField.addEventListener('keypress', accountEnterHandler);
        this.show();
    }
}
exports.AccountInputModal = AccountInputModal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWNjb3VudElucHV0TW9kYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tcG9uZW50cy9BY2NvdW50SW5wdXRNb2RhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw4RUFBMEU7QUFDMUUsNkNBQXlDO0FBT3pDOztHQUVHO0FBQ0gsTUFBYSxpQkFBa0IsU0FBUSx1REFBMEI7SUFDL0QsWUFBWSxPQUFpQztRQUMzQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDaEIsQ0FBQztJQUVTLGNBQWM7UUFDdEIsT0FBTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQXdDTixDQUFBO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ08sV0FBVztRQUVuQixNQUFNLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDdkQsaUJBQWlCLENBQUMsRUFBRSxHQUFHLHlCQUF5QixDQUFBO1FBQ2hELGlCQUFpQixDQUFDLFNBQVMsR0FBRzs7Ozs7Ozs7Ozs7Ozs7S0FjN0IsQ0FBQTtRQUVELGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBRSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7WUFDbEYsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUE7WUFDL0IsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO1lBQ1gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUN4QixDQUFDLENBQUMsQ0FBQTtRQUVGLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUVqRyxPQUFPLGlCQUFpQixDQUFBO0lBQzFCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0sseUJBQXlCLENBQUMs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