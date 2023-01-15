import { Col, Grid, Row } from '../theme/components/Grid';
import { Label, Text } from '../theme/components/Typography';
import { useRouter } from 'next/router';
import Div from '../theme/components/Div';
import Icon from '../theme/components/Icon';
import Link from 'next/link';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import useConfig from '../prismic/hooks/useConfig';

const MenuLink = styled(Link)`
  display: inline-block;

  & + & {
    margin-left: 1rem;
  }
`;

type MenuItem = {
  label?: string;
  url?: string;
};

const Header = () => {
  const { extract } = useConfig();
  const { mainMenu } = extract<{ mainMenu: MenuItem[] }>('header');

  const { pathname } = useRouter();

  const isActive = useCallback((url: string) => (url === pathname ? { b06: true } : { n01: true }), [pathname]);

  return (
    <Div as="header" bgN07 pb={1} pt={1.5}>
      <Grid>
        <Row alignContent="bottom">
          <Col colSize={{ sm: 6, xs: 12 }}>
            <Link href="/">
              <Icon icon="ps" n01 sz={1.75} />
            </Link>
            <Text mt={0.5} n02 semibold small>
              NextJS + Typescript + Styled-utils
            </Text>
          </Col>
          <Col colSize={{ sm: 6, xs: 12 }} right>
            {mainMenu.map(
              ({ label, url }, index) =>
                !!url && (
                  <MenuLink href={url} key={index}>
                    <Label {...isActive(url)}>{label}</Label>
                  </MenuLink>
                )
            )}
          </Col>
        </Row>
      </Grid>
    </Div>
  );
};

export default Header;
