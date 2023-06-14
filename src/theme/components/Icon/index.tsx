/* eslint-disable no-console */
import { GeneratedProps } from '../../types';
import { generateProps } from 'styled-gen';
import React from 'react';
import icons from './main';
import styled from 'styled-components';

type IconType = {
  paths: {
    d: string;
  }[];
  viewbox: string;
};

type Icons = keyof typeof icons;

type IconProps = {
  icon: Icons;
} & GeneratedProps;

const renderPaths = (icon: IconType) =>
  // eslint-disable-next-line react/jsx-filename-extension
  icon.paths.map((path, index) => <path {...path} fill="currentColor" key={`path-${index}`} style={undefined} />);

const IconSvg = styled.svg<GeneratedProps>`
  fill: currentColor;
  flex-shrink: 0;
  vertical-align: middle;

  ${generateProps};
`;

const Icon = (props: IconProps) => {
  const { icon, ...otherProps } = props;
  const selectedIcon = icons?.[icon as Icons] as IconType;

  if (!selectedIcon) {
    console.log(`Icon not found: ${icon}`);

    return null;
  }

  if (!selectedIcon.viewbox) {
    console.log(`Viewbox issue with the icon: ${icon}`);

    return null;
  }

  return (
    <IconSvg role="img" style={undefined} viewBox={selectedIcon.viewbox} {...otherProps}>
      {renderPaths(selectedIcon)}
    </IconSvg>
  );
};

Icon.defaultProps = { $sz: 1 };

export default Icon;
