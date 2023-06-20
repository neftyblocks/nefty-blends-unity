"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UALJsAbstractBaseComponent = void 0;
class UALJsAbstractBaseComponent {
    /**
     * Creates component container and attaches generated dom to it
     */
    constructor(options) {
        this.options = options;
        // attach our component to our internal dom
        this.dom = document.createElement('div');
        this.dom.appendChild(this.generateDom());
        // attach our styles to our dom
        this.styleElement = document.createElement('style');
        this.styleElement.innerHTML = this.generateStyles();
        this.dom.appendChild(this.styleElement);
    }
    /**
     * Shows the component
     */
    show() {
        this.dom.style.display = 'block';
    }
    /**
     * Hides the component
     */
    hide() {
        this.dom.style.display = 'none';
    }
    /**
     * Attaches the dom of the component to the provided parent
     * element
     *
     * @param parent element the component dom should attach to
     */
    attach(parent) {
        parent.appendChild(this.dom);
    }
    /**
     * Helper method to return the parent of the component
     */
    getComponentElement() {
        return this.dom;
    }
}
exports.UALJsAbstractBaseComponent = UALJsAbstractBaseComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVUFMSnNBYnN0cmFjdEJhc2VDb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvVUFMSnNBYnN0cmFjdEJhc2VDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBc0IsMEJBQTBCO0lBSzlDOztPQUVHO0lBQ0gsWUFBbUIsT0FBYTtRQUM5QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtRQUV0QiwyQ0FBMkM7UUFDM0MsSUFBSSxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3hDLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFBO1FBRXhDLCtCQUErQjtRQUMvQixJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDbkQsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFBO1FBQ25ELElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUN6QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxJQUFJO1FBQ1QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtJQUNsQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxJQUFJO1FBQ1QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQTtJQUNqQyxDQUFDO0lBWUQ7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsTUFBbUI7UUFDL0IsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDOUIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksbUJBQW1CO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQTtJQUNqQixDQUFDO0NBQ0Y7QUE3REQsZ0VBNkRDIn0=