// // import Bhistorique from "@/components/ButtonHistorique";
// // import { getUserGoals, MonthlyGoal, MONTHS } from "@/data";
// // import React, { useEffect, useState } from "react";
// // import {
// //   ScrollView,
// //   StyleSheet,
// //   Text,
// //   TouchableOpacity,
// //   useWindowDimensions,
// //   View,
// // } from "react-native";

// // export default function Historique() {
// //   const { width, height } = useWindowDimensions();

// //   // 📌 Mois actuel par défaut
// //   const currentMonthIndex = new Date().getMonth();

// //   const [goals, setGoals] = useState<MonthlyGoal[]>([]);
// //   const [activeMonthIndex, setActiveMonthIndex] =
// //     useState<number>(currentMonthIndex);

// //   // 🔥 Charger les objectifs du mois actuel au démarrage
// //   useEffect(() => {
// //     loadGoals(currentMonthIndex);
// //   }, []);

// //   const loadGoals = async (monthIndex: number) => {
// //     const data = await getUserGoals(monthIndex);
// //     setGoals(data);
// //   };

// //   // 📌 Quand on clique sur un mois
// //   const handleMonthPress = async (index: number) => {
// //     console.log("🟢 Mois cliqué :", MONTHS[index], "==", index);
// //     setActiveMonthIndex(index);
// //     await loadGoals(index);
// //   };

// //   return (
// //     <View
// //       style={[styles.container, { width: width * 0.95, height: height * 0.41 }]}
// //     >
// //       {/* ========================= */}
// //       {/* 🟡 BARRE DES MOIS */}
// //       {/* ========================= */}
// //       <View style={styles.monthBar}>
// //         {MONTHS.map((month, index) => {
// //           const letter = month.charAt(0).toUpperCase();
// //           const isActive = activeMonthIndex === index;

// //           return (
// //             <TouchableOpacity
// //               key={index}
// //               onPress={() => handleMonthPress(index)}
// //               style={[styles.monthItem, isActive && styles.monthItemActive]}
// //             >
// //               <Text
// //                 style={[
// //                   styles.monthLetter,
// //                   isActive && styles.monthLetterActive,
// //                 ]}
// //               >
// //                 {letter}
// //               </Text>
// //             </TouchableOpacity>
// //           );
// //         })}
// //       </View>

// //       {/* ========================= */}
// //       {/* 🟡 HISTORIQUE + BOUTON */}
// //       {/* ========================= */}
// //       <ScrollView
// //         showsVerticalScrollIndicator={false}
// //         contentContainerStyle={styles.content}
// //       >
// //         <View style={styles.historiqueWrapper}>
// //           <Bhistorique monthIndex={activeMonthIndex} />
// //         </View>
// //         {goals.length === 0 ? (
// //           <View style={styles.emptyContainer}>
// //             <Text style={styles.emptyText}>
// //               Aucun historique pour le mois de {MONTHS[activeMonthIndex]}.
// //             </Text>
// //           </View>
// //         ) : (
// //           goals.map((goal, index) => (
// //             <View key={index} style={styles.item}>
// //               <Text style={styles.month}>{goal.month}</Text>
// //               <Text style={styles.title}>{goal.title}</Text>
// //               <Text style={styles.desc}>{goal.description}</Text>
// //               <Text
// //                 style={[
// //                   styles.status,
// //                   {
// //                     color:
// //                       goal.status === "achieved"
// //                         ? "#4CAF50"
// //                         : goal.status === "in-progress"
// //                         ? "#FFC107"
// //                         : "#FF5252",
// //                   },
// //                 ]}
// //               >
// //                 {goal.status === "achieved"
// //                   ? "Objectif atteint"
// //                   : goal.status === "in-progress"
// //                   ? "En cours"
// //                   : "Non atteint"}
// //               </Text>
// //             </View>
// //           ))
// //         )}
// //       </ScrollView>
// //     </View>
// //   );
// // }

