import { Col, Grid, Row } from '../theme/components/Grid';
import { Label, Text } from '../theme/components/Typography';
import { useRouter } from 'next/router';
import Div from '../theme/components/Div';
import Icon from '../theme/components/Icon';
import Link from 'next/link';
import React, { useCallback } from 'react';
import TextLink from '../theme/components/TextLink';
import styled from 'styled-components';
import useConfig from '../prismic/hooks/useConfig';
import useModal from '../modals/useModal';

const MenuLink = styled(TextLink)`
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
  const { open } = useModal();

  const isActive = useCallback((url: string) => (url === pathname ? { b06: true } : { n01: true }), [pathname]);

  const handleOpenModal = () =>
    open('example', {
      options: {
        onClose: (from?: string) => console.log(`Closed ${from || 'using backdrop click or any other source...'}`),
        onOpen: () => console.log('Modal opened!')
      },

      props: {
        heading: 'Example modal!'
      }
    });

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
            <MenuLink onClick={handleOpenModal}>
              <Label n01>Open modal</Label>
            </MenuLink>
          </Col>
        </Row>
      </Grid>
    </Div>
  );
};

export default Header;
