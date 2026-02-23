import ModalS from "@/components/Modal/ModalS";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  monthIndex: number;
};

export default function Sortir({ monthIndex }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <View>
      <Pressable style={styles.button} onPress={() => setOpen(true)}>
        <Text style={styles.text}>Sortir</Text>
      </Pressable>

      <ModalS
        visible={open}
        monthIndex={monthIndex}
        onClose={() => setOpen(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#720000",
    paddingVertical: 14,
    paddingHorizontal: 54,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
