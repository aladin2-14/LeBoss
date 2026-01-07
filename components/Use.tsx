import Name from "@/components/Info/Name";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
export default function Info() {
  const [screenSize, setScreenSize] = useState({
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setScreenSize({
        width: window.width,
        height: window.height,
      });
    });

    return () => subscription?.remove();
  }, []);

  const containerHeight = screenSize.height / 3;
  const containerWidth = screenSize.width;

  return (
    <View style={styles.root}>
      {/* 1er conteneur - BLEU */}
      <View
        style={[
          styles.box,
          {
            height: containerHeight,
            width: containerWidth,
            // backgroundColor: "#1E90FF",
          },
        ]}
      >
        <Name />
      </View>

      {/* 2e conteneur */}
      <View
        style={[
          styles.box,
          {
            height: containerHeight,
            width: containerWidth,
            // backgroundColor: "#2ECC71",
          },
        ]}
      ></View>
      {/* 3e conteneur */}
      <View
        style={[
          styles.box,
          {
            height: containerHeight,
            width: containerWidth,
            // backgroundColor: "#F39C12",
          },
        ]}
      ></View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
  },
  box: {
    justifyContent: "center",
    alignItems: "center",
  },
});
