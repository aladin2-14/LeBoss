import Button from "@/components/usecomponent/ButtonUser";
import Profile from "@/components/usecomponent/Profile";
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
      <Profile />
      <Button />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
  },
});
