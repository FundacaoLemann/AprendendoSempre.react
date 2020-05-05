import React from "react";
import { TextInput as TextInputAsNative, View, StyleSheet } from "react-native";
import { useTheme } from "../theme";
import Icon from "./Icon";

const styles = StyleSheet.create({
  relative: {
    position: "relative",
  },
});

function TextInput({ icon, ...rest }) {
  const {
    palette: { primaryLight },
    spacing,
    typography: {
      fonts: {
        regular: { fontFamily },
      },
    },
    textInput: { height },
    icon: { size },
  } = useTheme();

  const textInputStyles = {
    backgroundColor: primaryLight,
    borderRadius: height / 2,
    fontFamily,
    height,
    paddingLeft: icon ? spacing(3) + size : spacing(2),
    paddingRight: spacing(2),
  };

  return (
    <View style={styles.relative}>
      {icon && (
        <View
          style={{
            width: 24,
            height,
            position: "absolute",
            justifyContent: "center",
            marginLeft: spacing(2),
          }}
        >
          <Icon name={icon} />
        </View>
      )}
      <TextInputAsNative style={[textInputStyles]} {...rest} />
    </View>
  );
}

export default TextInput;
