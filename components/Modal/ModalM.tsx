import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  LayoutAnimation,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  UIManager,
  Vibration,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

interface Props {
  visible: boolean;
  monthIndex: number;
  onClose: () => void;
  onConfirm: (
    monthIndex: number,
    montant: number,
    depensePct: number,
    investissementPct: number,
    epargnePct: number
  ) => void;
}

export default function ModalM({
  visible,
  monthIndex,
  onClose,
  onConfirm,
}: Props) {
  const [montant, setMontant] = useState("");
  const [open, setOpen] = useState(false);
  const [depense, setDepense] = useState("0");
  const [investissement, setInvestissement] = useState("0");
  const [epargne, setEpargne] = useState("0");

  const toggle = () => {
    LayoutAnimation.easeInEaseOut();
    setOpen(!open);
  };

  const handleConfirm = () => {
    const montantNum = parseFloat(montant);
    const depensePct = parseFloat(depense);
    const investissementPct = parseFloat(investissement);
    const epargnePct = parseFloat(epargne);

    if (!isNaN(montantNum) && montantNum > 0) {
      onConfirm(
        monthIndex,
        montantNum,
        depensePct,
        investissementPct,
        epargnePct
      );

      // vibration courte
      Vibration.vibrate(100);

      // toast
      const message = montantNum
        ? `Vous venez de recharger : ${montantNum.toLocaleString()} FBu`
        : `Capital chargé : ${montantNum.toLocaleString()} FBu`;

      Toast.show({
        type: "success",
        text1: message,
        position: "bottom",
        visibilityTime: 2500,
        bottomOffset: 60,
      });

      setMontant("");
      onClose();
    }
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.container} onPress={() => {}}>
          <Text style={styles.title}>Récupération</Text>

          <TextInput
            style={styles.input}
            placeholder="Montant"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={montant}
            onChangeText={setMontant}
          />

          <Pressable onPress={toggle} style={styles.paramRow}>
            <Text style={styles.paramText}>
              Modifier les paramètres existants
            </Text>
            <Ionicons
              name={open ? "chevron-up" : "chevron-down"}
              size={22}
              color="#AAA"
            />
          </Pressable>

          {open && (
            <View style={styles.paramsBox}>
              <PercentField
                label="Dépense"
                value={depense}
                setValue={setDepense}
              />
              <PercentField
                label="Investissement"
                value={investissement}
                setValue={setInvestissement}
              />
              <PercentField
                label="Épargne"
                value={epargne}
                setValue={setEpargne}
              />
            </View>
          )}

          <Pressable style={styles.btn} onPress={handleConfirm}>
            <Text style={styles.btnText}>Valider</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function PercentField({ label, value, setValue }: any) {
  return (
    <View style={styles.percentRow}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.percentBox}>
        <TextInput
          style={styles.percentInput}
          keyboardType="numeric"
          value={value}
          onChangeText={setValue}
        />
        <Text style={styles.percent}>%</Text>
      </View>
    </View>
  );
}

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
    elevation: 10,
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
    borderWidth: 0,
  },

  paramRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },

  paramText: {
    color: "#AAA",
    fontSize: 14,
  },

  paramsBox: {
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: "#333",
    paddingTop: 10,
  },

  percentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 6,
  },

  label: {
    fontSize: 15,
    color: "#FFF",
  },

  percentBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2A2A2A",
    borderRadius: 8,
    paddingHorizontal: 10,
  },

  percentInput: {
    borderWidth: 0,
    color: "#FFF",
    padding: 8,
    width: 60,
    textAlign: "center",
  },

  percent: {
    marginLeft: 6,
    fontSize: 16,
    color: "#AAA",
  },

  btn: {
    backgroundColor: "#FFD700",
    padding: 14,
    borderRadius: 14,
    marginTop: 20,
  },

  btnText: {
    color: "#0C0C1D",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
});
