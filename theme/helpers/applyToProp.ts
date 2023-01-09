import { Breakpoints } from '../types';
import { SimpleInterpolation, css } from 'styled-components';
import { breakpoints } from '../variables';
import { mq } from '@psoares/styled-utils';

const { isArray } = Array;

const methods = ['from', 'upTo'] as const;

const breakpointsArray = Object.keys(breakpoints);

export const applyToProp = (prop?: any, styles?: SimpleInterpolation | SimpleInterpolation[]) => {
  const matchStyle = isArray(styles) ? styles[0] : styles;
  const defaultStyle = isArray(styles) && styles[1];

  if (typeof prop === 'boolean' && !!prop) {
    return matchStyle || '';
  }

  if (
    typeof prop === 'object' &&
    Object.keys(prop).find(method => methods.includes(method as any) && breakpointsArray.includes(prop?.[method]))
  ) {
    return css`
      ${defaultStyle};

      ${methods.reduce((result: any, method) => {
        const breakpoint: Breakpoints | undefined = prop?.[method] || undefined;

        if (!breakpointsArray.includes(breakpoint || '')) {
          return result;
        }

        return mq[method](breakpoint as Breakpoints, matchStyle);
      }, [])}
    `;
  }

  return '';
};
