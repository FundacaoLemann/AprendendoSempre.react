import PropTypes from 'prop-types';
import React from 'react';
import { Text } from 'react-native';
import { useTheme } from '../theme';

function Typography({ variant, color, align, fontWeight, style, children, uppercase, ...rest }) {
  const {
    typography,
    typography: { fonts },
    palette: {
      common: { black, white },
      primary,
      secondary,
    },
  } = useTheme();

  const typographyTheme = typography[variant] || typography[Typography.default.variant];

  const { fontFamily } = fonts[fontWeight] || typographyTheme;

  const mapColors = {
    white,
    black,
    primary,
    secondary,
  };

  const styles = {
    ...typographyTheme,
    color: mapColors[color] || primary,
    fontFamily,
    textAlign: align,
  };

  return (
    <Text style={[style, styles]} {...rest}>
      {React.Children.map(children, (child) =>
        typeof child === 'string' && uppercase ? child.toUpperCase() : child,
      )}
    </Text>
  );
}

Typography.defaultProps = {
  align: 'auto',
  children: null,
  color: 'primary',
  fontWeight: null,
  style: null,
  uppercase: false,
  variant: 'body2',
};

Typography.propTypes = {
  align: PropTypes.oneOf(['auto', 'left', 'right', 'center', 'justify']),
  children: PropTypes.node,
  color: PropTypes.oneOf(['white', 'black', 'primary', 'secondary']),
  fontWeight: PropTypes.oneOf(['bold', 'regular']),
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  uppercase: PropTypes.bool,
  variant: PropTypes.oneOf(['h6', 'h5', 'h4', 'body1', 'body2', 'caption']),
};

export default Typography;
