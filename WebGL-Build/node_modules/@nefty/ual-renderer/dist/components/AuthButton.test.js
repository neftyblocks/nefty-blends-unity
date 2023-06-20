"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseMockAuthenticator_1 = require("../AuthMocks/BaseMockAuthenticator");
const AuthButton_1 = require("./AuthButton");
describe('AuthButton', () => {
    let basicAuthenticator;
    beforeEach(() => {
        document.body.innerHTML = '';
        basicAuthenticator = new BaseMockAuthenticator_1.BaseMockAuthenticator([]);
        basicAuthenticator.getStyle = () => {
            return {
                icon: 'racecar.png',
                text: 'Fast Car',
                textColor: 'yellow',
                background: 'red',
            };
        };
    });
    describe('basic rendering', () => {
        let authButton;
        beforeEach(() => {
            authButton = new AuthButton_1.AuthButton({ authenticator: basicAuthenticator });
            document.body.appendChild(authButton.getComponentElement());
        });
        it('renders name of authenticator', () => {
            const authText = [...document.getElementsByClassName('ual-auth-text')][0];
            expect(authText.innerHTML).toEqual('Fast Car');
        });
        it('renders icon of authenticator', () => {
            const authIcon = [...document.getElementsByClassName('ual-auth-icon')][0];
            expect(authIcon.getAttribute('src')).toEqual('racecar.png');
        });
        it('sets text color of authenticator', () => {
            const authButtonDiv = [...document.getElementsByClassName('ual-auth-text')][0];
            expect(authButtonDiv.getAttribute('style')).toContain('color: yellow');
        });
        it('sets background color of authenticator', () => {
            const authButtonDiv = [...document.getElementsByClassName('ual-auth-button')][0];
            expect(authButtonDiv.getAttribute('style')).toContain('background-color: red');
        });
        it('sets status icon of authenticator to chevron with happy base state', () => {
            const statusIconElements = [...document.getElementsByClassName('fa-chevron-right')];
            expect(statusIconElements.length).toEqual(1);
        });
    });
    it('is rendering download', () => {
        const authButton = new AuthButton_1.AuthButton({ authenticator: basicAuthenticator, showDownload: true });
        document.body.appendChild(authButton.getComponentElement());
        const statusIconElements = [...document.getElementsByClassName('fa-download')];
        expect(statusIconElements.length).toEqual(1);
    });
    describe('state renderering', () => {
        describe('is errored', () => {
            let authButton;
            beforeEach(() => {
                // put our authenticator into an errored state
                basicAuthenticator.isErrored = jest.fn().mockReturnValue(true);
                basicAuthenticator.getError = jest.fn().mockReturnValue(new Error('An unfortunate event'));
                authButton = new AuthButton_1.AuthButton({ authenticator: basicAuthenticator });
                document.body.appendChild(authButton.getComponentElement());
            });
            it('shows error icon', () => {
                const statusIconElements = [...document.getElementsByClassName('fa-exclamation-circle')];
                expect(statusIconElements.length).toEqual(1);
            });
            it('populates error tooltip', () => {
                const authButtonDiv = [...document.getElementsByClassName('ual-auth-button')][0];
                expect(authButtonDiv.getAttribute('data-tippy-content')).toEqual('An unfortunate event');
            });
            it('styles background to error color', () => {
                const authButtonDiv = [...document.getElementsByClassName('ual-auth-button')][0];
                expect(authButtonDiv.getAttribute('style')).toContain('background-color: #D5D8E2');
            });
            it('styles text to error color', () => {
                const authButtonDiv = [...document.getElementsByClassName('ual-auth-text')][0];
                expect(authButtonDiv.getAttribute('style')).toContain('color: #9096A8');
            });
        });
        describe('is loading', () => {
            let authButton;
            beforeEach(() => {
                // put our authenticator into an errored state
                basicAuthenticator.isLoading = jest.fn().mockReturnValue(true);
                authButton = new AuthButton_1.AuthButton({ authenticator: basicAuthenticator });
                document.body.appendChild(authButton.getComponentElement());
            });
            it('shows loading icon', () => {
                const statusIconElements = [...document.getElementsByClassName('ual-spinner')];
                expect(statusIconElements.length).toEqual(1);
            });
        });
    });
    it('calls onClick callback when clicked', () => {
        const clickCallbackMock = jest.fn();
        const authButton = new AuthButton_1.AuthButton({ authenticator: basicAuthenticator, onClick: clickCallbackMock });
        document.body.appendChild(authButton.getComponentElement());
        const component = document.getElementsByClassName('ual-auth-button')[0];
        component.click();
        expect(clickCallbackMock).toBeCalled();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0aEJ1dHRvbi50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbXBvbmVudHMvQXV0aEJ1dHRvbi50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsOEVBQTBFO0FBQzFFLDZDQUF5QztBQUV6QyxRQUFRLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUMxQixJQUFJLGtCQUFrQixDQUFBO0lBRXRCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUE7UUFDNUIsa0JBQWtCLEdBQUcsSUFBSSw2Q0FBcUIsQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUNsRCxrQkFBa0IsQ0FBQyxRQUFRLEdBQUcsR0FBRyxFQUFFO1lBQ2pDLE9BQU87Z0JBQ0wsSUFBSSxFQUFFLGFBQWE7Z0JBQ25CLElBQUksRUFBRSxVQUFVO2dCQUNoQixTQUFTLEVBQUUsUUFBUTtnQkFDbkIsVUFBVSxFQUFFLEtBQUs7YUFDSCxDQUFBO1FBQ2xCLENBQUMsQ0FBQTtJQUNILENBQUMsQ0FBQyxDQUFBO0lBRUYsUUFBUSxDQUFDLGlCQUFpQixFQUFFLEdBQUcsRUFBRTtRQUMvQixJQUFJLFVBQVUsQ0FBQTtRQUVkLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxVQUFVLEdBQUcsSUFBSSx1QkFBVSxDQUFDLEVBQUUsYUFBYSxFQUFFLGtCQUFrQixFQUFFLENBQUMsQ0FBQTtZQUNsRSxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFBO1FBQzdELENBQUMsQ0FBQyxDQUFBO1FBRUYsRUFBRSxDQUFDLCtCQUErQixFQUFFLEdBQUcsRUFBRTtZQUN2QyxNQUFNLFFBQVEsR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDLHNCQUFzQixDQUFDLGVBQWUsQ0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDMUUsTUFBTSxD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