import React from "react";
import Box from "./Box";
import { useTheme } from "../theme";

function Container({ children, style, ...rest }) {
  const {
    palette: {
      common: { white },
    },
  } = useTheme();

  return (
    <Box px={2} py={2} style={[{ backgroundColor: white }, style]} {...rest}>
      {children}
    </Box>
  );
}

export default Container;
