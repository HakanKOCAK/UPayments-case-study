import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './';

export interface ModalState {
  title: string,
  text: string,
  isConfirmButtonActive: boolean,
  confirmButtonText: string,
  onConfirm: () => any
}

const initialState = {
  isOpen: false,
  title: '',
  text: '',
  isConfirmButtonActive: false,
  confirmButtonText: '',
  onConfirm: () => null
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    open: (state, action: PayloadAction<ModalState>) => {
      state.isOpen = true;
      state.title = action.payload.title;
      state.text = action.payload.text;
      state.isConfirmButtonActive = action.payload.isConfirmButtonActive;
      state.confirmButtonText = action.payload.confirmButtonText;
      state.onConfirm = action.payload.onConfirm;
    },
    close: (state) => {
      state.isOpen = false;
      state.title = '';
      state.text = '';
      state.isConfirmButtonActive = false;
      state.confirmButtonText = '';
      state.onConfirm = () => null;
    }
  }
});

export const isModalOpen = (state: RootState) => state.modal.isOpen;
export const modalDetails = (state: RootState) => state.modal;

export const { open: openModal, close: closeModal } = modalSlice.actions;

export default modalSlice.reducer;
