import React from "react";
import { StatusBar, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0C0C1D"
        translucent={false}
      />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#0C0C1D",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 24 }}>id</Text>
      </SafeAreaView>
    </>
  );
}
