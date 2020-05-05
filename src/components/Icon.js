import PropTypes from 'prop-types';
import React from 'react';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import {useTheme} from '../theme';

const selection = require('../assets/fonts/icons/selection.json');

const IcomoonIcon = createIconSetFromIcoMoon(selection, 'icomoon');

export const iconNames = [
  'classroom',
  'home',
  'search',
  'list',
  'live',
  'notification',
];

function Icon({name, color, style, ...rest}) {
  const theme = useTheme();
  const {palette} = theme;

  const {
    common: {white, black},
    primary,
    secondary,
  } = palette;

  const mapColor = {
    white,
    black,
    primary,
    secondary,
  };

  const iconStyles = {
    color: mapColor[color] || color,
  };

  return (
    <IcomoonIcon style={[iconStyles, style]} name={name} size={24} {...rest} />
  );
}

Icon.defaultProps = {
  color: 'primary',
  size: 24,
  style: null,
};

Icon.propTypes = {
  color: PropTypes.string,
  name: PropTypes.oneOf(iconNames).isRequired,
  size: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default Icon;
