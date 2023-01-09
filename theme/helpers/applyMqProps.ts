import { Breakpoints } from '../types';
import { mq } from '@psoares/styled-utils';
import { sortBreakpoints } from './sortBreakpoints';

const { isArray } = Array;

type BreakpointEntry = { breakpoint: Breakpoints; value: number };

const sortedBreakpoints = sortBreakpoints({ asArray: true }) as BreakpointEntry[];

export const applyMqProps = (prop: any, callback: Function) => {
  if (typeof prop === 'undefined') {
    return '';
  }

  if (typeof prop === 'boolean' || isArray(prop) || ['string', 'number'].includes(typeof prop)) {
    return callback(prop);
  }

  return sortedBreakpoints.reduce((result: any, { breakpoint, value }, index) => {
    if (!index && prop[breakpoint] !== undefined && !value) {
      return [...result, callback(prop[breakpoint])];
    }

    if (prop[breakpoint] !== undefined) {
      return [...result, mq.from(breakpoint, callback(prop[breakpoint]))];
    }

    return result;
  }, []);
};
