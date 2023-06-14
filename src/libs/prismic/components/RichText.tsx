import { GeneratedProps } from '../../../theme/types';
import { Heading } from '../../../theme/components/Typography';
import { PrismicRichText } from '@prismicio/react';
import { RichTextContent } from '../../../theme/components/RichTextContent';
import { RichTextField } from '@prismicio/types';
import EmbedPlayer from '../../../theme/components/EmbedPlayer';
import React from 'react';
import TextLink from '../../../theme/components/TextLink';
import bracked from '../utils/bracked';
import parse from '../utils/parse';

const baseComponents = {};

type RichTextElementType =
  | 'em'
  | 'embed'
  | 'label'
  | 'span'
  | 'strong'
  | 'image'
  | 'list-item'
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'heading4'
  | 'heading5'
  | 'heading6'
  | 'paragraph'
  | 'preformatted'
  | 'hyperlink'
  | 'group-list-item'
  | 'o-list-item'
  | 'group-o-list-item';

type SerializerArguments = {
  children?: any;
  components?: any;
  forwardProps?: Record<RichTextElementType, GeneratedProps>;
  key?: string | number;
  node?: any;
  type: RichTextElementType;
  variables?: {
    [key: string]: any;
  };
};

// EDIT: Set serializer according designs
const serializer = (args: SerializerArguments) => {
  const { children, components: componentsFromProps, forwardProps: serializerProps, key, node, type, variables } = args;
  const components = { ...baseComponents, ...componentsFromProps };

  const forwardProps = serializerProps?.[type] || {};

  try {
    const { children = null, component, props = {} } = JSON.parse(node) || {};

    if (components[component]) {
      return React.createElement(components[component], { ...props, key }, children);
    }
    // eslint-disable-next-line no-empty
  } catch {}

  if (type.startsWith('heading')) {
    return (
      <Heading key={key} {...{ ...forwardProps, [type.replace('heading', 'h')]: true }}>
        {children}
      </Heading>
    );
  }

  if (type === 'image') {
    const { alt, url } = node;

    return (
      <picture key={key} style={{ display: 'block', position: 'relative', width: '100%' }}>
        <img alt={alt || ''} src={url} style={{ width: '100%' }} />
      </picture>
    );
  }

  if (type === 'hyperlink') {
    const { url } = node?.data;

    return (
      <TextLink href={url} {...forwardProps}>
        {children}
      </TextLink>
    );
  }

  if (type === 'embed') {
    return <EmbedPlayer dangerouslySetInnerHTML={{ __html: node?.oembed?.html }} key={key} {...forwardProps} />;
  }

  if (type === 'preformatted' && children?.length) {
    return <>{children}</>;
  }

  if (type === 'span') {
    const { text } = node;

    const content = bracked(text, variables);

    return parse(content, components, key);
  }

  return null;
};

type RichTextProps = {
  components?: any;
  content?: any;
  variables?: { [key: string]: string };
  // eslint-disable-next-line no-unused-vars
  serializerProps?: Record<RichTextElementType, GeneratedProps>;
} & GeneratedProps;

const RichText = (props: RichTextProps) => {
  const { components, content, serializerProps, variables, ...forwardProps } = props;

  if (!content?.length) {
    return null;
  }

  if (typeof content === 'string') {
    const text = bracked(content, variables);

    return <>{parse(text, components)}</>;
  }

  return (
    <RichTextContent {...forwardProps}>
      <PrismicRichText
        // eslint-disable-next-line max-params
        components={(type, node, content, children, key) =>
          serializer({
            children,
            components,
            forwardProps: serializerProps,
            key,
            node,
            type,
            variables
          }) as any
        }
        field={content as RichTextField}
      />
    </RichTextContent>
  );
};

RichText.defaultProps = {
  components: null,
  content: null,
  serializerProps: null,
  variables: null
};

export default RichText;
