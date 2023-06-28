"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModal = exports.MessageTypes = void 0;
const UALJsAbstractBaseComponent_1 = require("../UALJsAbstractBaseComponent");
var MessageTypes;
(function (MessageTypes) {
    MessageTypes[MessageTypes["ERROR"] = 1] = "ERROR";
    MessageTypes[MessageTypes["SUCCESS"] = 2] = "SUCCESS";
})(MessageTypes = exports.MessageTypes || (exports.MessageTypes = {}));
class MessageModal extends UALJsAbstractBaseComponent_1.UALJsAbstractBaseComponent {
    constructor() {
        super(...arguments);
        this.onClose = () => { return; };
    }
    generateStyles() {
        return `
      #ual-modal-message-description {
        color: rgb(20, 35, 93);
        width: 265px;
        font-size: 2em;
        margin: .7em auto
      }

      #ual-modal-message-content {
        font-family: 'Source Sans Pro', sans-serif;
        background-color: #fefefe;
        margin: 10% auto;
        padding: 30px;
        border: 1px solid #888;
        border-radius: 6px;
        width: 370px;
      }

      #ual-modal-message {
        margin: .7em auto;
        width: 260px;
      }

      @media only screen and (max-width: 480px) {
        #ual-modal-message-content {
          width: calc(100% - 30px);
          border: 0px;
          border-radius: 0px;
          padding: 15px;
          height: calc(100% - 30px);
          margin: 0px;
        }
      }
    `;
    }
    /**
     * Generates the Modal DOM and binds close handler
     */
    generateDom() {
        const component = document.createElement('div');
        component.innerHTML = `
      <div id="ual-modal-message-content">
        <span class="ual-modal-close">&times;</span>
        <p id="ual-modal-message-description"></p>
        <p>
          <div id="ual-modal-message"></div>
        </p>
      </div>
    `;
        component.querySelector('.ual-modal-close').addEventListener('click', () => {
            this.close();
        });
        return component;
    }
    /**
     * Sets the message content of the modal
     *
     * @param modalMessage ModalMessage
     */
    setMessage(modalMessage) {
        const { title = '', message, type = null } = modalMessage;
        const modalMessageDescription = this.dom.querySelector('#ual-modal-message-description');
        const modalMessageContent = this.dom.querySelector('#ual-modal-message');
        modalMessageDescription.innerHTML = title;
        modalMessageContent.innerHTML = message;
        switch (type) {
            case MessageTypes.ERROR:
                modalMessageContent.style.color = 'red';
                break;
            case MessageTypes.SUCCESS:
                modalMessageContent.style.color = 'green';
                break;
            default:
                modalMessageContent.style.color = 'black';
        }
    }
    /**
     * Sets the message for the modal and also shows it
     *
     * @param modalMessage ModalMessage
     */
    showMessage(modalMessage) {
        this.setMessage(modalMessage);
        this.show();
        if (modalMessage.onClose) {
            this.onClose = modalMessage.onClose;
        }
    }
    close() {
        // only hide and call close if we aren't already visible
        if (this.dom.style.display !== 'none') {
            this.hide();
            this.onClose();
            this.onClose = () => { return; };
        }
    }
}
exports.MessageModal = MessageModal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVzc2FnZU1vZGFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbXBvbmVudHMvTWVzc2FnZU1vZGFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDhFQUEwRTtBQUUxRSxJQUFZLFlBR1g7QUFIRCxXQUFZLFlBQVk7SUFDdEIsaURBQVMsQ0FBQTtJQUNULHFEQUFXLENBQUE7QUFDYixDQUFDLEVBSFcsWUFBWSxHQUFaLG9CQUFZLEtBQVosb0JBQVksUUFHdkI7QUFTRCxNQUFhLFlBQWEsU0FBUSx1REFBMEI7SUFBNUQ7O1FBQ1UsWUFBTyxHQUFHLEdBQUcsRUFBRSxHQUFHLE9BQU0sQ0FBQyxDQUFDLENBQUE7SUE4R3BDLENBQUM7SUE1R1EsY0FBYztRQUNuQixPQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FpQ04sQ0FBQTtJQUNILENBQUM7SUFFRDs7T0FFRztJQUNPLFdBQVc7UUFDbkIsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUMvQyxTQUFTLENBQUMsU0FBUyxHQUFHOzs7Ozs7OztLQVFyQixDQUFBO1FBRUQsU0FBUyxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBRSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7WUFDMUUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFBO1FBQ2QsQ0FBQyxDQUFDLENBQUE7UUFFRixPQUFPLFNBQVMsQ0FBQTtJQUNsQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLFVBQVUsQ0FBQyxZQUEwQjtRQUMxQyxNQUFNLEVBQUUsS0FBSyxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxHQUFHLElBQUksRUFBRSxHQUFHLFlBQVksQ0FBQTtRQUV6RCxNQUFNLHVCQUF1QixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLGdDQUFnQyxDQUFDLENBQUE7UUFDeEYsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBbUIsQ0FBQTtRQUUxRix1QkFBd0IsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFBO1FBQzFDLG1CQUFvQixDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUE7UUFFeEMsUUFBUSxJQUFJLEVBQUU7WUFDWixLQUFLLFlBQVksQ0FBQyxLQUFLO2dCQUNyQixtQkFBb0IsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtnQkFDeEMsTUFBSztZQUNQLEtBQUssWUFBWSxDQUFDLE9BQU87Z0JBQ3ZCLG1CQUFvQixDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFBO2dCQUMxQyxNQUFLO1lBQ1A7Z0JBQ0UsbUJBQW9CLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUE7U0FDN0M7SUFDSCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLFdBQVcsQ0FBQyxZQUEwQjtRQUMzQyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBQzdCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUVYLElBQUksWUFBWSxDQUFDLE9BQU8sRUFBRTtZQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUE7U0FDcEM7SUFDSCxDQUFDO0lBRU0sS0FBSztRQUNWLHdEQUF3RDtRQUN4RCxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sS0FBSyxNQUFNLEVBQUU7WUFDckMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO1lBQ1gsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO1lBRWQsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLEVBQUUsR0FBRyxPQUFNLENBQUMsQ0FBQyxDQUFBO1NBQ2hDO0lBQ0gsQ0FBQztDQUNGO0FBL0dELG9DQStHQyJ9