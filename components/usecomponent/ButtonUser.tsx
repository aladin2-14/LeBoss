import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
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
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// 👉 Active animation Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Transaction = { id: string; value: string };

export default function WalletTabs() {
  const [activeTab, setActiveTab] = useState<"history" | "wallet">("history");
  const [openAction, setOpenAction] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [transactions, setTransactions] = useState<{
    [key: string]: Transaction[];
  }>({});

  const actions = [
    { label: "Budget", color: "#101C36", showInWallet: false },
    { label: "Dépense", color: "#462620", showInWallet: true },
    { label: "Crédit ou Dette", color: "#1E193A", showInWallet: true },
  ];

  useEffect(() => {
    loadTransactions();
  }, []);

  const toggleAction = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenAction(openAction === index ? null : index);
  };

  // 🔹 Ajouter une transaction
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

  // 🔹 Supprimer une transaction
  const deleteTransaction = async (label: string, id: string) => {
    const updated = {
      ...transactions,
      [label]: transactions[label].filter((t) => t.id !== id),
    };
    setTransactions(updated);
    await AsyncStorage.setItem("@transactions", JSON.stringify(updated));
  };

  const loadTransactions = async () => {
    const data = await AsyncStorage.getItem("@transactions");
    if (data) setTransactions(JSON.parse(data));
  };

  return (
    <View style={styles.container}>
      {/* ================= TABS ================= */}
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

      {/* ================= ACTIONS (ACCORDION) ================= */}
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

                {/* Icône dynamique selon l'état */}
                <MaterialIcons
                  name={isOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                  size={24}
                  color="#FACC15"
                />
              </TouchableOpacity>

              {isOpen && (
                <View style={styles.actionContent}>
                  {/* 💰 Input + bouton Ajouter */}
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
                          {/* <Text style={styles.addButtonText}>Ajouter</Text> */}
                          <Ionicons name="add" size={20} color="black" />
                        </TouchableOpacity>
                      </View>

                      {/* Liste spécifique de l'action */}
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
                                {/* <Text style={styles.deleteButtonText}>✖</Text> */}
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

// ================= STYLES =================
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

  // Tabs
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
    color: "#0C0C1D",
  },

  tabText: {
    color: "#9CA3AF",
    fontWeight: "600",
  },

  tabActiveText: {
    color: "#0C0C1D",
    fontWeight: "700",
  },

  // Actions
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

  addButtonText: {
    fontWeight: "700",
    color: "#0C0C1D",
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
    // backgroundColor: "#FF4D4F",
    borderColor: "#FFD700",
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 8,
  },

  deleteButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
});
