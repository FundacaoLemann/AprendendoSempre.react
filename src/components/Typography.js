import PropTypes from 'prop-types';
import React from 'react';
import { Text } from 'react-native';
import { useTheme } from '../theme';

function Typography({
  align,
  children,
  color,
  fontWeight,
  gutterBottom,
  style,
  uppercase,
  variant,
  ...rest
}) {
  const {
    typography,
    typography: { fonts },
    palette: {
      common: { black, white },
      primary,
      secondary,
    },
    spacing,
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
    marginBottom: gutterBottom ? spacing(2) : 0,
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
  gutterBottom: false,
  style: null,
  uppercase: false,
  variant: 'body2',
};

Typography.propTypes = {
  align: PropTypes.oneOf(['auto', 'left', 'right', 'center', 'justify']),
  children: PropTypes.node,
  color: PropTypes.oneOf(['white', 'black', 'primary', 'secondary']),
  fontWeight: PropTypes.oneOf(['bold', 'regular']),
  gutterBottom: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  uppercase: PropTypes.bool,
  variant: PropTypes.oneOf(['h6', 'h5', 'h4', 'body1', 'body2', 'caption']),
};

export default Typography;
