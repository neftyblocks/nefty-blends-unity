"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest-localstorage-mock");
const UALJsDom_1 = require("./UALJsDom");
const BaseMockAuthenticator_1 = require("./AuthMocks/BaseMockAuthenticator");
describe('Authenticators', () => {
    let baseAuthenticator;
    let authenticatorLoginMock;
    let containerElement;
    beforeEach(() => {
        authenticatorLoginMock = jest.fn().mockResolvedValue([{}]);
        baseAuthenticator = new BaseMockAuthenticator_1.BaseMockAuthenticator([], null);
        baseAuthenticator.login = authenticatorLoginMock;
        document.body.innerHTML = `
      <div id="buttonContainer"></div>
    `;
        containerElement = document.getElementById('buttonContainer');
    });
    afterEach(() => {
        localStorage.clear();
        document.body.innerHTML = '';
    });
    it('renders inside the buttonContainer', () => {
        const mockLoginUserCallback = (authenticator, accountName) => {
            console.info(authenticator, accountName);
        };
        const ualDom = new UALJsDom_1.UALJsDom(mockLoginUserCallback, [baseAuthenticator], containerElement, false);
        ualDom.generateUIDom();
        expect(document.getElementById('buttonContainer').childNodes.length).toBeGreaterThan(0);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVUFMSnNEb20udGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9VQUxKc0RvbS50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0NBQStCO0FBRS9CLHlDQUFxQztBQUVyQyw2RUFBeUU7QUFFekUsUUFBUSxDQUFDLGdCQUFnQixFQUFFLEdBQUcsRUFBRTtJQUM5QixJQUFJLGlCQUFpQixDQUFBO0lBQ3JCLElBQUksc0JBQXNCLENBQUE7SUFDMUIsSUFBSSxnQkFBZ0IsQ0FBQTtJQUVwQixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2Qsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLGlCQUFpQixDQUFDLENBQUMsRUFBRSxDQUFXLENBQUMsQ0FBQTtRQUVwRSxpQkFBaUIsR0FBRyxJQUFJLDZDQUFxQixDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUN2RCxpQkFBaUIsQ0FBQyxLQUFLLEdBQUcsc0JBQXNCLENBQUE7UUFFaEQsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUc7O0tBRXpCLENBQUE7UUFFRCxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFFLENBQUE7SUFDaEUsQ0FBQyxDQUFDLENBQUE7SUFFRixTQUFTLENBQUMsR0FBRyxFQUFFO1FBQ2IsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFBO1FBRXBCLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQTtJQUM5QixDQUFDLENBQUMsQ0FBQTtJQUVGLEVBQUUsQ0FBQyxvQ0FBb0MsRUFBRSxHQUFHLEVBQUU7UUFDNUMsTUFBTSxxQkFBcUIsR0FBRyxDQUFDLGFBQTRCLEVBQUUsV0FBK0IsRUFBRSxFQUFFO1lBQzlGLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFBO1FBQzFDLENBQUMsQ0FBQTtRQUVELE1BQU0sTUFBTSxHQUFHLElBQUksbUJBQVEsQ0FDekIscUJBQXFCLEVBQ3JCLENBQUMsaUJBQWlCLENBQUMsRUFDbkIsZ0JBQWdCLEVBQ2hCLEtBQUssQ0FDTixDQUFBO1FBRUQsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFBO1FBRXRCLE1BQU0sQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUMxRixDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQyxDQUFBIn0=