// // // ===============================
// // // 🎨 STYLES
// // // ===============================
// // const styles = StyleSheet.create({
// //   container: {
// //     backgroundColor: "#0C0C1D",
// //     borderRadius: 20,
// //     borderWidth: 1.6,
// //     borderColor: "#363741",
// //     overflow: "hidden",
// //   },
// //   historiqueWrapper: {
// //     alignItems: "flex-end",
// //     paddingHorizontal: 12,
// //     marginBottom: 6,
// //   },
// //   monthBar: {
// //     flexDirection: "row",
// //     gap: 2,
// //     padding: 12,
// //   },
// //   monthItem: {
// //     flex: 1,
// //     height: 38,
// //     borderRadius: 10,
// //     borderWidth: 2,
// //     borderColor: "#363741",
// //     justifyContent: "center",
// //     alignItems: "center",
// //     backgroundColor: "#0C0C1D",
// //   },
// //   monthItemActive: {
// //     backgroundColor: "#f5c400",
// //     borderColor: "#f5c400",
// //   },
// //   monthLetter: {
// //     color: "#f5c400",
// //     fontWeight: "bold",
// //   },
// //   monthLetterActive: {
// //     color: "#0C0C1D",
// //   },
// //   content: {
// //     paddingTop: 5,
// //     paddingHorizontal: 12,
// //     paddingBottom: 6,
// //   },
// //   item: {
// //     padding: 14,
// //     marginBottom: 10,
// //     backgroundColor: "#0C0C1D",
// //     borderRadius: 12,
// //     borderWidth: 1,
// //     borderColor: "#222",
// //   },
// //   month: {
// //     color: "#aaa",
// //     fontSize: 12,
// //   },
// //   title: {
// //     color: "#fff",
// //     fontSize: 15,
// //     fontWeight: "bold",
// //     marginTop: 4,
// //   },
// //   desc: {
// //     color: "#ccc",
// //     fontSize: 13,
// //     marginTop: 4,
// //   },
// //   status: {
// //     marginTop: 8,
// //     fontWeight: "bold",
// //     fontSize: 12,
// //   },
// //   emptyContainer: {
// //     alignItems: "center",
// //     justifyContent: "center",
// //     paddingVertical: 30,
// //     width: "100%", // pour s’assurer que le texte prend toute la largeur
// //   },
// //   emptyText: {
// //     color: "#888",
// //     fontSize: 14,
// //     fontStyle: "italic",
// //     textAlign: "center", // centre le texte
// //     flexWrap: "wrap",    // autorise le retour à la ligne
// //     width: "90%",        // pour limiter la largeur à 90% de la zone parent
// //   },

// // });
// import Bhistorique from "@/components/ButtonHistorique";
// import { getUserGoals, MonthlyGoal, MONTHS } from "@/data";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import React, { useEffect, useState } from "react";
// import {
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   useWindowDimensions,
//   View,
// } from "react-native";

// export default function Historique() {
//   const { width, height } = useWindowDimensions();

//   const currentMonthIndex = new Date().getMonth();

//   const [goals, setGoals] = useState<MonthlyGoal[]>([]);
//   const [activeMonthIndex, setActiveMonthIndex] =
//     useState<number>(currentMonthIndex);

//   useEffect(() => {
//     loadGoals(currentMonthIndex);
//   }, []);

//   const loadGoals = async (monthIndex: number) => {
//     const data = await getUserGoals(monthIndex);
//     setGoals(data);
//   };

//   const handleMonthPress = async (index: number) => {
//     setActiveMonthIndex(index);
//     await loadGoals(index);
//   };

//   // ✏️ MODIFIER (simple exemple)
//   const handleUpdate = async (goal: MonthlyGoal) => {
//     const STORAGE_KEY = "goals";

//     const data = await AsyncStorage.getItem(STORAGE_KEY);
//     let goalsData = data ? JSON.parse(data) : {};

//     if (!goalsData[goal.month]) return;

//     goalsData[goal.month] = goalsData[goal.month].map((item: any) => {
//       if (item.idhistorique === goal.idhistorique) {
//         return {
//           ...item,
//           title: item.title + " (modifié)",
//         };
//       }
//       return item;
//     });

//     await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(goalsData));

//     await loadGoals(activeMonthIndex);
//   };

