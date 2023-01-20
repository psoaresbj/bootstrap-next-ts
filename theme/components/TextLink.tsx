import { colors } from '../variables';
import Link from 'next/link';
import styled from 'styled-components';

const TextLink = styled.a.attrs((props: any) => {
  const { href: baseHref, ...forwardProps } = props;

  const href = (baseHref || '')?.replace('https:///', '/');

  const isInternal = href?.startsWith('/');

  // eslint-disable-next-line no-nested-ternary
  const linkProps = isInternal ? { as: Link } : !!href ? { rel: 'noopener noreferrer', target: '_blank' } : {};

  return {
    ...forwardProps,
    ...linkProps
  };
})`
  color: ${colors.b06};
`;

export default TextLink;
