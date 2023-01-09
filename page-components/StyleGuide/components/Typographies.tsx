import * as typographyComps from '../../../theme/components/Typography';
import { fonts, typography } from '../../../theme/variables';
import Div from '../../../theme/components/Div';
import React, { useState } from 'react';
import StyleGuideSection from './StyleGuideSection';

const { Label } = typographyComps;

const LoremStrings = {
  body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.',
  default: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
  display: 'Lorem ipsum dolor',
  label: 'Lorem ipsum'
} as any;

type TypographyItemProps = {
  type: string;
  sizes: {
    [size: string]:
      | {
          [breakpoint: string]: number | number[];
        }
      | number
      | number[];
  };
};

const TypographyItem: React.FC<TypographyItemProps> = props => {
  const { sizes, type } = props;

  const [weights, setWeights] = useState<any>({});

  const ComponentName =
    type === 'body' ? 'Text' : (`${type.substring(0, 1).toUpperCase()}${type.substring(1)}` as string);

  const Component = (typographyComps as any)[ComponentName];

  if (!Component) {
    return null;
  }

  const lorem = LoremStrings[type] || LoremStrings.default;

  return (
    <Div>
      <Label>{type}</Label>
      {Object.entries(sizes).map(([size], index) => (
        <Div key={index} mt={type === 'body' ? 3 : 1.5} pl={1}>
          <Div flex="centerAround" n03>
            <Label mr="auto">{size}</Label>
            {type === 'body' && (
              <Div>
                {Object.keys(fonts.weights).map((weight, index) => (
                  <Label
                    as="a"
                    key={index}
                    ml={index ? 0.5 : 0}
                    n07={weight === 'regular' ? !weights[size] : weight === weights[size]}
                    onClick={() =>
                      setWeights((weights: any) => ({ ...weights, [size]: weight === 'regular' ? false : weight }))
                    }
                  >
                    {weight}
                  </Label>
                ))}
              </Div>
            )}
          </Div>
          <Div mt={type === 'body' ? 2 : 1}>
            <Component n06 {...{ [size]: true }} {...(weights[size] ? { [weights[size]]: true } : {})}>
              {lorem}
            </Component>
          </Div>
        </Div>
      ))}
    </Div>
  );
};

const Typographies: React.FC = () => {
  return (
    <StyleGuideSection title="Typography">
      {Object.entries(typography).map(([type, sizes], index) => (
        <Div key={index} mt={index ? 4 : 0}>
          <TypographyItem sizes={sizes as any} type={type} />
        </Div>
      ))}
    </StyleGuideSection>
  );
};

export default Typographies;
