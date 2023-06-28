"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MessageModal_1 = require("./MessageModal");
describe('Message Modal', () => {
    let modalInstance;
    beforeEach(() => {
        modalInstance = new MessageModal_1.MessageModal();
    });
    it('Displays Message title', () => {
        modalInstance.showMessage({
            title: 'Modal Title',
            message: 'Modal Message Content'
        });
        expect(modalInstance.getComponentElement().innerHTML).toContain('Modal Title');
        expect(modalInstance.getComponentElement().innerHTML).toContain('Modal Message Content');
    });
    describe('Message Colors', () => {
        it('displays error messages in red', () => {
            modalInstance.showMessage({
                title: 'Error Title',
                message: 'Modal Error Content',
                type: MessageModal_1.MessageTypes.ERROR
            });
            const messageContentDiv = modalInstance.getComponentElement().querySelector('#ual-modal-message');
            expect(messageContentDiv.style.color).toEqual('red');
        });
        it('displays success messages in green', () => {
            modalInstance.showMessage({
                title: 'Success Title',
                message: 'Modal Success Content',
                type: MessageModal_1.MessageTypes.SUCCESS
            });
            const messageContentDiv = modalInstance.getComponentElement().querySelector('#ual-modal-message');
            expect(messageContentDiv.style.color).toEqual('green');
        });
        it('displays non typed messages in black', () => {
            modalInstance.showMessage({
                title: 'Success Title',
                message: 'Modal Success Content'
            });
            const messageContentDiv = modalInstance.getComponentElement().querySelector('#ual-modal-message');
            expect(messageContentDiv.style.color).toEqual('black');
        });
    });
    it('hides when close is called', () => {
        const closeButton = modalInstance.getComponentElement().querySelector('.ual-modal-close');
        closeButton.click();
        expect(modalInstance.getComponentElement().style.display).toBe('none');
    });
    describe('callback mapping', () => {
        const onCloseStub = jest.fn();
        beforeEach(() => {
            onCloseStub.mockReset();
            modalInstance = new MessageModal_1.MessageModal();
            modalInstance.showMessage({
                title: 'Success Title',
                message: 'Modal Success Content',
                onClose: onCloseStub
            });
        });
        it('calls onClose when onClose is called', () => {
            modalInstance.close();
            expect(onCloseStub).toBeCalledTimes(1);
        });
        it('doesn\'t call onClose when the modal is already closed', () => {
            modalInstance.close();
            onCloseStub.mockReset();
            modalInstance.close();
            expect(onCloseStub).not.toBeCalled();
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVzc2FnZU1vZGFsLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tcG9uZW50cy9NZXNzYWdlTW9kYWwudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlEQUEyRDtBQUUzRCxRQUFRLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtJQUM3QixJQUFJLGFBQWEsQ0FBQTtJQUNqQixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsYUFBYSxHQUFHLElBQUksMkJBQVksRUFBRSxDQUFBO0lBQ3BDLENBQUMsQ0FBQyxDQUFBO0lBRUYsRUFBRSxDQUFDLHdCQUF3QixFQUFFLEdBQUcsRUFBRTtRQUNoQyxhQUFhLENBQUMsV0FBVyxDQUFDO1lBQ3hCLEtBQUssRUFBRSxhQUFhO1lBQ3BCLE9BQU8sRUFBRSx1QkFBdUI7U0FDakMsQ0FBQyxDQUFBO1FBRUYsTUFBTSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQTtRQUM5RSxNQUFNLENBQUMsYUFBYSxDQUFDLG1CQUFtQixFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUFDLHVCQUF1QixDQUFDLENBQUE7SUFDMUYsQ0FBQyxDQUFDLENBQUE7SUFFRixRQUFRLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxFQUFFO1FBQzlCLEVBQUUsQ0FBQyxnQ0FBZ0MsRUFBRSxHQUFHLEVBQUU7WUFDeEMsYUFBYSxDQUFDLFdBQVcsQ0FBQztnQkFDeEIsS0FBSyxFQUFFLGFBQWE7Z0JBQ3BCLE9BQU8sRUFBRSxxQkFBcUI7Z0JBQzlCLElBQUksRUFBRSwyQkFBWSxDQUFDLEtBQUs7YUFDekIsQ0FBQyxDQUFBO1lBRUYsTUFBTSxpQkFBaUIsR0FBRyxhQUFhLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMsQ0FBQTtZQUVqRyxNQUFNLENBQUMsaUJBQWlCLENB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