import PropTypes from 'prop-types';
import React from 'react';
import {Text} from 'react-native';
import {useTheme} from '../theme';

function Typography({
  variant,
  color,
  align,
  fontWeight,
  style,
  children,
  uppercase,
  ...rest
}) {
  const {
    typography,
    typography: {fonts},
    palette: {
      common: {black, white},
      primary,
      secondary,
    },
  } = useTheme();

  const typographyTheme =
    typography[variant] || typography[Typography.default.variant];

  const {fontFamily} = fonts[fontWeight] || typographyTheme;

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
      {React.Children.map(children, child =>
        typeof child === 'string' && uppercase ? child.toUpperCase() : child,
      )}
    </Text>
  );
}

Typography.defaultProps = {
  variant: 'body2',
  fontWeight: null,
  color: 'primary',
  align: 'auto',
};

Typography.propTypes = {
  variant: PropTypes.oneOf(['h6', 'h5', 'h4', 'body1', 'body2', 'caption']),
  fontWeight: PropTypes.oneOf(['bold', 'regular']),
  color: PropTypes.oneOf(['white', 'black', 'primary', 'secondary']),
  align: PropTypes.oneOf(['auto', 'left', 'right', 'center', 'justify']),
};

export default Typography;
