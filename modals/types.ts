import { modals } from './templates';

export type ModalName = keyof typeof modals;

export type ModalOptions = {
  onClose?: Function;
  onOpen?: Function;
  isClosable?: boolean;
};

export type ModalProps = any;

export type Modal = {
  name: ModalName;
  options?: ModalOptions;
  props?: ModalProps;
};
