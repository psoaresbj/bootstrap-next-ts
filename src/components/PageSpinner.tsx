import { colors } from '../theme/variables';
import { position } from 'polished';
import { transitions } from '../theme/helpers';
import { useRouter } from 'next/router';
import BounceLoader from 'react-spinners/BounceLoader';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div<{ $isActive?: boolean }>`
  ${position('fixed', 0)};
  ${transitions(['opacity', 'visibility'], 250, 'inOutSine')};

  align-items: center;
  background-color: ${colors.n07};
  display: flex;
  justify-content: center;
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
  visibility: ${({ $isActive }) => ($isActive ? 'visible' : 'hidden')};
  z-index: 99999999;
`;

const PageSpinner = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { events, isReady } = router;

  useEffect(() => {
    if (isReady) {
      const handleRouteChange = () => {
        setIsMounted(true);

        return setTimeout(() => {
          setIsLoading(true);
        });
      };

      const handleRouteComplete = () => {
        setIsLoading(false);

        return setTimeout(() => {
          setIsMounted(false);
        }, 350);
      };

      events.on('routeChangeStart', handleRouteChange);
      events.on('routeChangeComplete', handleRouteComplete);

      return () => {
        events.off('routeChangeStart', handleRouteChange);
        events.off('routeChangeComplete', handleRouteComplete);
      };
    }
  }, [events, isReady]);

  if (!isMounted) {
    return null;
  }

  return (
    <Wrapper $isActive={isLoading}>
      <BounceLoader color={colors.b06} />
    </Wrapper>
  );
};

export default PageSpinner;
