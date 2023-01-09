import {
  MqBoolProp as BaseMqBoolProp,
  MqProp as BaseMqProp,
  VariationProps as BaseVariationProps,
  GeneratorProps,
  Variations
} from '@psoares/styled-utils';
import { HTMLAttributes } from 'react';
import { breakpoints, generator } from '../variables';

export type Breakpoints = keyof typeof breakpoints;

interface ExtraGeneratedProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: keyof JSX.IntrinsicElements;
}

export type GeneratedProps = ExtraGeneratedProps &
  GeneratorProps<typeof generator.namedProps, typeof generator.variableProps, Breakpoints>;

export type MqProps<T> = BaseMqProp<Breakpoints, T>;
export type MqBoolProps = BaseMqBoolProp<Breakpoints>;

export type VariationProps<T extends Variations> = BaseVariationProps<T, Breakpoints>;

export type HorizontalAlignments = 'left' | 'center' | 'right';
export type VerticalAlignments = 'top' | 'middle' | 'bottom';

export type Alignments = HorizontalAlignments | VerticalAlignments | `${HorizontalAlignments} ${VerticalAlignments}`;