//   // 🗑️ SUPPRIMER (soft delete)
//   const handleDelete = async (goal: MonthlyGoal) => {
//     const STORAGE_KEY = "goals";

//     const data = await AsyncStorage.getItem(STORAGE_KEY);
//     let goalsData = data ? JSON.parse(data) : {};

//     if (!goalsData[goal.month]) return;

//     goalsData[goal.month] = goalsData[goal.month].map((item: any) => {
//       if (item.idhistorique === goal.idhistorique) {
//         return {
//           ...item,
//           status: "deleted",
//         };
//       }
//       return item;
//     });

//     await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(goalsData));

//     await loadGoals(activeMonthIndex);
//   };

//   return (
//     <View
//       style={[styles.container, { width: width * 0.95, height: height * 0.41 }]}
//     >
//       {/* ========================= */}
//       {/* 🟡 BARRE DES MOIS */}
//       {/* ========================= */}
//       <View style={styles.monthBar}>
//         {MONTHS.map((month, index) => {
//           const letter = month.charAt(0).toUpperCase();
//           const isActive = activeMonthIndex === index;

//           return (
//             <TouchableOpacity
//               key={index}
//               onPress={() => handleMonthPress(index)}
//               style={[styles.monthItem, isActive && styles.monthItemActive]}
//             >
//               <Text
//                 style={[
//                   styles.monthLetter,
//                   isActive && styles.monthLetterActive,
//                 ]}
//               >
//                 {letter}
//               </Text>
//             </TouchableOpacity>
//           );
//         })}
//       </View>

//       {/* ========================= */}
//       {/* 🟡 HISTORIQUE */}
//       {/* ========================= */}
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.content}
//       >
//         <View style={styles.historiqueWrapper}>
//           <Bhistorique monthIndex={activeMonthIndex} />
//         </View>

//         {goals.filter((goal) => goal.status !== "deleted").length === 0 ? (
//           <View style={styles.emptyContainer}>
//             <Text style={styles.emptyText}>
//               Aucun historique pour le mois de {MONTHS[activeMonthIndex]}.
//             </Text>
//           </View>
//         ) : (
//           goals
//             .filter((goal) => goal.status !== "deleted")
//             .map((goal, index) => (
//               <View key={index} style={styles.item}>
//                 <Text style={styles.month}>{goal.month}</Text>
//                 <Text style={styles.title}>{goal.title}</Text>
//                 <Text style={styles.desc}>{goal.description}</Text>

//                 <Text
//                   style={[
//                     styles.status,
//                     {
//                       color:
//                         goal.status === "achieved"
//                           ? "#4CAF50"
//                           : goal.status === "in-progress"
//                           ? "#FFC107"
//                           : "#FF5252",
//                     },
//                   ]}
//                 >
//                   {goal.status === "achieved"
//                     ? "Objectif atteint"
//                     : goal.status === "in-progress"
//                     ? "En cours"
//                     : "Non atteint"}
//                 </Text>

//                 {/* ========================= */}
//                 {/* 🟡 BOUTONS */}
//                 {/* ========================= */}
//                 <View style={styles.actions}>
//                   <TouchableOpacity
//                     style={[styles.btn, styles.editBtn]}
//                     onPress={() => handleUpdate(goal)}
//                   >
//                     <Text style={styles.btnText}>Modifier</Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                     style={[styles.btn, styles.deleteBtn]}
//                     onPress={() => handleDelete(goal)}
//                   >
//                     <Text style={styles.btnText}>Supprimer</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             ))
//         )}
//       </ScrollView>
//     </View>
//   );
// }

