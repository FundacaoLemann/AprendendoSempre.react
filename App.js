import React from "react";
import { Text, View, Dimensions } from "react-native";
import BottomSheet from "reanimated-bottom-sheet";

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
        <BottomSheet
          snapPoints={[450, 300, 100]}
          renderContent={this.renderContent}
          renderHeader={this.renderHeader}
        />
      </View>
    );
  }
}
