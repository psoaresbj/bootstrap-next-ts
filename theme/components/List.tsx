import { GeneratedProps, MqBoolProps, MqProps } from '../types';
import { applyMqProps } from '../helpers/applyMqProps';
import { applyToProp } from '../helpers/applyToProp';
import { generateProps } from '@psoares/styled-utils';
import { hideScrollbar, unsetHiddenScrollbar } from '../utils';
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

const Li = styled.li<ListProps>`
  flex-shrink: 0;
  white-space: normal;

  ${({ space }) =>
    applyMqProps(
      space,
      (spaceValue: NumberOrArray) => css`
        padding: ${setSpacing(spaceValue)};
      `
    )};

  ${({ colSize }) =>
    applyMqProps(
      colSize,
      (colSizeValue: number) => css`
        width: ${100 / colSizeValue}%;
      `
    )};
`;

const Ul = styled.ul<ListProps>`
  display: flex;
  flex-wrap: wrap;
  list-style: none;

  ${({ space }) =>
    applyMqProps(
      space,
      (spaceValue: NumberOrArray) => css`
        margin: -${setSpacing(spaceValue)};
      `
    )}

  ${({ isScrollable }) =>
    applyToProp(isScrollable, [
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
    ])};

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
