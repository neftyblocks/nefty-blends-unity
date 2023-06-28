"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UALJsAbstractBaseComponent_1 = require("./UALJsAbstractBaseComponent");
class TestComponent extends UALJsAbstractBaseComponent_1.UALJsAbstractBaseComponent {
    generateStyles() {
        return '.class { color: blue }';
    }
    generateDom() {
        return document.createElement('span');
    }
}
describe('UALJsBaseComponent', () => {
    let component;
    let parentContainer;
    beforeEach(() => {
        document.body.innerHTML = '';
        component = new TestComponent();
        parentContainer = document.createElement('div');
    });
    it('attaches its dom to the provided container element', () => {
        component.attach(parentContainer);
        expect(parentContainer.childNodes.length).toEqual(1);
    });
    it('returns the dom container element when requested', () => {
        component.attach(parentContainer);
        const componentElement = component.getComponentElement();
        expect(parentContainer.childNodes[0]).toEqual(componentElement);
    });
    it('attaches its styles to the container element', () => {
        const style = [...component.getComponentElement().childNodes].find((element) => {
            return element instanceof HTMLStyleElement;
        });
        expect(style).not.toBeUndefined();
        expect(style.innerHTML).toEqual('.class { color: blue }');
    });
    it('hides when hide is called', () => {
        component.show();
        expect(component.getComponentElement().style.display).toEqual('block');
    });
    it('shows when show is called', () => {
        component.hide();
        expect(component.getComponentElement().style.display).toEqual('none');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVUFMSnNBYnN0cmFjdEJhc2VDb21wb25lbnQudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9VQUxKc0Fic3RyYWN0QmFzZUNvbXBvbmVudC50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkVBQXlFO0FBRXpFLE1BQU0sYUFBYyxTQUFRLHVEQUEwQjtJQUMxQyxjQUFjO1FBQ3RCLE9BQU8sd0JBQXdCLENBQUE7SUFDakMsQ0FBQztJQUVTLFdBQVc7UUFDbkIsT0FBTyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3ZDLENBQUM7Q0FDRjtBQUVELFFBQVEsQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLEVBQUU7SUFDbEMsSUFBSSxTQUFTLENBQUE7SUFDYixJQUFJLGVBQWUsQ0FBQTtJQUVuQixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFBO1FBRTVCLFNBQVMsR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFBO1FBQy9CLGVBQWUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2pELENBQUMsQ0FBQyxDQUFBO0lBRUYsRUFBRSxDQUFDLG9EQUFvRCxFQUFFLEdBQUcsRUFBRTtRQUM1RCxTQUFTLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBRWpDLE1BQU0sQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUN0RCxDQUFDLENBQUMsQ0FBQTtJQUVGLEVBQUUsQ0FBQyxrREFBa0QsRUFBRSxHQUFHLEVBQUU7UUFDMUQsU0FBUyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUNqQyxNQUFNLGdCQUFnQixHQUFHLFNBQVMsQ0FBQyxtQkFBbUIsRUFBRSxDQUFBO1FBRXhELE1BQU0sQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUE7SUFDakUsQ0FBQyxDQUFDLENBQUE7SUFFRixFQUFFLENBQUMsOENBQThDLEVBQUUsR0FBRyxFQUFFO1FBQ3RELE1BQU0sS0FBSyxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFvQixFQUFFLEVBQUU7WUFDMUYsT0FBTyxPQUFPLFlBQVksZ0JBQWdCLENBQUE7UUFDNUMsQ0FBQyxDQUFDLENBQUE7UUFFRixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFBO1FBQ2pDLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLHdCQUF3QixDQUFDLENBQUE7SUFDM0QsQ0FBQyxDQUFDLENBQUE7SUFFRixFQUFFLENBQUMsMkJBQTJCLEVBQUUsR0FBRyxFQUFFO1FBQ25DLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUNoQixNQUFNLENBQUMsU0FBUyxDQUFDLG1CQUFtQixFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUN4RSxDQUFDLENBQUMsQ0FBQTtJQUVGLEVBQUUsQ0FBQywyQkFBMkIsRUFBRSxHQUFHLEVBQUU7UUFDbkMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFBO1FBQ2hCLE1BQU0sQ0FBQyxTQUFTLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3ZFLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFDLENBQUEifQ==