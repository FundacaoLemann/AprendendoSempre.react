import {createTheming} from '@callstack/react-theme-provider';
import color from 'color';
import createTypography from './createTypography';
import createSpacing from './createSpacing';

const typography = createTypography();
const spacing = createSpacing();
const primary = '#42BCB4';
const secondary = '#6E45E2';

const {ThemeProvider, useTheme, withTheme} = createTheming({
  typography,
  palette: {
    common: {
      black: '#000000',
      white: '#ffffff',
    },
    primary,
    secondary,
    primaryLight: color(primary)
      .alpha(0.15)
      .rgb()
      .toString(),
    secondaryLight: color(secondary)
      .alpha(0.15)
      .rgb()
      .toString(),
  },
  spacing,
  shape: {
    borderRadius: 5,
  },
  textInput: {
    height: 45,
  },
});

export {ThemeProvider, useTheme, withTheme};
