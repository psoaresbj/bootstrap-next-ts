import { ModalOptions } from './types';
import { colors } from '../theme/variables';
import { mq, transitions } from '../theme/helpers';
import { position, rgba } from 'polished';
import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import useModal from './useModal';

const Backdrop = styled.div<{ $isActive?: boolean }>`
  ${position('absolute', 0)};
  ${transitions('opacity', 200, 'inOutSine')};

  background-color: ${rgba(colors.n01, 0.9)};
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
  z-index: 1;
`;

const ContentContainer = styled.div<{ $isActive?: boolean }>`
  ${transitions(['opacity', 'transform'], 450, 'inOutCirc')};

  background-color: ${colors.n01};
  border-radius: 0.25rem;
  height: 100%;
  opacity: 0;
  overflow-y: auto;
  padding: 2rem;
  position: relative;
  transform: translateY(2rem);
  width: 100%;
  z-index: 10;

  ${mq.sm(css`
    box-shadow: 0 0 2rem ${rgba(colors.n06, 0.1)};
    height: unset;
    max-height: 50vh;
    max-width: 25rem;
  `)}

  ${({ $isActive }) =>
    $isActive &&
    css`
      opacity: 1;
      transform: translateY(0);
    `}
`;

const Wrapper = styled.div`
  ${position('fixed', 0)};

  align-items: center;
  display: flex;
  justify-content: center;
  z-index: 999999;
`;

export type ModalProps<T> = {
  isActive?: boolean;
  options?: ModalOptions;
} & T;

const defaultOptions: ModalOptions = {
  isClosable: true
};

const BaseModal = (props: ModalProps<{ children: any }>) => {
  const { children, isActive, options: optionsFromProps } = props;

  const [options, setOptions] = useState(optionsFromProps);

  useEffect(() => {
    setOptions({ ...defaultOptions, ...optionsFromProps });
  }, [optionsFromProps]);

  const { isClosable } = options || {};

  const { close } = useModal();

  const handleBackdropClick = useCallback(() => {
    if (!isClosable) {
      return;
    }

    return close();
  }, [close, isClosable]);

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (!isClosable) {
        return;
      }

      if (event.keyCode === 27 && isClosable) {
        return close();
      }
    };

    document.addEventListener('keydown', handleKeyDown, false);

    return () => {
      document.addEventListener('keydown', handleKeyDown, false);
    };
  }, [close, isClosable]);

  return (
    <Wrapper>
      <Backdrop $isActive={isActive} onClick={handleBackdropClick} />
      <ContentContainer $isActive={isActive}>{children}</ContentContainer>
    </Wrapper>
  );
};

BaseModal.defaultProps = {
  isActive: false,
  options: null
};

export default BaseModal;
