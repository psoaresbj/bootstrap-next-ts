import { Text } from '../../theme/components/Typography';
import { colors } from '../../theme/variables';
import { position, rgba } from 'polished';
import { transitions } from '../../theme/helpers';
import Div from '../../theme/components/Div';
import React from 'react';
import TextLink from '../../theme/components/TextLink';
import styled, { css } from 'styled-components';

const Wrapper = styled.div<{ isVisible?: boolean }>`
  ${position('fixed', null, '3rem', '3rem', null)};
  ${transitions(['opacity', 'transform'], 450, 'inOutCirc')};

  background-color: ${colors.n01};
  border-radius: 0.25rem;
  box-shadow: 0 0 2rem ${rgba(colors.n06, 0.1)};
  opacity: 0;
  padding: 2rem;
  transform: translateX(100%);

  ${({ isVisible }) =>
    isVisible &&
    css`
      opacity: 1;
      transform: translateX(0);
    `}
`;

type CookieConsentRequestProps = {
  handleRequestAnswer: Function;
  isVisible?: boolean;
};

const CookieConsentRequest = (props: CookieConsentRequestProps) => {
  const { handleRequestAnswer, isVisible } = props;

  return (
    <Wrapper isVisible={isVisible}>
      <Div>
        <Text>Do you consent?</Text>
        <Div>
          <TextLink onClick={() => handleRequestAnswer(true)}>Yes</TextLink> |{' '}
          <TextLink onClick={() => handleRequestAnswer(false)}>No</TextLink>
        </Div>
      </Div>
    </Wrapper>
  );
};

CookieConsentRequest.defaultProps = {
  handleRequestAnswer: () => {},
  isVisible: false
};

export default CookieConsentRequest;
