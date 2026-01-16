import ModalM from "@/components/Modal/ModalM";
import { recupererArgent } from "@/data";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  monthIndex: number;
};

export default function Mettre({ monthIndex }: Props) {
  const [open, setOpen] = useState(false);

  const handleConfirm = (
    monthIndex: number,
    montant: number,
    depensePct: number,
    investissementPct: number,
    epargnePct: number
  ) => {
    recupererArgent(
      monthIndex,
      montant,
      depensePct,
      investissementPct,
      epargnePct
    );
    setOpen(false);
  };

  return (
    <View>
      <Pressable style={styles.button} onPress={() => setOpen(true)}>
        <Text style={styles.text}>Mettre</Text>
      </Pressable>

      <ModalM
        visible={open}
        monthIndex={monthIndex}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirm}
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
  text: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
});
