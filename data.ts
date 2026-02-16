// ===============================
// 📦 IMPORTS
// ===============================
import AsyncStorage from "@react-native-async-storage/async-storage";

const GOALS_KEY = "MONTHLY_GOALS";

let monthlyGoalsStorage: MonthlyGoal[] = [];

// Charger les données depuis AsyncStorage
const loadData = async () => {
  const storedGoals = await AsyncStorage.getItem(GOALS_KEY);
  monthlyGoalsStorage = storedGoals ? JSON.parse(storedGoals) : [];
};

// ===============================
// 🧩 1️⃣ TYPES (MODELES DE DONNEES)
// ===============================

export type User = {
  id: string;
  name: string;
};

export type FinancialMonth = {
  userId: string;
  month: string;
  revenu: number;
  epargne: number;
  depense: number;
  investissement: number;
  credit: number;
};

export type MonthlyGoal = {
  userId: string;
  month: string;
  title: string;
  description: string;
  status: "in-progress" | "achieved" | "failed";
};

export type Depense = {
  categorie: string;
  montant: number;
  color: string;
};

// ===============================
// 📅 2️⃣ CONSTANTES
// ===============================

export const MONTHS = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

// ===============================
// 💾 3️⃣ CLES DE STOCKAGE
// ===============================

const STORAGE_KEYS = {
  USER: "@current_user",
  FINANCE: "@financial_data",
  GOALS: "@monthly_goals",
  DEPENSES: "@depenses",
};

// ===============================
// 👤 4️⃣ UTILISATEURS
// ===============================

export const users: User[] = [
  { id: "u001", name: "NIYONKIZA Jean Michel" },
  { id: "u002", name: "Aline Mukamana" },
  { id: "u003", name: "Eric Ndayishimiye" },
];

// utilisateur actif (state global simple)
export let currentUser: User = users[0];

// ===============================
// 🔐 5️⃣ GESTION UTILISATEUR PERSISTANT
// ===============================

export const loadCurrentUser = async () => {
  const data = await AsyncStorage.getItem(STORAGE_KEYS.USER);
  if (data) {
    currentUser = JSON.parse(data);
  }
};

export const setCurrentUser = async (userId: string) => {
  const user = users.find((u) => u.id === userId);
  if (!user) return;

  currentUser = user;
  await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

// ===============================
// 📊 6️⃣ DONNEES FINANCIERES (INIT)
// ===============================

export let financialData: FinancialMonth[] = users.flatMap((user) =>
  MONTHS.map((month) => ({
    userId: user.id,
    month,
    revenu: 0,
    epargne: 0,
    depense: 0,
    investissement: 0,
    credit: 0,
  }))
);

// ===============================
// 💾 7️⃣ PERSISTANCE FINANCIERE
// ===============================

export const saveFinancialData = async () => {
  await AsyncStorage.setItem(
    STORAGE_KEYS.FINANCE,
    JSON.stringify(financialData)
  );
};

export const loadFinancialData = async () => {
  const data = await AsyncStorage.getItem(STORAGE_KEYS.FINANCE);
  if (data) {
    financialData = JSON.parse(data);
  }
};

// ===============================
// 💸 8️⃣ DEPENSES
// ===============================

export let depenses: Depense[] = [
  { categorie: "Nourriture", montant: 90000, color: "#3B82F6" },
  { categorie: "Déplacement", montant: 40000, color: "#FACC15" },
  { categorie: "Maison", montant: 100000, color: "#A855F7" },
];

export const saveDepenses = async () => {
  await AsyncStorage.setItem(STORAGE_KEYS.DEPENSES, JSON.stringify(depenses));
};

export const loadDepenses = async () => {
  const data = await AsyncStorage.getItem(STORAGE_KEYS.DEPENSES);
  if (data) {
    depenses = JSON.parse(data);
  }
};

// ===============================
// 🎯 9️⃣ OBJECTIFS
// ===============================

export let monthlyGoals: MonthlyGoal[] = [];

export const saveGoals = async () => {
  await AsyncStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(monthlyGoals));
};

export const loadGoals = async () => {
  const data = await AsyncStorage.getItem(STORAGE_KEYS.GOALS);
  if (data) {
    monthlyGoals = JSON.parse(data);
  }
};
// ===============================
// 🔍 GETTERS
// ===============================

// Données financières utilisateur
export const getUserFinancialData = (): FinancialMonth[] =>
  financialData.filter((f) => f.userId === currentUser.id);

// Objectifs utilisateur
export const getUserGoals = async (
  monthIndex?: number
): Promise<MonthlyGoal[]> => {
  await loadGoals(); // charge AsyncStorage
  if (monthIndex !== undefined) {
    const month = MONTHS[monthIndex];
    return monthlyGoals.filter(
      (g) => g.userId === currentUser.id && g.month === month
    );
  }
  return monthlyGoals.filter((g) => g.userId === currentUser.id);
};

// Ajouter un objectif
export const addGoal = async (goal: MonthlyGoal) => {
  monthlyGoals.push(goal);
  await saveGoals();
};

// Mois courant
export const getCurrentMonth = (): string => MONTHS[new Date().getMonth()];

// Budget mois courant
export const getCurrentMonthBudget = () =>
  financialData.find(
    (f) => f.userId === currentUser.id && f.month === getCurrentMonth()
  );

// Total annuel
export const getTotalCollected = (): number =>
  getUserFinancialData().reduce((sum, m) => sum + m.revenu, 0);

// Total mois courant
export const getCurrentMonthTotal = (): number => {
  const current = getCurrentMonthBudget();
  return current ? current.revenu : 0;
};

// ===============================
// 🔄 1️⃣1️⃣ ACTIONS (MODIFICATIONS)
// ===============================

// 💰 Ajouter argent
export const recupererArgent = async (
  monthIndex: number,
  montant: number,
  depensePct: number,
  investissementPct: number,
  epargnePct: number
) => {
  const data = getUserFinancialData();
  const month = data[monthIndex];
  if (!month) return;

  month.revenu += montant;

  month.depense = Math.round((month.revenu * depensePct) / 100);
  month.epargne = Math.round((month.revenu * epargnePct) / 100);
  month.investissement = Math.round((month.revenu * investissementPct) / 100);
  month.credit =
    month.revenu - (month.depense + month.epargne + month.investissement);

  await saveFinancialData();
};

// 💸 Sortir argent (agit sur le mois seulement)
export const sortirArgent = async (monthIndex: number, montant: number) => {
  const data = getUserFinancialData();
  const month = data[monthIndex];
  if (!month) return;

  if (montant > month.revenu) {
    console.warn("Fonds insuffisants !");
    return;
  }

  month.revenu -= montant;

  await saveFinancialData();
};

// ===============================
// 🚀 1️⃣2️⃣ INITIALISATION GLOBALE
// ===============================

export const initializeAppData = async () => {
  await loadCurrentUser();
  await loadFinancialData();
  await loadGoals();
  await loadDepenses();
};
