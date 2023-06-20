"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseMockAuthenticator_1 = require("../AuthMocks/BaseMockAuthenticator");
const AccountInputModal_1 = require("./AccountInputModal");
describe('Account Input Modal', () => {
    let component;
    const onGoBackMock = jest.fn();
    const onCloseMock = jest.fn();
    const loginMock = jest.fn();
    beforeEach(() => {
        onGoBackMock.mockReset();
        onCloseMock.mockReset();
        loginMock.mockReset();
        component = new AccountInputModal_1.AccountInputModal({
            onGoBack: onGoBackMock,
            onClose: onCloseMock
        });
        document.body.innerHTML = '';
        const parentContainer = document.createElement('div');
        document.body.appendChild(parentContainer);
        component.attach(parentContainer);
    });
    describe('auth button', () => {
        let authButton;
        let accountInput;
        beforeEach(() => {
            component.showInput(new BaseMockAuthenticator_1.BaseMockAuthenticator([]), loginMock);
            authButton = component.getComponentElement().querySelector('.ual-auth-button');
            accountInput = component.getComponentElement().querySelector('#ual-account-input');
        });
        it('calls login with valid input', () => {
            accountInput.value = 'validinputworks';
            authButton.click();
            expect(loginMock).toBeCalled();
        });
        it('does not call login with invalid input', () => {
            accountInput.value = '';
            authButton.click();
            expect(loginMock).not.toBeCalled();
        });
        it('displays error when clicked and input is invalid', () => {
            accountInput.valid = '';
            authButton.click();
            const errorMessage = component.getComponentElement().querySelector('#ual-account-input-error');
            expect(errorMessage.innerHTML).toEqual('Account Name is required');
        });
        it('cleans up validation error when clicked after fixing invalid data', () => {
            // start with invalid
            accountInput.value = '';
            authButton.click();
            // change to valid
            accountInput.value = 'somethingvalid';
            authButton.click();
            const errorMessage = component.getComponentElement().querySelector('#ual-account-input-error');
            expect(errorMessage.innerHTML).toEqual('');
        });
    });
    describe('whens shown', () => {
        it('renders auth button', () => {
            const buttonContainer = component.getComponentElement().querySelector('#ual-input-continue-button-container');
            component.showInput(new BaseMockAuthenticator_1.BaseMockAuthenticator([]));
            expect(buttonContainer.children.length).toEqual(1);
        });
    });
    describe('when closed', () => {
        let closeButton;
        beforeEach(() => {
            closeButton = component.getComponentElement().querySelector('.ual-modal-close');
        });
        it('resets input field', () => {
            const accountInput = component.getComponentElement().querySelector('#ual-account-input');
            accountInput.value = 'weeee';
            closeButton.click();
            expect(accountInput.value).toEqual('');
        });
        it('calls close callback', () => {
            closeButton.click();
            expect(onCloseMock).toBeCalled();
        });
        it('hides', () => {
            closeButton.click();
            expect(component.getComponentElement().style.display).toEqual('none');
        });
    });
    describe('when Go Back is clicked', () => {
        it('calls onGoBack', () => {
            const goBackButton = component.getComponentElement().querySelector('.ual-go-back');
            goBackButton.click();
            expect(onGoBackMock).toBeCalled();
        });
    });
    it('only renders one button even if opened multiple times', () => {
        component.showInput(new BaseMockAuthenticator_1.BaseMockAuthenticator([]), loginMock);
        component.showInput(new BaseMockAuthenticator_1.BaseMockAuthenticator([]), loginMock);
        const buttonContainer = component.getComponentElement().querySelector('#ual-input-continue-button-container');
        expect(buttonContainer.children.length).toEqual(1);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWNjb3VudElucHV0TW9kYWwudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL0FjY291bnRJbnB1dE1vZGFsLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw4RUFBMEU7QUFDMUUsMkRBQXVEO0FBRXZELFFBQVEsQ0FBQyxxQkFBcUIsRUFBRSxHQUFHLEVBQUU7SUFDbkMsSUFBSSxTQUFTLENBQUE7SUFDYixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUE7SUFDOUIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFBO0lBQzdCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQTtJQUUzQixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFBO1FBQ3hCLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQTtRQUN2QixTQUFTLENBQUMsU0FBUyxFQUFFLENBQUE7UUFFckIsU0FBUyxHQUFHLElBQUkscUNBQWlCLENBQUM7WUFDaEMsUUFBUSxFQUFFLFlBQVk7WUFDdEIsT0FBTyxFQUFFLFdBQVc7U0FDckIsQ0FBQyxDQUFBO1FBRUYsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFBO1FBRTVCLE1BQU0sZUFBZSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDckQsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLENBQUE7UUFFMUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQTtJQUNuQyxDQUFDLENBQUMsQ0FBQTtJQUVGLFFBQVEsQ0FBQyxhQUFhLEVBQUUsR0FBRyxFQUFFO1FBQzNCLElBQUksVUFBVSxDQUFBO1FBQ2QsSUFBSSxZQUFZLENBQUE7UUFDaEIsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNk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