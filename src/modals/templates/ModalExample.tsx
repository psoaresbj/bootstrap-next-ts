import { Heading, Text } from '../../theme/components/Typography';
import Div from '../../theme/components/Div';
import React from 'react';
import TextLink from '../../theme/components/TextLink';
import useModal from '../useModal';

export type ModalExampleProps = {
  heading?: string;
};

export const ModalExample = (props: ModalExampleProps) => {
  const { heading } = props;

  const { close } = useModal();

  const handleCloseLinkClick = () => close('using modal link click');

  return (
    <Div>
      {!!heading && <Heading h4>{heading}</Heading>}
      <Text $large $mt={1} $n06>
        This is an example Modal
      </Text>
      <Text $mt={2}>
        Click outside or <TextLink onClick={handleCloseLinkClick}>here</TextLink> to close it...
      </Text>
    </Div>
  );
};

ModalExample.defaultProps = {
  heading: null
};
