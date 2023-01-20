import { Modal } from './types';
import ModalManager from './ModalManager';
import React, { createContext, useState } from 'react';

const initialContext = {
  setActiveModal: () => {}
};

type ModalContextProps = {
  activeModal?: Modal;
  setActiveModal: Function;
};

export const ModalContext = createContext<ModalContextProps>(initialContext);

type ModalProviderProps = {
  children: React.ReactNode;
};

export const ModalProvider = (props: ModalProviderProps) => {
  const { children } = props;

  const [activeModal, setActiveModal] = useState<Modal>();

  return (
    <ModalContext.Provider value={{ activeModal, setActiveModal }}>
      <ModalManager />
      {children}
    </ModalContext.Provider>
  );
};

export const ModalConsumer = ModalContext.Consumer;
