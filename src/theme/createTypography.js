const fonts = {
  regular: {
    fontFamily: "Quicksand-Regular",
    fontWeight: 400,
  },
  bold: {
    fontFamily: "Quicksand-Bold",
    fontWeight: 700,
  },
};

function buildVariant(fontSize, lineHeight, fontFamily) {
  return {
    fontSize,
    lineHeight: fontSize * lineHeight,
    fontFamily: fonts[fontFamily].fontFamily,
  };
}

const variants = {
  h6: buildVariant(26, 1.2, "bold"),
  h5: buildVariant(22, 1.2, "bold"),
  h4: buildVariant(20, 1.2, "bold"),
  body1: buildVariant(16, 1.2, "regular"),
  body2: buildVariant(14, 1.2, "regular"),
  caption: buildVariant(12, 1.2, "regular"),
};

export default function createTypography() {
  return {
    fonts,
    ...variants,
  };
}
