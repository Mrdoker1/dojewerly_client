import React, { createContext, useContext } from 'react';
import Modal from './Modal';
import styles from './Modal.module.css';
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { ModalType, closeModal as closeModalAction, openModal as openModalAction} from '../../app/reducers/modalSlice';

interface ModalContextProps {
  openModalWithContent: (type: ModalType, content: React.ReactNode, onClose?: () => void) => void;
  closeModal: () => void;  // Добавляем эту строку
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

interface ModalProviderProps {
  children: React.ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const modalState = useSelector((state: RootState) => state.modal); // RootState - это тип вашего главного состояния Redux.

  const openModalWithContent = (type: ModalType, content: React.ReactNode, onClose?: () => void) => {
    dispatch(openModalAction({ type, content, onClose }));
  };

  const closeModal = () => {
    dispatch(closeModalAction());
  };

  const closeModalHandler = () => {
    if (modalState.onClose) {
      modalState.onClose();
    } else {
      dispatch(closeModalAction());
    }
  };

  return (
    <ModalContext.Provider value={{ openModalWithContent, closeModal }}>
      {children}
      <AnimatePresence>
        {modalState.type && 
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.overlay}
            onClick={() => closeModalHandler()}
          >
            <Modal key={Date.now()} onClose={closeModalHandler}>{modalState.content}</Modal>
          </motion.div>}
      </AnimatePresence>
    </ModalContext.Provider>
  );
};
