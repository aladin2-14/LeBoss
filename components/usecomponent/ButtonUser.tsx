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
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

/* =========================================================
   TYPES
========================================================= */

type Transaction = {
  id: string;
  value: string;
};

type HistoryTransaction = {
  id: string;
  montant: number;
  source: "depense" | "epargne" | "investissement";
  categorie: string;
  description?: string;
  date: string;
};

type Props = {
  transactions: {
    [key: string]: Transaction[];
  };

  setTransactions: React.Dispatch<
    React.SetStateAction<{
      [key: string]: Transaction[];
    }>
  >;
};

/* =========================================================
   WALLET TABS
========================================================= */

export default function WalletTabs({
  transactions,
  setTransactions,
}: Props) {
  /* =======================================================
     ÉTATS
  ======================================================= */

  const [activeTab, setActiveTab] = useState<
    "history" | "wallet"
  >("history");

  const [openAction, setOpenAction] = useState<number | null>(
    null
  );

  const [inputValue, setInputValue] = useState("");

  /*
    🔥 Historique réel

    Cette donnée vient UNIQUEMENT de :

    @transactions_history
  */
  const [history, setHistory] = useState<
    HistoryTransaction[]
  >([]);

  /* =======================================================
     CATÉGORIES
  ======================================================= */

  const actions = [
    {
      label: "Dépense",
      color: "#462620",
      showInWallet: true,
    },

    {
      label: "Epargne",
      color: "#1E193A",
      showInWallet: true,
    },

    {
      label: "Investissement",
      color: "#00400C",
      showInWallet: true,
    },
  ];

  /* =======================================================
     OUVRIR / FERMER UNE CATÉGORIE
  ======================================================= */

  const toggleAction = (index: number) => {
    LayoutAnimation.configureNext(
      LayoutAnimation.Presets.easeInEaseOut
    );

    setOpenAction(
      openAction === index ? null : index
    );
  };

  /* =======================================================
     PORTE-MONNAIE
     
     Ces fonctions utilisent @transactions
  ======================================================= */

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

    await AsyncStorage.setItem(
      "@transactions",
      JSON.stringify(updated)
    );

    setInputValue("");
  };

  const deleteTransaction = async (
    label: string,
    id: string
  ) => {
    const updated = {
      ...transactions,

      [label]: transactions[label].filter(
        (t) => t.id !== id
      ),
    };

    setTransactions(updated);

    await AsyncStorage.setItem(
      "@transactions",
      JSON.stringify(updated)
    );
  };

  /* =======================================================
     FORMAT DATE
  ======================================================= */

  const formatDate = (date: string) => {
    try {
      const parsedDate = new Date(date);

      return parsedDate.toLocaleString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return date;
    }
  };

  /* =======================================================
     CHARGER @transactions_history
  ======================================================= */

  useEffect(() => {
    const loadHistory = async () => {
      try {
        /*
          🔥 IMPORTANT :

          L'HISTORIQUE utilise uniquement
          @transactions_history
        */

        const data = await AsyncStorage.getItem(
          "@transactions_history"
        );

        const parsed: HistoryTransaction[] = data
          ? JSON.parse(data)
          : [];

        console.log(
          "🔥 HISTORIQUE @transactions_history:",
          parsed
        );

        setHistory(parsed);
      } catch (error) {
        console.error(
          "❌ Erreur lecture @transactions_history:",
          error
        );
      }
    };

    loadHistory();
  }, []);

  /* =======================================================
     CONVERTIR LE LABEL UI EN SOURCE
  ======================================================= */

  const getSourceFromLabel = (
    label: string
  ): HistoryTransaction["source"] | null => {
    if (label === "Dépense") {
      return "depense";
    }

    if (label === "Epargne") {
      return "epargne";
    }

    if (label === "Investissement") {
      return "investissement";
    }

    return null;
  };

  /* =======================================================
     RÉCUPÉRER L'HISTORIQUE D'UNE CATÉGORIE
  ======================================================= */

  const getHistoryForAction = (
    label: string
  ): HistoryTransaction[] => {
    const source = getSourceFromLabel(label);

    if (!source) {
      return [];
    }

    /*
      Exemple :

      label = "Dépense"

      source = "depense"

      On récupère uniquement les transactions
      ayant :

      source: "depense"
    */

    return history.filter(
      (item) => item.source === source
    );
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <View style={styles.container}>
      {/* =================================================
          ONGLETS
      ================================================= */}

      <View style={styles.tabs}>
        {/* HISTORIQUE */}

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "history" &&
              styles.tabActive,
          ]}
          onPress={() =>
            setActiveTab("history")
          }
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "history" &&
                styles.tabActiveText,
            ]}
          >
            Historique
          </Text>
        </TouchableOpacity>

        {/* PORTE-MONNAIE */}

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "wallet" &&
              styles.tabActive,
          ]}
          onPress={() =>
            setActiveTab("wallet")
          }
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "wallet" &&
                styles.tabActiveText,
            ]}
          >
            Porte-monnaie
          </Text>
        </TouchableOpacity>
      </View>

      {/* =================================================
          CATÉGORIES
      ================================================= */}

      {actions
        .filter(
          (item) =>
            activeTab === "history" ||
            item.showInWallet
        )
        .map((item, index) => {
          const isOpen =
            openAction === index;

          /*
            🔥 HISTORIQUE

            Les données viennent de :

            @transactions_history
          */

          const historyTransactions =
            getHistoryForAction(item.label);

          /*
            💰 PORTE-MONNAIE

            Les données viennent de :

            @transactions
          */

          const walletTransactions =
            transactions[item.label] || [];

          return (
            <View
              key={index}
              style={[
                styles.actionBox,
                {
                  backgroundColor:
                    item.color,
                },
              ]}
            >
              {/* =========================================
                  HEADER
              ========================================= */}

              <TouchableOpacity
                style={styles.actionHeader}
                onPress={() =>
                  toggleAction(index)
                }
              >
                <Text style={styles.actionText}>
                  {item.label}
                </Text>

                <MaterialIcons
                  name={
                    isOpen
                      ? "keyboard-arrow-up"
                      : "keyboard-arrow-down"
                  }
                  size={24}
                  color="#FACC15"
                />
              </TouchableOpacity>

              {/* =========================================
                  CONTENU
              ========================================= */}

              {isOpen && (
                <View
                  style={styles.actionContent}
                >
                  {/* =====================================
                      🔥 HISTORIQUE
                  ===================================== */}

                  {activeTab ===
                    "history" && (
                    <View>
                      {historyTransactions.length >
                      0 ? (
                        /*
                          🔥 UNE SEULE TRANSACTION
                          VISIBLE À LA FOIS.

                          Le reste est accessible
                          avec le scroll vertical.
                        */

                        <FlatList
                          data={
                            historyTransactions
                          }
                          keyExtractor={(item) =>
                            item.id
                          }
                          style={
                            styles.historyList
                          }
                          showsVerticalScrollIndicator={
                            true
                          }
                          nestedScrollEnabled={
                            true
                          }
                          renderItem={({
                            item: t,
                          }) => (
                            <View
                              style={
                                styles.transactionRow
                              }
                            >
                              <View
                                style={
                                  styles.historyInfo
                                }
                              >
                                {/* =================
                                    CATÉGORIE
                                ================= */}

                                <Text
                                  style={
                                    styles.historyCategory
                                  }
                                >
                                  {t.categorie.trim()}
                                </Text>

                                {/* =================
                                    MONTANT
                                ================= */}

                                <Text
                                  style={
                                    styles.historyAmount
                                  }
                                >
                                  {t.montant} FBu
                                </Text>

                                {/* =================
                                    DATE
                                ================= */}

                                <Text
                                  style={
                                    styles.historyDate
                                  }
                                >
                                  {formatDate(
                                    t.date
                                  )}
                                </Text>

                                {/* =================
                                    DESCRIPTION
                                ================= */}

                                {t.description ? (
                                  <Text
                                    style={
                                      styles.historyDescription
                                    }
                                  >
                                    {t.description}
                                  </Text>
                                ) : null}
                              </View>
                            </View>
                          )}
                        />
                      ) : (
                        <Text
                          style={
                            styles.emptyHistory
                          }
                        >
                          Aucun historique
                        </Text>
                      )}
                    </View>
                  )}

                  {/* =====================================
                      💰 PORTE-MONNAIE
                  ===================================== */}

                  {activeTab ===
                    "wallet" &&
                    item.showInWallet && (
                      <View>
                        {/* INPUT */}

                        <View
                          style={
                            styles.inputRow
                          }
                        >
                          <TextInput
                            style={
                              styles.input
                            }
                            placeholder={`Ajouter ${item.label}`}
                            value={
                              inputValue
                            }
                            placeholderTextColor="#FFFFFF"
                            onChangeText={
                              setInputValue
                            }
                          />

                          <TouchableOpacity
                            style={
                              styles.addButton
                            }
                            onPress={() =>
                              saveTransaction(
                                item.label
                              )
                            }
                          >
                            <Ionicons
                              name="add"
                              size={20}
                              color="black"
                            />
                          </TouchableOpacity>
                        </View>

                        {/* LISTE PORTE-MONNAIE */}

                        {walletTransactions.length >
                          0 && (
                          <FlatList
                            data={
                              walletTransactions
                            }
                            keyExtractor={(
                              item
                            ) => item.id}
                            style={{
                              marginTop: 10,
                            }}
                            renderItem={({
                              item: t,
                            }) => (
                              <View
                                style={
                                  styles.transactionRow
                                }
                              >
                                <Text
                                  style={
                                    styles.transactionText
                                  }
                                >
                                  {t.value}
                                </Text>

                                <TouchableOpacity
                                  style={
                                    styles.deleteButton
                                  }
                                  onPress={() =>
                                    deleteTransaction(
                                      item.label,
                                      t.id
                                    )
                                  }
                                >
                                  <MaterialCommunityIcons
                                    name="delete-empty"
                                    size={24}
                                    color="#EA0000"
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

/* =========================================================
   STYLES
========================================================= */

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
    borderColor: "#EA0000",
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 8,
  },

  /* =======================================================
     🔥 HISTORIQUE
  ======================================================= */

  /*
    🔥 Hauteur limitée.

    Une transaction est visible.
    Pour les autres, on scrolle à l'intérieur.
  */

  historyList: {
    maxHeight: 125,
    marginTop: 10,
    borderRadius: 12,
  },

  historyInfo: {
    flex: 1,
  },

  historyCategory: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },

  historyAmount: {
    color: "#FFD700",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 4,
  },

  historyDate: {
    color: "#9CA3AF",
    fontSize: 12,
  },

  historyDescription: {
    color: "#D1D5DB",
    fontSize: 12,
    marginTop: 4,
  },

  emptyHistory: {
    color: "#9CA3AF",
    textAlign: "center",
    marginTop: 10,
  },
});

