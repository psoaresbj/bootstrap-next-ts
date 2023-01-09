import { mq as baseMq } from '@psoares/styled-utils';

export const mq = {
  lg: (style: any) => baseMq.bp('lg', style),
  md: (style: any) => baseMq.bp('md', style),
  sm: (style: any) => baseMq.bp('sm', style),
  xs: (style: any) => baseMq.bp('xs', style)
};
