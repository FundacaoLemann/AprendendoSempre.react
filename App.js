import React, { useState } from "react";
import { NativeModules, Text, DeviceEventEmitter, View } from "react-native";

export default function App() {
  const [datami, setDatami] = useState({});

  const onSdStateChange = (event) => setDatami(event);

  React.useEffect(() => {
    DeviceEventEmitter.addListener("onSdStateChange", onSdStateChange);
    NativeModules.SmiSdkReactModule.registerSdStateChangeListner();

    return () => {
      DeviceEventEmitter.removeListener("onSdStateChange");
    };
  }, []);

  React.useEffect(() => {
    console.log("state: " + datami.sd_state);
    console.log("reason: " + datami.sd_reason);
    console.log("carrier: " + datami.carrier_name);
    console.log("client ip: " + datami.client_ip);
  }, [datami]);

  return (
    <View>
      <Text>Olá</Text>
    </View>
  );
}
