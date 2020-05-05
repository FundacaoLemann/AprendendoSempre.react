import {useTheme} from '../theme';

export function useSpacing(props) {
  const {spacing} = useTheme();

  const mapSpacingToStyleName = {
    m: 'margin',
    mt: 'marginTop',
    mr: 'marginRight',
    mb: 'marginBottom',
    ml: 'marginLeft',
    mx: 'marginHorizontal',
    my: 'marginVertical',
    p: 'padding',
    pt: 'paddingTop',
    pr: 'paddingRight',
    pb: 'paddingBottom',
    pl: 'paddingLeft',
    px: 'paddingHorizontal',
    py: 'paddingVertical',
  };

  const spaces = [
    'm',
    'mt',
    'mr',
    'mb',
    'ml',
    'mx',
    'my',
    'p',
    'pt',
    'pr',
    'pb',
    'pl',
    'px',
    'py',
  ];

  const spaceProps = Object.keys(props).filter(
    prop => spaces.indexOf(prop) !== -1,
  );

  return spaceProps.reduce((styles, prop) => {
    styles.push({[mapSpacingToStyleName[prop]]: props[prop] * spacing()});
    return styles;
  }, []);
}
