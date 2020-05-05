import PropTypes from "prop-types";
import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useTheme } from "../theme";

const styles = StyleSheet.create({
  root: {
    position: "relative",
  },
  absolute: {
    position: "absolute",
  },
  image: {
    zIndex: 2,
  },
  gradient: {
    zIndex: 1,
  },
  content: {
    zIndex: 3,
  },
});

function Background({ children, width, height }) {
  const {
    palette: { primary, secondary },
  } = useTheme();

  return (
    <View style={styles.root}>
      <Image
        resizeMode="cover"
        source={require("../assets/bg-lines.png")}
        style={[{ height, width }, styles.image, styles.absolute]}
      />
      <LinearGradient
        colors={[primary, secondary]}
        end={{ x: 0, y: 1 }}
        locations={[0, 0.5]}
        start={{ x: 0, y: 0 }}
        style={[{ height }, styles.gradient]}
      />
      <View
        style={[
          styles.absolute,
          styles.content,
          {
            height,
            width,
          },
        ]}
      >
        {children}
      </View>
    </View>
  );
}

Background.defaultProps = {
  height: 260,
  width: Dimensions.get("window").width,
};

Background.propTypes = {
  children: PropTypes.node.isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
};

export default Background;
