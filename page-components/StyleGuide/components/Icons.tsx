import { Text } from '../../../theme/components/Typography';
import { colors } from '../../../theme/variables';
import Div from '../../../theme/components/Div';
import Icon from '../../../theme/components/Icon';
import List from '../../../theme/components/List';
import React from 'react';
import StyleGuideSection from './StyleGuideSection';
import main from '../../../theme/components/Icon/main';
import styled from 'styled-components';

type IconName = keyof typeof main;

const IconPreview = styled.div`
  background-color: ${colors.n02};
  border-radius: 0.5rem;
  padding: 35%;
`;

const IconInfo = styled.div`
  text-align: center;
  padding: 1rem 0;
`;

const IconComponent: React.FC<{ icon: IconName }> = props => {
  const { icon } = props;

  return (
    <Div>
      <IconPreview>
        <Icon icon={icon} n06 sz="auto auto" />
      </IconPreview>
      <IconInfo>
        <Text semibold>{icon}</Text>
      </IconInfo>
    </Div>
  );
};

const Icons: React.FC = () => {
  return (
    <StyleGuideSection title="Icons">
      <Div pl={1} pr={1}>
        <List colSize={{ md: 5, sm: 4, xs: 2 }} space={{ md: 2, sm: 2, xs: 2 }}>
          {Object.keys(main).map((icon, index) => (
            <IconComponent icon={icon as IconName} key={index} />
          ))}
        </List>
      </Div>
    </StyleGuideSection>
  );
};

export default Icons;
