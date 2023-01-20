import { ModalContext } from './ModalProvider';
import { ModalName, ModalOptions, ModalProps } from './types';
import { modalAnimationTime } from './ModalManager';
import React, { useCallback } from 'react';

const useModal = () => {
  const { activeModal, setActiveModal } = React.useContext(ModalContext);

  const close = useCallback(
    (response?: any) => {
      if (typeof activeModal?.options?.onClose === 'function') {
        setTimeout(() => {
          return (activeModal?.options?.onClose as Function)(response);
        }, modalAnimationTime);
      }

      return setActiveModal();
    },
    [activeModal, setActiveModal]
  );

  const open = useCallback(
    (name: ModalName, modalOptions?: { options?: ModalOptions; props?: ModalProps }) => {
      const modal = { name, ...modalOptions };

      if (activeModal) {
        return close(() =>
          setTimeout(() => {
            if (typeof modal?.options?.onOpen === 'function') {
              setTimeout(() => {
                return (modal?.options?.onOpen as Function)();
              }, modalAnimationTime);
            }

            return setActiveModal(modal);
          }, modalAnimationTime)
        );
      }

      if (typeof modal?.options?.onOpen === 'function') {
        setTimeout(() => {
          return (modal?.options?.onOpen as Function)();
        }, modalAnimationTime);
      }

      return setActiveModal(modal);
    },
    [activeModal, close, setActiveModal]
  );

  return { close, modal: activeModal, open };
};

export default useModal;
