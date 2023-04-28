import { Col, Grid, Row } from '../../theme/components/Grid';
import { Heading, Text } from '../../theme/components/Typography';

import type { SliceComponentProps } from '@prismicio/react';

import React from 'react';
import RichText from '../../prismic/components/RichText';
import Section from '../../theme/components/Section';

type RichTextSectionProps = SliceComponentProps;

const RichTextSection = (props: RichTextSectionProps) => {
  const { slice } = props;
  const { colSize, heading, spacing, text } = slice?.primary || {};

  const sectionProps = { [spacing]: true };

  return (
    <Section {...sectionProps}>
      <Grid>
        <Row>
          <Col colSize={{ ...(!!colSize ? { md: colSize } : {}), xs: 12 }}>
            {!!heading && <Heading>{heading}</Heading>}
            {!!text?.length && (
              <Text mt={{ md: 4, xs: 2 }}>
                <RichText content={text} />
              </Text>
            )}
          </Col>
        </Row>
      </Grid>
    </Section>
  );
};

export default RichTextSection;
