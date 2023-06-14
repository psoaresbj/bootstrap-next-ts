/* eslint-disable no-nested-ternary */
import { Alignments, GeneratedProps, HorizontalAlignments, MqBoolProps, MqProps, VerticalAlignments } from '../types';
import { applyNamedProp, applyVariableProp, generateProps } from 'styled-gen';
import styled, { css } from 'styled-components';

const defaults = {
  cols: 12,
  gutter: 1.5,
  margin: 1.5,
  units: 'rem',
  width: 75
};

const horizontalAlignments = ['left', 'center', 'right'];
const verticalAlignments = ['top', 'middle', 'bottom'];

// #region Helpers
const getUnits = (props: any) => props?.theme?.grid?.units || defaults.units;

const getValue = (key: string, value?: number, skipUnits?: boolean) => (props: any) => {
  const u = !skipUnits ? getUnits(props) : false;

  if (typeof value === 'number') {
    return u ? `${value}${u}` : value;
  }

  if (typeof props?.theme?.grid?.[key] === 'number') {
    return u ? `${props?.theme?.grid?.[key]}${u}` : props?.grid?.[key];
  }

  if (typeof defaults[key as keyof typeof defaults] === 'number') {
    return u ? `${defaults[key as keyof typeof defaults]}${u}` : defaults[key as keyof typeof defaults];
  }

  return;
};

const getFlexPosition = (align?: HorizontalAlignments | VerticalAlignments) => {
  if (!align) {
    return;
  }

  if (align === 'left' || align === 'top') {
    return 'flex-start';
  }

  if (align === 'right' || align === 'bottom') {
    return 'flex-end';
  }

  return 'center';
};

const setAlignments = (value: Alignments, isSelf?: boolean) => {
  const [horizontalPossibleValue, verticalPossibleValue] = value.split(' ');

  const horizontalValue = (
    horizontalAlignments.includes(horizontalPossibleValue) ? horizontalPossibleValue : undefined
  ) as HorizontalAlignments | undefined;
  const verticalValue = (
    verticalAlignments.includes(verticalPossibleValue)
      ? verticalPossibleValue
      : verticalAlignments.includes(horizontalPossibleValue)
      ? horizontalPossibleValue
      : undefined
  ) as VerticalAlignments | undefined;

  if (isSelf) {
    return css`
      align-self: ${getFlexPosition(verticalValue)};
      justify-self: ${getFlexPosition(horizontalValue)};
    `;
  }

  return css`
    align-items: ${getFlexPosition(verticalValue)};
    justify-content: ${getFlexPosition(horizontalValue)};
  `;
};
// #endregion

/**
 * Grid
 */
type GridProps = {
  gutter?: MqProps<number>;
  margin?: MqProps<number>;
  width?: MqProps<number>;
} & GeneratedProps;

const gridConfig = {
  shouldForwardProp: (prop: any) => !['gutter', 'margin', 'width'].includes(prop)
};

const gridAttrs = (props: any) => ({
  className: !!props?.className ? `${props.className} ps-grid` : 'ps-grid'
});

export const Grid = styled.div.attrs(gridAttrs).withConfig(gridConfig)<GridProps>`
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  max-width: ${getValue('width')};
  padding-left: ${getValue('margin')};
  padding-right: ${getValue('margin')};
  width: 100%;

  ${applyVariableProp(
    'gutter',
    (value: number) => css`
      .ps-grid-row {
        margin-left: calc(-${getValue('gutter', value)} / 2);
        margin-right: calc(-${getValue('gutter', value)} / 2);

        .ps-grid-col {
          padding-left: calc(${getValue('gutter', value)} / 2);
          padding-right: calc(${getValue('gutter', value)} / 2);
        }
      }
    `,
    { useTransientPrefix: false }
  )}

  ${applyVariableProp(
    'width',
    (value: number) => css`
      max-width: ${getValue('width')};
    `,
    { useTransientPrefix: false }
  )}

  ${applyVariableProp(
    'margin',
    (value: number) => css`
      padding-left: ${getValue('margin')};
      padding-right: ${getValue('margin')};
    `,
    { useTransientPrefix: false }
  )}

  ${generateProps};
`;

/**
 * Row
 */
type RowProps = {
  alignContent?: MqProps<Alignments>;
  reverse?: MqBoolProps;
} & GeneratedProps;

const rowConfig = {
  shouldForwardProp: (prop: any) => !['alignContent', 'reverse'].includes(prop)
};

const rowAttrs = (props: any) => ({
  className: !!props?.className ? `${props.className} ps-grid-row` : 'ps-grid-row'
});

export const Row = styled.div.attrs(rowAttrs).withConfig(rowConfig)<RowProps>`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  margin-left: calc(-${getValue('gutter')} / 2);
  margin-right: calc(-${getValue('gutter')} / 2);

  ${applyNamedProp(
    'reverse',
    [
      css`
        flex-direction: ${({ reverse }: any) => (reverse?.from || reverse === true ? 'row-reverse' : 'row')};
      `,
      css`
        flex-direction: ${({ reverse }: any) => (!reverse ? 'row' : 'row-reverse')};
      `
    ],
    { useTransientPrefix: false }
  )}

  ${applyVariableProp('alignContent', setAlignments, { useTransientPrefix: false })}

  ${generateProps};
`;

/**
 * Col
 */
type ColProps = {
  align?: MqProps<Alignments>;
  push?: MqProps<number>;
  size?: MqProps<number>;
} & GeneratedProps;

const colConfig = {
  shouldForwardProp: (prop: any) => !['align', 'push', 'size'].includes(prop)
};

const colAttrs = (props: any) => ({
  className: !!props?.className ? `${props.className} ps-grid-col` : 'ps-grid-col'
});

export const Col = styled.div.attrs(colAttrs).withConfig(colConfig)<ColProps>`
  box-sizing: border-box;
  padding-left: calc(${getValue('gutter')} / 2);
  padding-right: calc(${getValue('gutter')} / 2);
  width: ${({ size }) => size === undefined && '100%'};

  ${applyVariableProp(
    'push',
    (value: number) => css`
      margin-left: ${({ grid }: any) => (value / (grid?.cols || defaults.cols)) * 100}%;
    `,
    { useTransientPrefix: false }
  )};

  ${applyVariableProp(
    'size',
    (value: number = 12) => css`
      width: ${({ grid }: any) => (value / (grid?.cols || defaults.cols)) * 100}%;
    `,
    { useTransientPrefix: false }
  )};

  ${applyVariableProp('align', (value: Alignments) => setAlignments(value, true), { useTransientPrefix: false })}

  ${generateProps};
`;
