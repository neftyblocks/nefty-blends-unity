"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DownloadAuthenticatorModal = void 0;
const UALJsAbstractBaseComponent_1 = require("../UALJsAbstractBaseComponent");
class DownloadAuthenticatorModal extends UALJsAbstractBaseComponent_1.UALJsAbstractBaseComponent {
    /**
     *
     * @param options { onGoBack, onClose } // goback and close callbacks
     */
    constructor(options) {
        super(options);
    }
    close() {
        // only hide and call close if we aren't already visible
        if (this.dom.style.display !== 'none') {
            this.hide();
            this.options.onClose();
        }
    }
    /**
     * Show the download modal and provide a download button for the provided authenticator
     *
     * @param authenticator Authenticator this modal represents
     */
    open(authenticator) {
        const { text, textColor, background } = authenticator.getStyle();
        const downloadUri = authenticator.getOnboardingLink();
        const contentDescription = this.dom.querySelector('.ual-modal-content-description');
        contentDescription.textContent = `Install ${text} to Continue`;
        const contentTextBox = this.dom.querySelector('.ual-modal-text-box');
        contentTextBox.textContent = `To get started with ${text}, install the app at the link below.`;
        contentDescription.style.color = textColor;
        const getDownloadLink = this.dom.querySelector('.ual-leave-and-install');
        getDownloadLink.href = downloadUri;
        const modalElement = this.dom.querySelector('#ual-modal-get-authenticator');
        modalElement.style.background = background;
        modalElement.style.color = textColor;
        this.show();
    }
    goBack() {
        this.options.onGoBack();
    }
    generateStyles() {
        return `
      .ual-go-back {
        color: white;
        font-size: 1rem;
        cursor: pointer;
        text-align: center;
      }

      a.ual-leave-and-install {
        width: 260px;
        padding: 11px;
        margin: 4em auto;
        display: block;
        border-radius: 5px;
        font-size: 1em;
        background: rgba(255, 255, 255, 0.2);
        color: inherit;
        text-align: center;
        text-decoration: none;
      }
    `;
    }
    /**
     * Generates the Modal DOM, binds go-back, and close handlers
     */
    generateDom() {
        const component = document.createElement('div');
        component.innerHTML = `
      <div id="ual-modal-get-authenticator">
        <span class="ual-modal-close">&times;</span>
        <p class="ual-modal-content-description"></p>
        <p class="ual-modal-text-box"></p>
        <a class="ual-leave-and-install"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >Leave and Install</a>
        <div class="ual-go-back">Go Back</div>
      </div>`;
        component.querySelector('.ual-modal-close').addEventListener('click', () => {
            this.close();
        });
        component.querySelector('.ual-go-back').addEventListener('click', () => {
            this.options.onGoBack();
        });
        return component;
    }
}
exports.DownloadAuthenticatorModal = DownloadAuthenticatorModal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRG93bmxvYWRBdXRoZW50aWNhdG9yTW9kYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tcG9uZW50cy9Eb3dubG9hZEF1dGhlbnRpY2F0b3JNb2RhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw4RUFBMEU7QUFPMUUsTUFBYSwwQkFBMkIsU0FBUSx1REFBMEI7SUFDeEU7OztPQUdHO0lBQ0gsWUFBWSxPQUEwQztRQUNwRCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDaEIsQ0FBQztJQUVNLEtBQUs7UUFDVix3REFBd0Q7UUFDeEQsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEtBQUssTUFBTSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQTtZQUNYLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUE7U0FDdkI7SUFDSCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLElBQUksQ0FBQyxhQUE0QjtRQUN0QyxNQUFNLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsR0FBRyxhQUFhLENBQUMsUUFBUSxFQUFFLENBQUE7UUFDaEUsTUFBTSxXQUFXLEdBQUcsYUFBYSxDQUFDLGlCQUFpQixFQUFFLENBQUE7UUFFckQsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxnQ0FBZ0MsQ0FBZ0IsQ0FBQTtRQUNsRyxrQkFBa0IsQ0FBQyxXQUFXLEdBQUcsV0FBVyxJQUFJLGNBQWMsQ0FBQTtRQUU5RCxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBZ0IsQ0FBQTtRQUNuRixjQUFjLENBQUMsV0FBVyxHQUFHLHVCQUF1QixJQUFJLHNDQUFzQyxDQUFBO1FBRTlGLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFBO1FBRTFDLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUFvQixDQUFBO1FBQzNGLGVBQWUsQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFBO1FBRWxDLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLDhCQUE4QixDQUFnQixDQUFBO1FBRTFGLFlBQVksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQTtRQUMxQyxZQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUE7UUFFcEMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ2IsQ0FBQztJQUVNLE1BQU07UUFDWCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFBO0lBQ3pCLENBQUM7SUFFUyxjQUFjO1FBQ3RCLE9BQU87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBb0JOLENBQUE7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDTyxXQUFXO1FBQ25CLE1BQU0sU0FBUyxHQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDaEQsU0FBUyxDQUFDLFNBQVMsR0FBRzs7Ozs7Ozs7Ozs7YUFXYixDQUFBO1FBRVQsU0FBUyxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBRSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7WUFDMUUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFBO1FBQ2QsQ0FBQyxDQUFDLENBQUE7UUFFRixTQUFTLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBRSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7WUFDdEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQTtRQUN6QixDQUFDLENBQUMsQ0FBQTtRQUVGLE9BQU8sU0FBUyxDQUFBO0lBQ2xCLENBQUM7Q0FDRjtBQXJHRCxnRUFxR0MifQ==