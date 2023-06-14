import { Col, Grid, Row } from '../../../theme/components/Grid';
import { Heading } from '../../../theme/components/Typography';
import { rgba } from 'polished';
import { transitions } from '../../../theme/helpers';
import Icon from '../../../theme/components/Icon';
import React, { useEffect, useRef, useState } from 'react';
import Section from '../../../theme/components/Section';
import styled from 'styled-components';

type StyleGuideSectionProps = {
  children: React.ReactNode;
  title?: string;
};

const Content = styled.div`
  position: absolute;
  width: 100%;
  padding: 3rem 0 2rem;
`;

const ContentWrapper = styled.div<{ $height?: number }>`
  ${transitions(['height'], 250, 'inOutCirc')};

  height: ${({ $height }: any) => $height / 16}rem;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

const HeadingWrapper = styled.a`
  align-items: center;
  border-bottom: 1px solid ${rgba('#000', 0.2)};
  display: flex;
  padding: 1rem 0;
  justify-content: space-between;
`;

const StyleGuideSection: React.FC<StyleGuideSectionProps> = props => {
  const { children, title } = props;

  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLInputElement>(null);
  const [contentHeight, setContentHeight] = useState(contentRef.current?.clientHeight || 0);

  useEffect(() => {
    const handleWindowSize = () => {
      setContentHeight(contentRef.current?.clientHeight || 0);
    };

    window.addEventListener('resize', handleWindowSize);

    return () => window.removeEventListener('resize', handleWindowSize);
  }, []);

  useEffect(() => {
    setContentHeight(isExpanded ? contentRef.current?.clientHeight || 0 : 0);
  }, [isExpanded]);

  return (
    <Section $mt={3}>
      <Grid>
        <Row>
          <Col>
            <HeadingWrapper onClick={() => setIsExpanded(!isExpanded)}>
              <Heading>{title}</Heading>
              <Icon $sz={2} icon={isExpanded ? 'minus' : 'plus'} />
            </HeadingWrapper>
          </Col>
        </Row>
        <Row>
          <Col>
            <ContentWrapper $height={isExpanded ? contentHeight : 0}>
              <Content ref={contentRef}>{children}</Content>
            </ContentWrapper>
          </Col>
        </Row>
      </Grid>
    </Section>
  );
};

StyleGuideSection.defaultProps = {
  title: undefined
};

export default StyleGuideSection;
