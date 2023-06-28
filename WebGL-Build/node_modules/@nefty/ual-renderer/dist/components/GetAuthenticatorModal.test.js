"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseMockAuthenticator_1 = require("../AuthMocks/BaseMockAuthenticator");
const GetAuthenticatorModal_1 = require("./GetAuthenticatorModal");
describe('Get Authenticator View', () => {
    let parentContainer;
    let component;
    let options;
    const onDownloadStub = jest.fn();
    const onCloseStub = jest.fn();
    const onResetAuthenticatorsStub = jest.fn();
    beforeEach(() => {
        const baseAuthenticator = new BaseMockAuthenticator_1.BaseMockAuthenticator([]);
        onDownloadStub.mockReset();
        onCloseStub.mockReset();
        document.body.innerHTML = '';
        parentContainer = document.createElement('div');
        document.body.appendChild(parentContainer);
        options = {
            authenticators: [baseAuthenticator],
            onClose: onCloseStub,
            onDownloadClick: onDownloadStub,
            onResetAuthenticatorsClick: onResetAuthenticatorsStub
        };
        component = new GetAuthenticatorModal_1.GetAuthenticatorModal(options);
        component.attach(parentContainer);
    });
    it('Has Title Text', () => {
        expect(component.getComponentElement().innerHTML).toContain('Pardon the interruption');
    });
    it('hides when close is called', () => {
        component.getComponentElement().style.display = 'block';
        component.close();
        expect(component.getComponentElement().style.display).toBe('none');
    });
    it('calls onClose when onClose is called', () => {
        component.close();
        expect(onCloseStub).toBeCalled();
    });
    it('doesn\'t call onClose when the modal is already closed', () => {
        component.close();
        onCloseStub.mockReset();
        component.close();
        expect(onCloseStub).not.toBeCalled();
    });
    it('shows when open is called', () => {
        component.getComponentElement().style.display = 'none';
        component.open();
        expect(component.getComponentElement().style.display).toBe('block');
    });
    it('Renders button for auth download', () => {
        const renderedAuthButtons = document.getElementsByClassName('ual-auth-button');
        expect(renderedAuthButtons.length).toEqual(1);
    });
    it('Has Descriptor Text', () => {
        expect(component.getComponentElement().innerHTML).toContain(
        // tslint:disable-next-line:max-line-length
        'Install one of our supported authenticators or ensure your authenticator is running and click <a class="ual-reset-link" href="#">here</a> to retry.');
    });
    it('calls close callback close is clicked', () => {
        component.close = jest.fn();
        const closeButton = component.getComponentElement().querySelector('.ual-modal-close');
        closeButton.click();
        expect(component.close).toBeCalled();
    });
    it('calls reset callback when here link is clicked for reset', () => {
        const resetLink = component.getComponentElement().querySelector('.ual-reset-link');
        resetLink.click();
        expect(onResetAuthenticatorsStub).toBeCalled();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2V0QXV0aGVudGljYXRvck1vZGFsLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tcG9uZW50cy9HZXRBdXRoZW50aWNhdG9yTW9kYWwudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhFQUEwRTtBQUMxRSxtRUFBK0Q7QUFFL0QsUUFBUSxDQUFDLHdCQUF3QixFQUFFLEdBQUcsRUFBRTtJQUN0QyxJQUFJLGVBQWUsQ0FBQTtJQUNuQixJQUFJLFNBQVMsQ0FBQTtJQUNiLElBQUksT0FBTyxDQUFBO0lBQ1gsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFBO0lBQ2hDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQTtJQUM3QixNQUFNLHlCQUF5QixHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQTtJQUUzQyxVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLDZDQUFxQixDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ3ZELGNBQWMsQ0FBQyxTQUFTLEVBQUUsQ0FBQTtRQUMxQixXQUFXLENBQUMsU0FBUyxFQUFFLENBQUE7UUFFdkIsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFBO1FBQzVCLGVBQWUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQy9DLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBQzFDLE9BQU8sR0FBRztZQUNSLGNBQWMsRUFBRSxDQUFDLGlCQUFpQixDQUFDO1lBQ25DLE9BQU8sRUFBRSxXQUFXO1lBQ3BCLGVBQWUsRUFBRSxjQUFjO1lBQy9CLDBCQUEwQixFQUFFLHlCQUF5QjtTQUN0RCxDQUFBO1FBRUQsU0FBUyxHQUFHLElBQUksNkNBQXFCLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDOUMsU0FBUyxDQUFD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