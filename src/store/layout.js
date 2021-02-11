import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
    name: 'layout',
    initialState: {
        modal: {
            open: false,
        }
    },
    reducers: {
        openModal: state => {
            state.modal.open = true
        },
        closeModal: state => {
            state.modal.open = false
        },
    }
})

export default slice.reducer

// Actions
export const { openModal, closeModal } = slice.actions