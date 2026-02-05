import MonoCalender from "@/components/calender/MonoCalender";
import Raison from "@/components/Raisonnement/Raisonnement";
import React from "react";
import { StatusBar } from "react-native";
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
          // justifyContent: "center",
          alignItems: "center",
          marginTop: 30,
          gap:10,
        }}
      >
        <MonoCalender />
        <Raison />
      </SafeAreaView>
    </>
  );
}
