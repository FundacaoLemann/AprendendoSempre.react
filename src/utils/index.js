import { useTheme } from "../theme";

export function useSpacing(props) {
  const { spacing } = useTheme();

  const mapSpacingToStyleName = {
    m: "margin",
    mt: "marginTop",
    mr: "marginRight",
    mb: "marginBottom",
    ml: "marginLeft",
    mx: "marginHorizontal",
    my: "marginVertical",
    p: "padding",
    pt: "paddingTop",
    pr: "paddingRight",
    pb: "paddingBottom",
    pl: "paddingLeft",
    px: "paddingHorizontal",
    py: "paddingVertical",
  };

  const spaces = [
    "m",
    "mt",
    "mr",
    "mb",
    "ml",
    "mx",
    "my",
    "p",
    "pt",
    "pr",
    "pb",
    "pl",
    "px",
    "py",
  ];

  const spaceProps = Object.keys(props).filter(
    (prop) => spaces.indexOf(prop) !== -1
  );

  return spaceProps.reduce((styles, prop) => {
    styles.push({ [mapSpacingToStyleName[prop]]: props[prop] * spacing() });
    return styles;
  }, []);
}

export const removeAccents = (str) => {
  const latinMap = {
    â: "a",
    Â: "a",
    à: "a",
    À: "a",
    á: "a",
    Á: "a",
    ã: "a",
    Ã: "a",
    ê: "e",
    Ê: "e",
    è: "e",
    È: "e",
    é: "e",
    É: "e",
    î: "i",
    Î: "i",
    ì: "i",
    Ì: "i",
    í: "i",
    Í: "i",
    õ: "o",
    Õ: "o",
    ô: "o",
    Ô: "o",
    ò: "o",
    Ò: "o",
    ó: "o",
    Ó: "o",
    ü: "u",
    Ü: "u",
    û: "u",
    Û: "u",
    ú: "u",
    Ú: "u",
    ù: "u",
    Ù: "u",
    ç: "c",
    Ç: "c",
  };

  return str.replace(/[^A-Za-z0-9]/g, (x) => latinMap[x] || x);
};
