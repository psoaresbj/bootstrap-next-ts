import { breakpoints } from '../variables';

export const sortBreakpoints = ({ asArray } = { asArray: false }): any => {
  const sorted = Object.entries(breakpoints || {}).sort(([, valueA], [, valueB]) => valueA - valueB);

  if (asArray) {
    return sorted.map(([breakpoint, value]) => ({ breakpoint, value }));
  }

  return sorted.reduce((result, [key, value]) => ({ ...result, [key]: value }), {});
};
