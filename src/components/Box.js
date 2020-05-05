import PropTypes from "prop-types";
import React from "react";
import { View } from "react-native";
import { useSpacing } from "../utils";

function Box({ style, children, ...rest }) {
  const spacingStyles = useSpacing(rest);

  return (
    <View style={[style, ...spacingStyles]} {...rest}>
      {children}
    </View>
  );
}

Box.defaultProps = {
  children: null,
  style: null,
};

Box.propTypes = {
  children: PropTypes.node,
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default Box;
