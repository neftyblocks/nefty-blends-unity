"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAuthenticatorModal = void 0;
const UALJsAbstractBaseComponent_1 = require("../UALJsAbstractBaseComponent");
const AuthButton_1 = require("./AuthButton");
class GetAuthenticatorModal extends UALJsAbstractBaseComponent_1.UALJsAbstractBaseComponent {
    /**
     *
     * @param getAuthenticatorModalOptions { authenticators, onClose, onDownloadClick, onResetAuthenticatorsClick }
     */
    constructor(getAuthenticatorModalOptions) {
        super(getAuthenticatorModalOptions);
    }
    generateStyles() {
        return '';
    }
    onDownloadClick(authenticator) {
        this.options.onDownloadClick(authenticator);
    }
    close() {
        // only hide and call close if we aren't already visible
        if (this.dom.style.display !== 'none') {
            this.hide();
            this.options.onClose();
        }
    }
    open() {
        this.show();
    }
    /**
     * Generates the Modal DOM, binds go-back, and close handlers, creates and renders Download Authenticator buttons
     */
    generateDom() {
        const { authenticators } = this.options;
        const component = document.createElement('div');
        component.innerHTML = `
      <div id="ual-modal-get-authenticator">
        <span class="ual-modal-close">&times;</span>
        <p class="ual-modal-content-description">
          Pardon the interruption
        </p>
        <p class="ual-modal-text-box">` +
            // tslint:disable-next-line:max-line-length
            'Install one of our supported authenticators or ensure your authenticator is running and click <a class="ual-reset-link" href="#">here</a> to retry.' +
            `</p>
        <div id="ual-authenticators-download-list">
        </div>
      </div>
    `;
        // bind close
        component.querySelector('.ual-modal-close').addEventListener('click', () => {
            this.close();
        });
        // bind reset
        component.querySelector('.ual-reset-link').addEventListener('click', () => {
            this.options.onResetAuthenticatorsClick();
        });
        const downloadList = component.querySelector('#ual-authenticators-download-list');
        authenticators.forEach((authenticator) => {
            const onClick = () => {
                this.onDownloadClick(authenticator);
            };
            downloadList.append(new AuthButton_1.AuthButton({ authenticator, showDownload: true, onClick }).getComponentElement());
        });
        return component;
    }
}
exports.GetAuthenticatorModal = GetAuthenticatorModal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2V0QXV0aGVudGljYXRvck1vZGFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbXBvbmVudHMvR2V0QXV0aGVudGljYXRvck1vZGFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDhFQUEwRTtBQUMxRSw2Q0FBeUM7QUFTekMsTUFBYSxxQkFBc0IsU0FBUSx1REFBMEI7SUFDbkU7OztPQUdHO0lBQ0gsWUFBWSw0QkFBMEQ7UUFDcEUsS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUE7SUFDckMsQ0FBQztJQUVTLGNBQWM7UUFDdEIsT0FBTyxFQUFFLENBQUE7SUFDWCxDQUFDO0lBRU8sZUFBZSxDQUFDLGFBQTRCO1FBQ2xELElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFBO0lBQzdDLENBQUM7SUFFTSxLQUFLO1FBQ1Ysd0RBQXdEO1FBQ3hELElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxLQUFLLE1BQU0sRUFBRTtZQUNyQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7WUFDWCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFBO1NBQ3ZCO0lBQ0gsQ0FBQztJQUVNLElBQUk7UUFDVCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDYixDQUFDO0lBRUQ7O09BRUc7SUFDTyxXQUFXO1FBQ25CLE1BQU0sRUFBRSxjQUFjLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFBO1FBRXZDLE1BQU0sU0FBUyxHQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDaEQsU0FBUyxDQUFDLFNBQVMsR0FBRzs7Ozs7O3VDQU1hO1lBQzdCLDJDQUEyQztZQUMzQyxxSkFBcUo7WUFDdko7Ozs7S0FJSCxDQUFBO1FBRUQsYUFBYTtRQUNiLFNBQVMsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO1lBQzFFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUNkLENBQUMsQ0FBQyxDQUFBO1FBRUYsYUFBYTtRQUNiLFNBQVMsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO1lBQ3pFLElBQUksQ0FBQyxPQUFPLENBQUMsMEJBQTBCLEVBQUUsQ0FBQTtRQUMzQyxDQUFDLENBQUMsQ0FBQTtRQUVGLE1BQU0sWUFBWSxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQUMsbUNBQW1DLENBQUMsQ0FBQTtRQUVqRixjQUFjLENBQUMsT0FBTyxDQUNwQixDQUFDLGFBQWEsRUFBRSxFQUFFO1lBQ2hCLE1BQU0sT0FBTyxHQUFHLEdBQUcsRUFBRTtnQkFDbkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsQ0FBQTtZQUNyQyxDQUFDLENBQUE7WUFFRCxZQUFhLENBQUMsTUFBTSxDQUFDLElBQUksdUJBQVUsQ0FBQyxFQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFBO1FBQzNHLENBQUMsQ0FDRixDQUFBO1FBRUQsT0FBTyxTQUFTLENBQUE7SUFDbEIsQ0FBQztDQUNGO0FBM0VELHNEQTJFQyJ9