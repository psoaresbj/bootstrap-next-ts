import { VariationProps as BaseVariationProps, GeneratorProps, Variations } from '@psoares/styled-utils';
import { breakpoints, generator } from '../variables';

// Create types for your components

export type Breakpoints = keyof typeof breakpoints;

export type GeneratedProps = GeneratorProps<typeof generator.namedProps, typeof generator.variableProps, Breakpoints>;

export type VariationProps<T extends Variations> = BaseVariationProps<T, Breakpoints>;
