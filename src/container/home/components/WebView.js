import { useHeaderHeight } from "@react-navigation/stack";
import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { WebView as WebViewNative } from "react-native-webview";
import { useTheme } from "../../../theme";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
  },
});

const WebView = React.forwardRef(
  (
    { goBack, reload, goForward, onClose, canGoBack, canGoForward, ...rest },
    ref
  ) => {
    const headerHeight = useHeaderHeight();
    const {
      palette: {
        common: { white, black },
      },
    } = useTheme();

    return (
      <View style={{ height: viewportHeight }}>
        <View
          style={{
            height: headerHeight,
            width: viewportWidth,
            backgroundColor: { white },
          }}
        >
          <View style={styles.wrapper}>
            <View style={styles.row}>
              <TouchableOpacity onPress={goBack}>
                <View
                  style={[
                    styles.button,
                    {
                      opacity: canGoBack ? 1 : 0.5,
                      height: headerHeight,
                    },
                  ]}
                >
                  <Icon color={black} size={24} name="arrow-back" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={reload}>
                <View
                  style={[
                    styles.button,
                    {
                      height: headerHeight,
                    },
                  ]}
                >
                  <Icon color={black} size={24} name="refresh" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={goForward}>
                <View
                  style={[
                    styles.button,
                    {
                      opacity: canGoForward ? 1 : 0.5,
                      height: headerHeight,
                    },
                  ]}
                >
                  <Icon color={black} size={24} name="arrow-forward" />
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={onClose}>
                <View
                  style={[
                    styles.button,
                    {
                      height: headerHeight,
                    },
                  ]}
                >
                  <Icon color={black} size={24} name="close" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ height: viewportHeight - headerHeight }}>
          <WebViewNative ref={ref} {...rest} />
        </View>
      </View>
    );
  }
);

export default WebView;
