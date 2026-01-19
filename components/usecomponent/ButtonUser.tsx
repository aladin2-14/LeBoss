import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    LayoutAnimation,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    UIManager,
    View,
} from "react-native";

// 👉 Active animation Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function WalletTabs() {
  const [activeTab, setActiveTab] = useState<"history" | "wallet">("history");
  const [openAction, setOpenAction] = useState<number | null>(null);

  const toggleAction = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenAction(openAction === index ? null : index);
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

      {/* ================= CONTENT ================= */}
      <View style={styles.content}>
        {activeTab === "history" ? (
          <Text style={styles.contentText}>📜 Contenu Historique</Text>
        ) : (
          <Text style={styles.contentText}>💰 Contenu Porte-monnaie</Text>
        )}
      </View>

      {/* ================= ACTIONS (ACCORDION) ================= */}
      {["Modifier mon budget", "Dépense par catégorie", "Statistiques"].map(
        (label, index) => {
          const isOpen = openAction === index;

          return (
            <View key={index} style={styles.actionBox}>
              <TouchableOpacity
                style={styles.actionHeader}
                onPress={() => toggleAction(index)}
              >
                <Text style={styles.actionText}>{label}</Text>

                <MaterialIcons
                  name={isOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                  size={24}
                  color="#FACC15"
                />
              </TouchableOpacity>

              {isOpen && (
                <View style={styles.actionContent}>
                  <Text style={styles.actionContentText}>
                    Contenu de {label}
                  </Text>
                </View>
              )}
            </View>
          );
        }
      )}
    </View>
  );
}

// ================= STYLES =================
const styles = StyleSheet.create({
  container: {
    padding: 20,
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
    backgroundColor: "#1E4ED8",
  },

  tabText: {
    color: "#9CA3AF",
    fontWeight: "600",
  },

  tabActiveText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  // Content
  content: {
    marginTop: 20,
    padding: 20,
    borderRadius: 14,
    backgroundColor: "#111827",
  },

  contentText: {
    color: "#FFFFFF",
    fontSize: 14,
  },

  // Actions
  actionBox: {
    marginTop: 14,
    backgroundColor: "#0C0C1D",
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

  arrow: {
    color: "#FACC15",
    fontSize: 16,
  },

  actionContent: {
    padding: 16,
    backgroundColor: "#111827",
  },

  actionContentText: {
    color: "#9CA3AF",
    fontSize: 13,
  },
});
