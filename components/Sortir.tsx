import ModalS from "@/components/Modal/ModalS";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { getUserFinancialData, sortirArgent } from "../data";

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
        monthIndex={monthIndex} // ← on envoie le mois choisi
        onClose={() => setOpen(false)}
        onConfirm={(index, amount) => {
          console.log("MonthIndex :", index, "Montant :", amount);
          sortirArgent(index, amount); // applique le retrait dans data.ts
          console.log("État du mois après retrait :", getUserFinancialData()[index]);
          setOpen(false);
        }}
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
