import { MonthlyGoal, MONTHS } from "@/data";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ===============================
// 🔑 KEY STORAGE
// ===============================
const STORAGE_KEY = "goals";

// ===============================
// 📥 GET ALL DATA
// ===============================
export const getAllGoals = async () => {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : {};
};

// ===============================
// 📥 GET GOALS BY MONTH
// ===============================
export const getGoalsByMonth = async (month: string) => {
  const data = await getAllGoals();
  return data[month] || [];
};

// ===============================
// ➕ CREATE GOAL
// ===============================
export const createGoal = async (goal: MonthlyGoal) => {
  const data = await getAllGoals();

  if (!data[goal.month]) {
    data[goal.month] = [];
  }

  // 🔑 génération id si pas présent
  const newGoal = {
    ...goal,
    idhistorique: goal.idhistorique || Date.now().toString(),
  };

  data[goal.month].push(newGoal);

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));

  return newGoal;
};

// ===============================
// ✏️ UPDATE GOAL
// ===============================
export const updateGoal = async (
  month: string,
  id: string,
  updatedData: Partial<MonthlyGoal>
) => {
  const data = await getAllGoals();

  if (!data[month]) return;

  data[month] = data[month].map((item: MonthlyGoal) => {
    if (item.idhistorique === id) {
      return {
        ...item,
        ...updatedData, // 🔥 écrase les anciennes valeurs
      };
    }
    return item;
  });

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// ===============================
// 🗑️ DELETE GOAL
// ===============================
export const deleteGoal = async (month: string, id: string) => {
  const data = await getAllGoals();

  if (!data[month]) return;

  data[month] = data[month].filter(
    (item: MonthlyGoal) => item.idhistorique !== id
  );

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// ===============================
// 📥 GET USER GOALS (UTILISÉ DANS TON HISTORIQUE)
// ===============================
export const getUserGoals = async (monthIndex: number) => {
  const month = MONTHS[monthIndex];
  const data = await getAllGoals();

  return data[month] || [];
};