import { Col, Grid, Row } from '../theme/components/Grid';
import { Heading, Label } from '../theme/components/Typography';
import Div from '../theme/components/Div';
import Link from 'next/link';
import React from 'react';
import Section from '../theme/components/Section';

const cols = 6;
const listItems = new Array(cols).fill(undefined).map((_, index) => index);

const ColContent = ({ children, ...forwardProps }: any) => (
  <Div bgN07 flex="center" sz="3 100%" {...forwardProps}>
    <Label n01>{children}</Label>
  </Div>
);

const Example = () => {
  return (
    <>
      <Section>
        <Grid>
          <Row>
            <Col>
              <Heading center>NextJS + Typescript + Base theme</Heading>
              <Div center mt={1}>
                <Link href="/style-guide">Check style-guide</Link>
              </Div>
            </Col>
          </Row>
          <Row alignContent="middle" mt={3} reverse={{ upTo: 'md' }}>
            <Col colSize={6}>
              <ColContent sz="10 100%">Half size</ColContent>
            </Col>
            <Col alignSelf="bottom" colSize={{ md: 5, sm: 6, xs: 12 }} push={{ md: 1 }}>
              <ColContent>Pushed 1</ColContent>
            </Col>
          </Row>
          <Row mt={2}>
            {listItems.map(index => (
              <Col colSize={12 / listItems.length} key={index}>
                <ColContent>{index + 1}</ColContent>
              </Col>
            ))}
          </Row>
        </Grid>
      </Section>
    </>
  );
};

export default Example;
