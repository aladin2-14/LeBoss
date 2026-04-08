import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  Vibration,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

interface Props {
  visible: boolean;
  source: "depense" | "investissement" | "epargne";
  montant: number;
  onClose: () => void;
  onConfirm: (categorie: string, description?: string) => void;
}

export default function ModalCategorie({
  visible,
  source,
  montant,
  onClose,
  onConfirm,
}: Props) {
  const [selectedCategorie, setSelectedCategorie] = useState<string | null>(
    null
  );
  const [description, setDescription] = useState("");

  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const dataRaw = await AsyncStorage.getItem("@transactions");
        if (!dataRaw) return;

        const all = JSON.parse(dataRaw);

        // Normaliser le nom de la source pour correspondre aux clés dans storage
        const keyMap: Record<string, string> = {
          depense: "Dépense",
          investissement: "Investissement",
          epargne: "Epargne",
        };

        const key = keyMap[source.toLowerCase()];
        setOptions(all[key] || []);
      } catch (error) {
        console.warn("Erreur lors du chargement des sous-catégories:", error);
        setOptions([]);
      }
    };

    if (visible) {
      loadOptions();
      setSelectedCategorie(null);
      setDescription("");
    }
  }, [visible, source]);

  const handleConfirm = async () => {
    if (!selectedCategorie) {
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: "Veuillez choisir une catégorie",
        position: "bottom",
        bottomOffset: 50,
        visibilityTime: 2500,
      });
      Vibration.vibrate(300);
      return;
    }

    // Enregistrer dans @depensedata
    const depenseDataRaw = await AsyncStorage.getItem("@depensedata");
    const depenseData = depenseDataRaw ? JSON.parse(depenseDataRaw) : {};

    const updatedDepense = {
      ...depenseData,
      [Date.now()]: [
        {
          id: Date.now().toString(),
          value: montant,
          source,
          categorie: selectedCategorie,
          description,
        },
      ],
    };

    await AsyncStorage.setItem("@depensedata", JSON.stringify(updatedDepense));

    // Appeler le parent pour retirer le montant
    onConfirm(selectedCategorie, description);

    Vibration.vibrate(100);
    Toast.show({
      type: "success",
      text1: "Montant retiré",
      text2: `${montant.toLocaleString()} FBu`,
      position: "bottom",
      bottomOffset: 50,
      visibilityTime: 2500,
    });
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.container} onPress={() => {}}>
          <Text style={styles.title}>Choisir catégorie</Text>

          <View style={styles.selectBox}>
            {options.map((item) => (
              <Pressable
                key={item.id}
                style={[
                  styles.option,
                  selectedCategorie === item.value && styles.optionActive,
                ]}
                onPress={() => setSelectedCategorie(item.value)}
              >
                {/* Affiche la valeur et non l'objet entier */}
                <Text style={styles.optionText}>{item.value}</Text>
              </Pressable>
            ))}
          </View>

          <TextInput
            style={styles.input}
            placeholder="Description (optionnel)"
            placeholderTextColor="#999"
            value={description}
            onChangeText={setDescription}
          />

          <Pressable style={styles.btn} onPress={handleConfirm}>
            <Text style={styles.btnText}>Valider</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

// Styles identiques à ModalS
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    backgroundColor: "#1E1E1E",
    borderRadius: 22,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFF",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#2A2A2A",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: "#FFF",
    marginBottom: 10,
  },
  selectBox: { marginBottom: 10 },
  option: {
    backgroundColor: "#2A2A2A",
    padding: 12,
    borderRadius: 10,
    marginBottom: 6,
  },
  optionActive: { borderWidth: 1, borderColor: "#FFD700" },
  optionText: { color: "#FFF" },
  btn: {
    backgroundColor: "#FFD700",
    padding: 14,
    borderRadius: 14,
    marginTop: 10,
  },
  btnText: {
    color: "#0C0C1D",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
});
