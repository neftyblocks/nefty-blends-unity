"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseMockAuthenticator_1 = require("../AuthMocks/BaseMockAuthenticator");
const DownloadAuthenticatorModal_1 = require("./DownloadAuthenticatorModal");
describe('Download Authenticator Modal', () => {
    let parentContainer;
    let component;
    let options;
    let baseAuthenticator;
    const onCloseStub = jest.fn();
    const onGoBackStub = jest.fn();
    beforeEach(() => {
        baseAuthenticator = new BaseMockAuthenticator_1.BaseMockAuthenticator([]);
        baseAuthenticator.getStyle = () => {
            return {
                icon: 'racecar.png',
                text: 'Fast Car',
                textColor: 'yellow',
                background: 'red',
            };
        };
        onGoBackStub.mockReset();
        onCloseStub.mockReset();
        document.body.innerHTML = '';
        parentContainer = document.createElement('div');
        document.body.appendChild(parentContainer);
        options = {
            authenticators: [baseAuthenticator],
            onClose: onCloseStub,
            onGoBack: onGoBackStub
        };
        component = new DownloadAuthenticatorModal_1.DownloadAuthenticatorModal(options);
        component.attach(parentContainer);
    });
    describe('authenticator specific text', () => {
        it('Has Empty Title Text when rendered', () => {
            expect(component.getComponentElement().innerHTML).toContain('<p class="ual-modal-content-description"></p>');
        });
        it('Has Button Title Text when opened with authenticator', () => {
            component.open(baseAuthenticator);
            expect(component.getComponentElement().querySelector('.ual-modal-content-description').textContent).toEqual('Install Fast Car to Continue');
        });
        it('has empty text-box text when rendered', () => {
            expect(component.getComponentElement().innerHTML).toContain('<p class="ual-modal-text-box"></p>');
        });
        it('has Button Title text-box text when rendered', () => {
            component.open(baseAuthenticator);
            expect(component.getComponentElement().querySelector('.ual-modal-text-box').textContent).toEqual('To get started with Fast Car, install the app at the link below.');
        });
    });
    describe('authenticator specific ui', () => {
        it('colors the background', () => {
            component.open(baseAuthenticator);
            const htmlElement = component.getComponentElement().querySelector('#ual-modal-get-authenticator');
            expect(htmlElement.style.background).toEqual('red');
        });
        it('colors the text', () => {
            component.open(baseAuthenticator);
            const htmlElement = component.getComponentElement().querySelector('#ual-modal-get-authenticator');
            expect(htmlElement.style.color).toEqual('yellow');
            expect(htmlElement.querySelector('.ual-modal-content-description').style.color).toEqual('yellow');
        });
        it('sets href to the download link of the authenticator', () => {
            baseAuthenticator.getOnboardingLink = () => {
                return 'http://fast-car.io/get-fast-car';
            };
            component.open(baseAuthenticator);
            const htmlElement = component.getComponentElement().querySelector('.ual-leave-and-install');
            expect(htmlElement.getAttribute('href')).toEqual('http://fast-car.io/get-fast-car');
        });
    });
    it('hides when close is called', () => {
        component.getComponentElement().style.display = 'block';
        component.close();
        expect(component.getComponentElement().style.display).toBe('none');
    });
    describe('callback mapping', () => {
        it('calls onClose when onClose is called', () => {
            component.close();
            expect(onCloseStub).toBeCalled();
        });
        it('calls onGoBack when goBack is called', () => {
            component.goBack();
            expect(onGoBackStub).toBeCalled();
        });
        it('doesn\'t call onClose when the modal is already closed', () => {
            component.close();
            onCloseStub.mockReset();
            component.close();
            expect(onCloseStub).not.toBeCalled();
        });
        it('shows when open is called', () => {
            component.getComponentElement().style.display = 'none';
            component.open(baseAuthenticator);
            expect(component.getComponentElement().style.display).toBe('block');
        });
    });
    it('calls close callback close is clicked', () => {
        component.close = jest.fn();
        const closeButton = component.getComponentElement().querySelector('.ual-modal-close');
        closeButton.click();
        expect(component.close).toBeCalled();
    });
    it('calls onGoBack when onGoBack is clicked', () => {
        const goBackButton = component.getComponentElement().querySelector('.ual-go-back');
        goBackButton.click();
        expect(onGoBackStub).toBeCalled();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRG93bmxvYWRBdXRoZW50aWNhdG9yTW9kYWwudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL0Rvd25sb2FkQXV0aGVudGljYXRvck1vZGFsLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw4RUFBMEU7QUFDMUUsNkVBQXlFO0FBRXpFLFFBQVEsQ0FBQyw4QkFBOEIsRUFBRSxHQUFHLEVBQUU7SUFDNUMsSUFBSSxlQUFlLENBQUE7SUFDbkIsSUFBSSxTQUFTLENBQUE7SUFDYixJQUFJLE9BQU8sQ0FBQTtJQUNYLElBQUksaUJBQWlCLENBQUE7SUFFckIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFBO0lBQzdCLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQTtJQUU5QixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsaUJBQWlCLEdBQUcsSUFBSSw2Q0FBcUIsQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUNqRCxpQkFBaUIsQ0FBQyxRQUFRLEdBQUcsR0FBRyxFQUFFO1lBQ2hDLE9BQU87Z0JBQ0wsSUFBSSxFQUFFLGFBQWE7Z0JBQ25CLElBQUksRUFBRSxVQUFVO2dCQUNoQixTQUFTLEVBQUUsUUFBUTtnQkFDbkIsVUFBVSxFQUFFLEtBQUs7YUFDSCxDQUFBO1FBQ2xCLENBQUMsQ0FBQTtRQUVELFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQTtRQUN4QixXQUFXLENBQUMsU0FBUyxFQUFFLENBQUE7UUFFdkIsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFBO1FBQzVCLGVBQWUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQy9DLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBQzFDLE9BQU8sR0FBRztZQUNSLGNBQWMsRUFBRSxDQUFDLGlCQUFpQixDQUFD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