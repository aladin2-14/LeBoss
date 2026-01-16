import Historique from "@/components/Historique";
import TableStatics from "@/components/TableStatics";
import React, { useEffect, useRef } from "react";
import { Dimensions, StatusBar, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { SafeAreaView } from "react-native-safe-area-context";

const screenWidth = Dimensions.get("window").width;

export default function Index() {
  const handleSearch = (text: string) => {
    console.log("Recherche :", text);
  };
  const buttonAR = screenWidth * 0.28;
  const tableStaticsRef = useRef<any>(null);
  const tableInfoRef = useRef<any>(null);

  useEffect(() => {
    tableStaticsRef.current?.fadeInUp(1000).then(() => {
      tableInfoRef.current?.fadeInUp(1000);
    });
  }, []);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0C0C1D"
        translucent={false}
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#0C0C1D" }}>
        <View
          style={{
            marginTop: 15,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {/* <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
            <View
              style={{
                width: buttonAR,
                height: 40,
                backgroundColor: "#DA1B09",
                borderRadius: 10,
              }}
            ></View>
            <View
              style={{
                width: buttonAR,
                height: 40,
                backgroundColor: "#41DA09",
                borderRadius: 10,
              }}
            ></View>
          </View
          > */}
          {/* <SearchInput onSearch={handleSearch} /> */}
          {/* <Quotidien /> */}
          <Animatable.View
            ref={tableStaticsRef}
            style={{ marginTop: 6, alignItems: "center" }}
          >
            <TableStatics />
          </Animatable.View>
          <Animatable.View
            ref={tableInfoRef}
            style={{ marginTop: 20, alignItems: "center", opacity: 0 }}
          >
            {/* <Tableinfo /> */}
          </Animatable.View>
        <Historique />
        </View>
      </SafeAreaView>
    </>
  );
}
