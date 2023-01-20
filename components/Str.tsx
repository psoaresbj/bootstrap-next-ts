import React from 'react';
import parse from '../prismic/utils/parse';
import useTranslations from '../prismic/hooks/useTranslations';

type StrProps = {
  children?: any;
  components?: any;
  id: string;
  variables?: { [key: string]: any };
};

const Str = (props: StrProps) => {
  const { children, components, id, variables } = props;
  const { t } = useTranslations();
  const str = t(id, variables) || '<span style="color: red; font-weight: 700">No translation!<span>';

  if (typeof children === 'function') {
    return children(parse(str, components));
  }

  return <>{parse(str, components)}</>;
};

Str.defaultProps = {
  children: null,
  components: null,
  variables: null
};

export default Str;
