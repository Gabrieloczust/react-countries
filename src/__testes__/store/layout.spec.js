import reducer, { openModal, closeModal } from '../../store/layout'

describe('Layout Reducer', () => {
    test('should check the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            modal: {
                open: false
            }
        });
    });

    test('should check if modal is open', () => {
        expect(reducer(undefined, {
            type: openModal.type
        })).toEqual({
            modal: {
                open: true
            }
        });
    });

    test('should check if modal is close', () => {
        expect(reducer(undefined, {
            type: closeModal.type
        })).toEqual({
            modal: {
                open: false
            }
        });
    });
})