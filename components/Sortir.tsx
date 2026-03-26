import ModalCategorie from "@/components/Modal/ModalCategorie";
import ModalS from "@/components/Modal/ModalS";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  monthIndex: number;
};

export default function Sortir({ monthIndex }: Props) {
  const [openSource, setOpenSource] = useState(false);
  const [openCategorie, setOpenCategorie] = useState(false);
  const [currentMontant, setCurrentMontant] = useState(0);
  const [currentSource, setCurrentSource] = useState<
    "depense" | "investissement" | "epargne"
  >("depense");

  // Fonction finale appelée depuis le deuxième modal
  const handleSortieFinale = (categorie: string, description?: string) => {
    import("@/data").then(({ sortirArgent }) => {
      sortirArgent(monthIndex, currentMontant, currentSource, categorie, description);
    });
    setOpenCategorie(false);
  };

  return (
    <View>
      <Pressable style={styles.button} onPress={() => setOpenSource(true)}>
        <Text style={styles.text}>Sortir</Text>
      </Pressable>

      {/* Premier modal */}
      <ModalS
        visible={openSource}
        monthIndex={monthIndex}
        solde={1000} // remplacer par ton vrai solde
        onClose={() => setOpenSource(false)}
        onConfirm={(montant, source) => {
          setCurrentMontant(montant);
          setCurrentSource(source);
          setOpenSource(false);
          setOpenCategorie(true);
        }}
      />

      {/* Deuxième modal */}
      <ModalCategorie
        visible={openCategorie}
        source={currentSource}
        montant={currentMontant}
        onClose={() => setOpenCategorie(false)}
          onConfirm={handleSortieFinale}
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