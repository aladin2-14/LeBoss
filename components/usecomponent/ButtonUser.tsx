import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  FlatList,
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Transaction = { id: string; value: string };

type Props = {
  transactions: { [key: string]: Transaction[] };
  setTransactions: React.Dispatch<
    React.SetStateAction<{ [key: string]: Transaction[] }>
  >;
};

export default function WalletTabs({ transactions, setTransactions }: Props) {
  const [activeTab, setActiveTab] = useState<"history" | "wallet">("history");
  const [openAction, setOpenAction] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState("");

  const actions = [
    { label: "Budget", color: "#101C36", showInWallet: false },
    { label: "Dépense", color: "#462620", showInWallet: true },
    { label: "Crédit ou Dette", color: "#1E193A", showInWallet: true },
  ];

  const toggleAction = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenAction(openAction === index ? null : index);
  };

  const saveTransaction = async (label: string) => {
    if (!inputValue) return;

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      value: inputValue,
    };

    const updated = {
      ...transactions,
      [label]: transactions[label]
        ? [newTransaction, ...transactions[label]]
        : [newTransaction],
    };

    setTransactions(updated);
    await AsyncStorage.setItem("@transactions", JSON.stringify(updated));

    setInputValue("");
  };

  const deleteTransaction = async (label: string, id: string) => {
    const updated = {
      ...transactions,
      [label]: transactions[label].filter((t) => t.id !== id),
    };

    setTransactions(updated);
    await AsyncStorage.setItem("@transactions", JSON.stringify(updated));
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "history" && styles.tabActive]}
          onPress={() => setActiveTab("history")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "history" && styles.tabActiveText,
            ]}
          >
            Historique
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "wallet" && styles.tabActive]}
          onPress={() => setActiveTab("wallet")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "wallet" && styles.tabActiveText,
            ]}
          >
            Porte-monnaie
          </Text>
        </TouchableOpacity>
      </View>

      {actions
        .filter((item) => activeTab === "history" || item.showInWallet)
        .map((item, index) => {
          const isOpen = openAction === index;
          const trans = transactions[item.label] || [];

          return (
            <View
              key={index}
              style={[styles.actionBox, { backgroundColor: item.color }]}
            >
              <TouchableOpacity
                style={styles.actionHeader}
                onPress={() => toggleAction(index)}
              >
                <Text style={styles.actionText}>{item.label}</Text>

                <MaterialIcons
                  name={isOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                  size={24}
                  color="#FACC15"
                />
              </TouchableOpacity>

              {isOpen && (
                <View style={styles.actionContent}>
                  {activeTab === "wallet" && item.showInWallet && (
                    <View>
                      <View style={styles.inputRow}>
                        <TextInput
                          style={styles.input}
                          placeholder={`Ajouter ${item.label}`}
                          value={inputValue}
                          placeholderTextColor="#FFFFFF"
                          onChangeText={setInputValue}
                        />
                        <TouchableOpacity
                          style={styles.addButton}
                          onPress={() => saveTransaction(item.label)}
                        >
                          <Ionicons name="add" size={20} color="black" />
                        </TouchableOpacity>
                      </View>

                      {trans.length > 0 && (
                        <FlatList
                          data={trans}
                          keyExtractor={(t) => t.id}
                          style={{ marginTop: 10 }}
                          renderItem={({ item: t }) => (
                            <View style={styles.transactionRow}>
                              <Text style={styles.transactionText}>
                                {t.value}
                              </Text>
                              <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() =>
                                  deleteTransaction(item.label, t.id)
                                }
                              >
                                <MaterialCommunityIcons
                                  name="delete-empty"
                                  size={24}
                                  color="#FFD700"
                                />
                              </TouchableOpacity>
                            </View>
                          )}
                        />
                      )}
                    </View>
                  )}
                </View>
              )}
            </View>
          );
        })}
    </View>
  );
}

/* 🔹 Styles inchangés */
const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: "#363741",
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 15,
    marginHorizontal: 12,
    marginTop: 20,
    borderRadius: 20,
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: "#0C0C1D",
    borderRadius: 16,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  tabActive: {
    backgroundColor: "#FFD700",
  },
  tabText: {
    color: "#9CA3AF",
    fontWeight: "600",
  },
  tabActiveText: {
    color: "#0C0C1D",
    fontWeight: "700",
  },
  actionBox: {
    marginTop: 14,
    borderRadius: 14,
    overflow: "hidden",
  },
  actionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  actionText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  actionContent: {
    padding: 16,
    backgroundColor: "#111827",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 12,
    color: "#fff",
    backgroundColor: "#1F2937",
    marginRight: 10,
  },
  addButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: "#FFD700",
    borderRadius: 12,
  },
  transactionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1F2937",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  transactionText: {
    color: "#fff",
    flex: 1,
  },
  deleteButton: {
    marginLeft: 10,
    borderColor: "#FFD700",
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 8,
  },
});
