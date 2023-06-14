import type {
  MqBoolProp as BaseMqBoolProp,
  MqProp as BaseMqProp,
  VariationProps as BaseVariationProps,
  GeneratorProps,
  Variations
} from 'styled-gen';
import type { Breakpoints } from './breakpoints';

import { generator } from '../variables';

// Piece of resistance
// This is what makes all the magic to happen
// for getting the autocomplete with IDEs :sparkles:
export type GeneratedProps = GeneratorProps<
  typeof generator.namedProps,
  typeof generator.variableProps,
  Breakpoints,
  '$'
>;

// Allows to type components that uses `variations`
export type VariationProps<T extends Variations, TP extends boolean | undefined = true> = BaseVariationProps<
  T,
  Breakpoints,
  TP extends true ? '$' : TP
>;

// Some helpers for typing object mediaQuery syntax
export type MqProps<T> = BaseMqProp<Breakpoints, T>;
export type MqBoolProps = BaseMqBoolProp<Breakpoints>;
