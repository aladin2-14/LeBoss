import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
  monthIndex: number;
};

export default function Mettre({ monthIndex }: Props) {
  return (
    <Pressable
      style={styles.button}
      onPress={() => {
        console.log("METTRE - mois index :", monthIndex);
      }}
    >
      <Text style={styles.text}>Mettre</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#33C000",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
