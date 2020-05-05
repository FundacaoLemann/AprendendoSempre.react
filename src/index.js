import React from "react";
import { Text, View, Dimensions } from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import Icon from "react-native-vector-icons/FontAwesome";

export default class Example extends React.Component {
  renderContent = () => (
    <View style={{ borderWidth: 1, borderColor: "red" }}>
      <Text>Olá</Text>
    </View>
  );

  renderHeader = () => (
    <View style={{ borderWidth: 1, borderColor: "red" }}>
      <Text>Olá</Text>
    </View>
  );

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 100, fontFamily: "Quicksand-Regular" }}>
          Olá Diego Rodrigues Vieira
        </Text>
        <Icon name="rocket" size={30} color="#900" />
        <BottomSheet
          snapPoints={[450, 300, 100]}
          renderContent={this.renderContent}
          renderHeader={this.renderHeader}
        />
      </View>
    );
  }
}
