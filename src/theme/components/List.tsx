import { GeneratedProps, MqBoolProps, MqProps } from '../types';
import { applyNamedProp, applyVariableProp, generateProps } from 'styled-gen';
import { hideScrollbar, unsetHiddenScrollbar } from '../helpers';
import React from 'react';
import styled, { css } from 'styled-components';

type NumberOrArray = number | number[];

const setSpacing = (spaceValue: NumberOrArray) =>
  Array.isArray(spaceValue) ? `${spaceValue[0] / 2}rem ${spaceValue[1] / 2}rem` : `${spaceValue / 2}rem`;

type ListProps = {
  children: React.ReactNode;
  colSize?: MqProps<NumberOrArray>;
  isScrollable?: MqBoolProps;
  space?: MqProps<NumberOrArray>;
} & GeneratedProps;

const setConfig = {
  shouldForwardProp: (prop: any) => !['colSize', 'isScrollable', 'space'].includes(prop)
};

const Li = styled.li.withConfig(setConfig)<ListProps>`
  flex-shrink: 0;
  white-space: normal;

  ${applyVariableProp(
    'space',
    (spaceValue: NumberOrArray) => css`
      padding: ${setSpacing(spaceValue)};
    `,
    { useTransientPrefix: false }
  )}

  ${applyVariableProp(
    'colSize',
    (colSizeValue: number) => css`
      width: ${100 / colSizeValue}%;
    `,
    { useTransientPrefix: false }
  )}
`;

const Ul = styled.ul.withConfig(setConfig)<ListProps>`
  display: flex;
  flex-wrap: wrap;
  list-style: none;

  ${applyVariableProp(
    'space',
    (spaceValue: NumberOrArray) => css`
      margin: -${setSpacing(spaceValue)};
    `,
    { useTransientPrefix: false }
  )}

  ${applyNamedProp(
    'isScrollable',
    [
      css`
        flex-wrap: nowrap;
        overflow-x: scroll;
        white-space: nowrap;

        -webkit-overflow-scrolling: touch;

        ${hideScrollbar};
      `,
      css`
        flex-wrap: wrap;
        overflow-x: unset;
        white-space: normal;

        -webkit-overflow-scrolling: unset;

        ${unsetHiddenScrollbar};
      `
    ],
    { useTransientPrefix: false }
  )};

  ${generateProps}
`;

const Wrapper = styled.div<GeneratedProps>`
  ${generateProps};
`;

const List: React.FC<ListProps> = props => {
  const { children, colSize, isScrollable, space, ...forwardProps } = props;

  return (
    <Wrapper {...forwardProps}>
      <Ul isScrollable={isScrollable} space={space}>
        {React.Children.map(children, (child: any) => (
          <Li colSize={colSize} {...child?.props} space={space}>
            {React.cloneElement(child, { ...child?.props })}
          </Li>
        ))}
      </Ul>
    </Wrapper>
  );
};

List.defaultProps = {
  colSize: 1,
  isScrollable: undefined,
  space: 1
};

export default List;
