import React from 'react';
import baseParse, { attributesToProps } from 'html-react-parser';

const parse = (str?: string, components?: any, key?: string | number) =>
  baseParse(str || '', {
    replace: (domNode: any) => {
      const Component = (components || {})?.[domNode?.attribs?.component];

      if (Component) {
        const attrs = attributesToProps(domNode?.attribs);
        const parsedAttrs = Object.entries(attrs as any).reduce((result, [key, value]) => {
          if (value === '' || value === 'true' || value === true) {
            return {
              ...result,
              [key]: true
            };
          }

          return {
            ...result,
            [key]: value
          };
        }, {});

        const children = domNode?.children?.[0]?.data;

        const forwardProps = { ...parsedAttrs, children: children?.[0]?.data };

        return <Component {...forwardProps} key={key} />;
      }

      return domNode;
    }
  });

export default parse;
