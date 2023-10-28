import React, { createContext, useContext, useState } from 'react';
import Modal from './Modal';
import styles from './Modal.module.css';
import { AnimatePresence, motion } from 'framer-motion';

interface ModalContextProps {
  isModalOpen: boolean;
  isModalClosable: boolean;
  openModal: () => void;
  closeModal: () => void;
  openModalWithContent: (content: React.ReactNode) => void;
  openBlockedModalWithContent: (content: React.ReactNode) => void,
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);
  const [isModalClosable, setIsModalClosable] = useState(true);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);  // очищаем контент после закрытия
    setIsModalClosable(true)
  };

  const openModalWithContent = (content: React.ReactNode) => {
    openModal();
    setModalContent(content);
  };

  const openBlockedModalWithContent = (content: React.ReactNode) => {
    setIsModalClosable(false); // Запрещаем закрытие модального окна
    setModalContent(content);  // Устанавливаем контент
    setIsModalOpen(true);      // Открываем модальное окно
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, isModalClosable, openModal, closeModal, openModalWithContent, openBlockedModalWithContent }}>
        {children}
        <AnimatePresence>
          {isModalOpen && 
            <motion.div
            initial={{ opacity: 0 }} // Начальное состояние (невидимо и наверху)
            animate={{ opacity: 1 }} // Анимация появления (опускается вниз)
            exit={{ opacity: 0 }} // Анимация исчезновения (поднимается вверх)
            className={styles.overlay}
            onClick={isModalClosable ? closeModal : () => {}}
          >
            <Modal key={Date.now()} isModalClosable={isModalClosable} onClose={closeModal}>{modalContent}</Modal>
          </motion.div>}
        </AnimatePresence>
    </ModalContext.Provider>
  );
};