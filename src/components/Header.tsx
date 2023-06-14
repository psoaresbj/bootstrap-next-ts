import { Col, Grid, Row } from '../theme/components/Grid';
import { Label, Text } from '../theme/components/Typography';
import { useRouter } from 'next/router';
import Div from '../theme/components/Div';
import Icon from '../theme/components/Icon';
import Link from 'next/link';
import React, { useCallback } from 'react';
import TextLink from '../theme/components/TextLink';
import styled from 'styled-components';
import useConfig from '../libs/prismic/hooks/useConfig';
import useModal from '../modals/useModal';

const MenuLink = styled(TextLink)`
  display: inline-flex;

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
  const { mainMenu } = extract<{ mainMenu: MenuItem[] }>('header', true);

  const { pathname } = useRouter();
  const { open } = useModal();

  const isActive = useCallback((url: string) => (url === pathname ? { $b06: true } : { $n01: true }), [pathname]);

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
    <Div $bgN07 $pb={1} $pt={1.5} as="header">
      <Grid>
        <Row>
          <Col size={{ sm: 6, xs: 12 }}>
            <Link href="/">
              <Icon $n01 $sz={1.75} icon="ps" />
            </Link>
            <Text $mt={0.5} $n02 $semibold $small>
              NextJS + Typescript + Styled-utils
            </Text>
          </Col>
          <Col align="bottom" size={{ sm: 6, xs: 12 }}>
            <Div $right>
              {mainMenu.map(
                ({ label, url }, index) =>
                  !!url && (
                    <MenuLink href={url} key={index}>
                      <Label {...isActive(url)}>{label}</Label>
                    </MenuLink>
                  )
              )}
              <MenuLink onClick={handleOpenModal}>
                <Label $n01>Open modal</Label>
              </MenuLink>
            </Div>
          </Col>
        </Row>
      </Grid>
    </Div>
  );
};

export default Header;
