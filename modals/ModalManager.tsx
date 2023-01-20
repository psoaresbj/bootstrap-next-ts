import { Modal } from './types';
import { modals } from './templates';
import BaseModal from './BaseModal';
import React, { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import useModal from './useModal';

export const modalAnimationTime = 500;

const ModalManager = () => {
  const { modal } = useModal();

  const [currentModal, setCurrentModal] = useState<Modal | null>();
  const [activeModal, setActiveModal] = useState<Modal | null>();

  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (modal?.name !== currentModal?.name) {
      const { name } = modal || {};

      if (modals?.[name as keyof typeof modals]) {
        setCurrentModal(modal);
      }

      if (!name) {
        setCurrentModal(null);
      }
    }
  }, [modal, currentModal]);

  useEffect(() => {
    if (!!currentModal?.name && currentModal?.name !== activeModal?.name) {
      setIsMounted(true);
      setActiveModal(currentModal);

      setTimeout(() => {
        document.getElementsByTagName('html')?.[0].classList.add('modal-open');

        return setIsVisible(true);
      }, 100);
    }

    if (!currentModal?.name && !!activeModal?.name) {
      setIsVisible(false);

      setTimeout(() => {
        setIsMounted(false);
        document.getElementsByTagName('html')?.[0].classList.remove('modal-open');

        return setActiveModal(null);
      }, modalAnimationTime);
    }
  }, [currentModal, activeModal]);

  const ModalComponent = useMemo(() => modals[activeModal?.name as keyof typeof modals], [activeModal]);

  if (!isMounted || !ModalComponent) {
    return null;
  }

  const { options, props: modalProps } = activeModal || {};

  return ReactDOM.createPortal(
    <BaseModal isActive={isVisible} {...options}>
      <ModalComponent {...modalProps} />
    </BaseModal>,
    document.body
  );
};

export default ModalManager;
