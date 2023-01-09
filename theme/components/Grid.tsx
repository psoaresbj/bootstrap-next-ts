import { Alignments, GeneratedProps, MqBoolProps, MqProps, VerticalAlignments } from '../types';
import { Theme, generateProps } from '@psoares/styled-utils';
import { applyMqProps } from '../helpers/applyMqProps';
import { applyToProp } from '../helpers/applyToProp';
import styled, { css } from 'styled-components';

const defaults = {
  cols: 12,
  gutter: 1.5,
  margin: 1.5,
  width: 67.5
};

export const Grid = styled.div<GeneratedProps>`
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  max-width: ${({ grid }: Theme) => grid?.width || defaults.width}rem;
  padding-left: ${({ grid }: Theme) => grid?.margin || defaults.margin}rem;
  padding-right: ${({ grid }: Theme) => grid?.margin || defaults.margin}rem;
  width: 100%;

  ${generateProps}
`;

const alignmentPropsMap = {
  horizontal: {
    center: 'center',
    left: 'flex-start',
    right: 'flex-end'
  },

  vertical: {
    bottom: 'flex-end',
    middle: 'center',
    top: 'flex-start'
  }
};

type TopProps = {
  alignContent?: MqProps<Alignments>;
  reverse?: MqBoolProps;
} & GeneratedProps;

export const Row = styled.div<TopProps>`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: ${({ grid }: Theme) => -((grid?.gutter || defaults.gutter) / 2)}rem;
  margin-right: ${({ grid }: Theme) => -((grid?.gutter || defaults.gutter) / 2)}rem;

  ${({ reverse }) => css`
    ${applyToProp(
      reverse,
      css`
        flex-direction: row-reverse;
      `
    )}
  `};

  ${({ alignContent }) => css`
    ${applyMqProps(alignContent, (value: Alignments) => {
      const [hAlignment, vAlignment] = value.split(' ');

      const alignItems =
        alignmentPropsMap.vertical[hAlignment as keyof typeof alignmentPropsMap.vertical] ||
        alignmentPropsMap.vertical[vAlignment as keyof typeof alignmentPropsMap.vertical];
      const justifyContent = alignmentPropsMap.horizontal[hAlignment as keyof typeof alignmentPropsMap.horizontal];

      return css`
        align-items: ${alignItems};
        justify-content: ${justifyContent};
      `;
    })}
  `};

  ${generateProps}
`;

type ColProps = {
  alignSelf?: MqProps<VerticalAlignments>;
  colSize?: MqProps<number>;
  push?: MqProps<number>;
} & GeneratedProps;

export const Col = styled.div<ColProps>`
  box-sizing: border-box;
  padding-left: ${({ grid }: Theme) => (grid?.gutter || defaults.gutter) / 2}rem;
  padding-right: ${({ grid }: Theme) => (grid?.gutter || defaults.gutter) / 2}rem;

  ${({ grid, push }: Theme & ColProps) => css`
    ${applyMqProps(
      push,
      (value: number) => css`
        margin-left: ${(value / (grid?.cols || defaults.cols)) * 100}%;
      `
    )}
  `};

  ${({ colSize, grid }: Theme & ColProps) => css`
    ${applyMqProps(
      colSize,
      (value: number) => css`
        width: ${(value / (grid?.cols || defaults.cols)) * 100}%;
      `
    )}
  `};

  ${({ alignSelf }) => css`
    ${applyMqProps(alignSelf, (value: VerticalAlignments) => {
      const alignSelf = alignmentPropsMap.vertical[value as keyof typeof alignmentPropsMap.vertical];

      return css`
        align-self: ${alignSelf};
      `;
    })}
  `};

  ${generateProps};
`;

Col.defaultProps = {
  colSize: 12
};