// // ===============================
// // 🎨 STYLES
// // ===============================
// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#0C0C1D",
//     borderRadius: 20,
//     borderWidth: 1.6,
//     borderColor: "#363741",
//     overflow: "hidden",
//   },
//   historiqueWrapper: {
//     alignItems: "flex-end",
//     paddingHorizontal: 12,
//     marginBottom: 6,
//   },
//   monthBar: {
//     flexDirection: "row",
//     gap: 2,
//     padding: 12,
//   },
//   monthItem: {
//     flex: 1,
//     height: 38,
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: "#363741",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#0C0C1D",
//   },
//   monthItemActive: {
//     backgroundColor: "#f5c400",
//     borderColor: "#f5c400",
//   },
//   monthLetter: {
//     color: "#f5c400",
//     fontWeight: "bold",
//   },
//   monthLetterActive: {
//     color: "#0C0C1D",
//   },
//   content: {
//     paddingTop: 5,
//     paddingHorizontal: 12,
//     paddingBottom: 6,
//   },
//   item: {
//     padding: 14,
//     marginBottom: 10,
//     backgroundColor: "#0C0C1D",
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#222",
//   },
//   month: {
//     color: "#aaa",
//     fontSize: 12,
//   },
//   title: {
//     color: "#fff",
//     fontSize: 15,
//     fontWeight: "bold",
//     marginTop: 4,
//   },
//   desc: {
//     color: "#ccc",
//     fontSize: 13,
//     marginTop: 4,
//   },
//   status: {
//     marginTop: 8,
//     fontWeight: "bold",
//     fontSize: 12,
//   },
//   actions: {
//     flexDirection: "row",
//     marginTop: 10,
//     gap: 10,
//   },
//   btn: {
//     flex: 1,
//     padding: 8,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   editBtn: {
//     backgroundColor: "#f5c400",
//   },
//   deleteBtn: {
//     backgroundColor: "#FF5252",
//   },
//   btnText: {
//     color: "#0C0C1D",
//     fontWeight: "bold",
//     fontSize: 12,
//   },
//   emptyContainer: {
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 30,
//     width: "100%",
//   },
//   emptyText: {
//     color: "#888",
//     fontSize: 14,
//     fontStyle: "italic",
//     textAlign: "center",
//     flexWrap: "wrap",
//     width: "90%",
//   },
// });
import Bhistorique from "@/components/ButtonHistorique";
import { getUserGoals, MonthlyGoal, MONTHS, STORAGE_KEYS } from "@/data";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

