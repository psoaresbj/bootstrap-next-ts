import Link from 'next/link';
import styled from 'styled-components';

const TextLink = styled.a.attrs((props: any) => {
  const { href: baseHref, ...forwardProps } = props;

  const href = baseHref.replace('https:///', '/');

  const isInternal = href?.startsWith('/');

  const linkProps = isInternal ? { as: Link } : { rel: 'noopener noreferrer', target: '_blank' };

  return {
    ...forwardProps,
    ...linkProps
  };
})``;

export default TextLink;
