import React from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { closeModal, isModalOpen, modalDetails } from '../store/modal';

const Modal: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(isModalOpen); //Check if modal is open
  const details = useAppSelector(modalDetails); //Get modal details

  //Check if modal is opened return null if closed
  if (!isOpen) {
    return null;
  }

  //Closes the modal
  const handleClose = () => {
    dispatch(closeModal());
  }

  // TODO --- a function will be triggered.
  const handleConfirm = () => {
    dispatch(details.onConfirm)
    dispatch(closeModal());
  }

  return (
    <div
      className="flex z-50 fixed justify-center items-center w-full h-full left-0 top-0"
      onClick={handleClose}
    >
      <div
        className="flex flex-col justify-between rounded-md bg-black opacity-60 h-1/4 w-9/12 sm:w-7/12 md:w-1/2 lg:w-1/3 xl:w-1/4 p-3"
        onClick={(e) => e.stopPropagation()} //Do not close modal if clicked inside
      >
        <header className="text-white text-lg font-semibold break-words">{details.title}</header>
        <p className="text-white text-base font break-words">{details.text}</p>
        <div className="flex flex-row justify-end w-full">
          {details.isConfirmButtonActive && (
            <button
              className="bg-green-300 mr-3 w-24 h-7 rounded-md hover:scale-110 duration-75 hover:bg-green-500 text-black font-bold"
              onClick={handleConfirm}
            >
              {details.confirmButtonText}
            </button>
          )}
          <button
            className="bg-red-300 w-24 h-7 rounded-md hover:scale-110 duration-75 hover:bg-red-500 font-bold text-black"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