export default function Historique() {
  const { width, height } = useWindowDimensions();

  const currentMonthIndex = new Date().getMonth();

  const [goals, setGoals] = useState<MonthlyGoal[]>([]);
  const [activeMonthIndex, setActiveMonthIndex] =
    useState<number>(currentMonthIndex);

  useEffect(() => {
    loadGoals(currentMonthIndex);
  }, []);

  const loadGoals = async (monthIndex: number) => {
    const data = await getUserGoals(monthIndex);
    setGoals(data);
  };

  const handleMonthPress = async (index: number) => {
    setActiveMonthIndex(index);
    await loadGoals(index);
  };

  // ✏️ MODIFIER (exemple simple)
  const handleUpdate = async (goal: MonthlyGoal) => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.GOALS);

      if (!data) return;

      let goalsData = JSON.parse(data);

      if (!goalsData[goal.month]) return;

      goalsData[goal.month] = goalsData[goal.month].map((item: any) => {
        if (item.idhistorique === goal.idhistorique) {
          return {
            ...item,
            title: item.title + " (modifié)",
          };
        }
        return item;
      });

      await AsyncStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goalsData));

      await loadGoals(activeMonthIndex);
    } catch (error) {
      console.log("Erreur update :", error);
    }
  };

  // 🗑️ SUPPRIMER (DELETE RÉEL)
  const handleDelete = async (goal: MonthlyGoal) => {
    console.log("🔥 DELETE CLICK");

    // 🔍 LOG DE L'OBJECTIF CHOISI
    console.log("🎯 OBJECTIF À SUPPRIMER :", goal);

    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.GOALS);

      if (!data) return;

      let goalsData = JSON.parse(data);

      console.log("📦 STORAGE :", goalsData);

      const updatedData = goalsData.filter(
        (item: any) =>
          !(
            item.month === goal.month &&
            String(item.idhistorique) === String(goal.idhistorique)
          )
      );

      console.log("🧨 OBJECTIFS APRÈS FILTRE :", updatedData);

      await AsyncStorage.setItem(
        STORAGE_KEYS.GOALS,
        JSON.stringify(updatedData)
      );

      await loadGoals(activeMonthIndex);
    } catch (error) {
      console.log("❌ ERREUR :", error);
    }
  };
  return (
    <View
      style={[styles.container, { width: width * 0.95, height: height * 0.41 }]}
    >
      {/* ========================= */}
      {/* 🟡 BARRE DES MOIS */}
      {/* ========================= */}
      <View style={styles.monthBar}>
        {MONTHS.map((month, index) => {
          const letter = month.charAt(0).toUpperCase();
          const isActive = activeMonthIndex === index;

          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleMonthPress(index)}
              style={[styles.monthItem, isActive && styles.monthItemActive]}
            >
              <Text
                style={[
                  styles.monthLetter,
                  isActive && styles.monthLetterActive,
                ]}
              >
                {letter}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* ========================= */}
      {/* 🟡 LISTE */}
      {/* ========================= */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.historiqueWrapper}>
          <Bhistorique monthIndex={activeMonthIndex} />
        </View>

        {goals.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Aucun historique pour le mois de {MONTHS[activeMonthIndex]}.
            </Text>
          </View>
        ) : (
          goals.map((goal, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.month}>{goal.month}</Text>
              <Text style={styles.title}>{goal.title}</Text>
              <Text style={styles.desc}>{goal.description}</Text>

              <Text
                style={[
                  styles.status,
                  {
                    color:
                      goal.status === "achieved"
                        ? "#4CAF50"
                        : goal.status === "in-progress"
                        ? "#FFC107"
                        : "#FF5252",
                  },
                ]}
              >
                {goal.status === "achieved"
                  ? "Objectif atteint"
                  : goal.status === "in-progress"
                  ? "En cours"
                  : "Non atteint"}
              </Text>

              {/* ========================= */}
              {/* 🟡 ACTIONS */}
              {/* ========================= */}
              <View style={styles.actions}>
                <TouchableOpacity
                  style={[styles.btn ,styles.editBtn]}
                  onPress={() => handleUpdate(goal)}
                >
                  <FontAwesome6 
                  name="edit" 
                  size={24} 
                  color="#f5c400" />
                  {/* <Text style={styles.btnText}>Modifier</Text> */}
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.btn ,styles.deleteBtn]}
                  onPress={() => handleDelete(goal)}
                >
                  <MaterialCommunityIcons
                    name="delete-empty"
                    size={24}
                    color="#EA0000"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

// ===============================
// 🎨 STYLES
// ===============================
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0C0C1D",
    borderRadius: 20,
    borderWidth: 1.6,
    borderColor: "#363741",
    overflow: "hidden",
  },
  historiqueWrapper: {
    alignItems: "flex-end",
    paddingHorizontal: 12,
    marginBottom: 6,
  },
  monthBar: {
    flexDirection: "row",
    gap: 2,
    padding: 12,
  },
  monthItem: {
    flex: 1,
    height: 38,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#363741",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0C0C1D",
  },
  monthItemActive: {
    backgroundColor: "#f5c400",
    borderColor: "#f5c400",
  },
  monthLetter: {
    color: "#f5c400",
    fontWeight: "bold",
  },
  monthLetterActive: {
    color: "#0C0C1D",
  },
  content: {
    paddingTop: 5,
    paddingHorizontal: 12,
    paddingBottom: 6,
  },
  item: {
    padding: 14,
    marginBottom: 10,
    backgroundColor: "#0C0C1D",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#222",
  },
  month: {
    color: "#aaa",
    fontSize: 12,
  },
  title: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 4,
  },
  desc: {
    color: "#ccc",
    fontSize: 13,
    marginTop: 4,
  },
  status: {
    marginTop: 8,
    fontWeight: "bold",
    fontSize: 12,
  },
  actions: {
    flexDirection: "row",
    marginTop: 10,
    gap: 10,
  },
  btn: {
    flex: 1,
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  editBtn: {
    borderColor: "#f5c400",
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 8,
  },
  deleteBtn: {
    borderColor: "#EA0000",
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 8,
  },
  btnText: {
    color: "#0C0C1D",
    fontWeight: "bold",
    fontSize: 12,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
    width: "100%",
  },
  emptyText: {
    color: "#888",
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center",
    flexWrap: "wrap",
    width: "90%",
  },
});
