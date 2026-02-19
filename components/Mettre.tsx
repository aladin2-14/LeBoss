import ModalM from "@/components/Modal/ModalM";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  monthIndex: number;
};

export default function Mettre({ monthIndex }: Props) {
  const [open, setOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0); // pour refresh CadeStatistique

  return (
    <View>
      <Pressable style={styles.button} onPress={() => setOpen(true)}>
        <Text style={styles.text}>Mettre</Text>
      </Pressable>

      <ModalM
        visible={open}
        monthIndex={monthIndex}
        onClose={() => setOpen(false)}
        onUpdate={() => setRefreshTrigger((prev) => prev + 1)} // 🔹 déclenche refresh
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#085D00",
    paddingVertical: 14,
    paddingHorizontal: 54,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
