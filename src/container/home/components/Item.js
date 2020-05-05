import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Box from "../../../components/Box";
import Typography from "../../../components/Typography";
import { useTheme } from "../../../theme";

const { width: viewportWidth } = Dimensions.get("window");

const styles = StyleSheet.create({
  root: {
    borderRadius: 10,
    height: 175,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    borderRadius: 35,
    height: 70,
    width: 70,
  },
  avatarInner: {
    borderRadius: 30,
    height: 60,
    width: 60,
  },
  image: {
    borderRadius: 25,
    height: 50,
    overflow: "hidden",
    width: 50,
  },
});

function Item({ title, image, onPress }) {
  const {
    palette: {
      primary,
      common: { white },
      secondaryLight,
    },
    spacing,
  } = useTheme();

  const itemStyles = {
    backgroundColor: secondaryLight,
    marginBottom: spacing(2),
  };

  const rowWidth = viewportWidth - spacing(6);

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View
        style={[
          styles.root,
          styles.center,
          itemStyles,
          { width: rowWidth / 2 },
        ]}
      >
        <View
          style={[
            styles.avatar,
            styles.center,
            {
              backgroundColor: primary,
            },
          ]}
        >
          <View
            style={[
              styles.avatarInner,
              styles.center,
              {
                backgroundColor: white,
              },
            ]}
          >
            <Image style={styles.image} width={50} height={50} source={image} />
          </View>
        </View>
        <Box mt={3} mx={2}>
          <Typography align="center" color="black" variant="h4">
            {title}
          </Typography>
        </Box>
      </View>
    </TouchableOpacity>
  );
}

export default Item;
