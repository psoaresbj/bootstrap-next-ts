import { Label, Text } from '../../../theme/components/Typography';
import { colors } from '../../../theme/variables';
import { rgba } from 'polished';
import Div from '../../../theme/components/Div';
import List from '../../../theme/components/List';
import React from 'react';
import StyleGuideSection from './StyleGuideSection';
import styled from 'styled-components';

type ColorProps = {
  name: string;
  value: string;
};

const ColorPreview = styled.div<{ $bg: string }>`
  background-color: ${({ $bg }) => $bg};
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 0.5rem ${rgba('#000', 0.25)};
  padding-bottom: 100%;
`;

const ColorInfo = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 1rem 1rem 0;
`;

const ColorComponent: React.FC<ColorProps> = props => {
  const { name, value } = props;

  return (
    <Div>
      <ColorPreview $bg={value} />
      <ColorInfo>
        <Text>{name}</Text>
        <Label>{value}</Label>
      </ColorInfo>
    </Div>
  );
};

const Colors: React.FC = () => {
  return (
    <StyleGuideSection title="Colors">
      <Div $pl={1} $pr={1}>
        <List colSize={{ md: 4, sm: 3, xs: 2 }} space={{ md: 2, sm: 2, xs: 2 }}>
          {Object.entries(colors).map(([name, value], index) => (
            <ColorComponent key={index} name={name} value={value} />
          ))}
        </List>
      </Div>
    </StyleGuideSection>
  );
};

export default Colors;
