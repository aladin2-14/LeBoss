// ===============================
// 📦 IMPORTS
// ===============================
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  idhistorique: string;
  userId: string;
  month: string;
  title: string;
  description: string;
  status: "in-progress" | "achieved" | "failed" | "deleted";
};

export type Depense = {
  categorie: string;
  montant: number;
  color: string;
};

// 🔹 Nouveau modèle gestion des dépenses
export type GestionDepense = {
  userId: string;
  month: string;
  depenseTotal: number;
  depenseUtilise: number;
  depenseRestant: number;
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

export const STORAGE_KEYS = {
  USER: "@current_user",
  FINANCE: "@financial_data",
  GOALS: "@monthly_goals",
  DEPENSES: "@depenses",
  GESTION_DEPENSES: "@gestion_depenses",
};

// ===============================
// 👤 4️⃣ UTILISATEURS
// ===============================

export const users: User[] = [
  { id: "u001", name: "NIYONKIZA Jean Michel" },
  { id: "u002", name: "Aline Mukamana" },
  { id: "u003", name: "Eric Ndayishimiye" },
];

export let currentUser: User = users[0];

// ===============================
// 🔐 5️⃣ GESTION UTILISATEUR
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
// 📊 6️⃣ DONNEES FINANCIERES
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

export const getUserFinancialData = (): FinancialMonth[] =>
  financialData.filter((f) => f.userId === currentUser.id);

export const getCurrentMonth = (): string => MONTHS[new Date().getMonth()];

export const getCurrentMonthBudget = () =>
  financialData.find(
    (f) => f.userId === currentUser.id && f.month === getCurrentMonth()
  );

export const getTotalCollected = (): number =>
  getUserFinancialData().reduce((sum, m) => sum + m.revenu, 0);

// ===============================
// 🔄 1️⃣1️⃣ ACTIONS
// ===============================

// 💰 Ajouter argent
export const recupererArgent = async (
  monthIndex: number,
  montant: number,
  depensePct: number,
  investissementPct: number,
  epargnePct: number
) => {
  const userData = financialData.filter((f) => f.userId === currentUser.id);
  const month = userData[monthIndex];
  if (!month) return;

  // 1. Ajouter revenu
  month.revenu += montant;

  // 2. Calcul des montants via %
  const depenseAmount = Math.round((montant * depensePct) / 100);
  const investissementAmount = Math.round((montant * investissementPct) / 100);
  const epargneAmount = Math.round((montant * epargnePct) / 100);

  const totalPrelevement = depenseAmount + investissementAmount + epargneAmount;

  if (totalPrelevement > montant) {
    console.warn("Les pourcentages dépassent 100%");
    return;
  }

  // 3. Appliquer les montants
  month.depense += depenseAmount;
  month.investissement += investissementAmount;
  month.epargne += epargneAmount;

  // 4. Crédit (reste)
  const reste = montant - totalPrelevement;
  month.credit += reste;

  await saveFinancialData();
};
export const sortirArgent = async (
  monthIndex: number,
  montant: number,
  source: "depense" | "investissement" | "epargne",
  categorie: string,
  description?: string
) => {
  const userData = financialData.filter((f) => f.userId === currentUser.id);
  const month = userData[monthIndex];
  if (!month) return;

  let budget = month[source];

  if (montant > budget) {
    console.warn("Fonds insuffisants dans la catégorie choisie !");

    return {
      success: false,
      reason: "INSUFFICIENT",
      manque: montant - budget, // 🔥 important
    };
  }

  month[source] -= montant;

  console.log(`💸 Retrait de ${montant} FBu depuis ${source} -> ${categorie}`);
  try {
    const key = "@transactions_history";

    const existing = await AsyncStorage.getItem(key);
    const parsed = existing ? JSON.parse(existing) : [];

    const newTransaction = {
      id: Date.now().toString(),
      montant,
      source,
      categorie,
      description,
      date: new Date().toISOString(),
    };

    const updated = [newTransaction, ...parsed];

    await AsyncStorage.setItem(key, JSON.stringify(updated));
  } catch (error) {
    console.error("Erreur sauvegarde transaction:", error);
  }

  /* 💾 Sauvegarde état */
  await saveFinancialData();

  return {
    success: true,
    data: {
      montant,
      source,
      categorie,
      description,
    },
  };
};

// ===============================
// 🧠 1️⃣2️⃣ GESTION DES DEPENSES
// ===============================

export let gestionDepenses: GestionDepense[] = [];

export const saveGestionDepenses = async () => {
  await AsyncStorage.setItem(
    STORAGE_KEYS.GESTION_DEPENSES,
    JSON.stringify(gestionDepenses)
  );
};

export const loadGestionDepenses = async () => {
  const data = await AsyncStorage.getItem(STORAGE_KEYS.GESTION_DEPENSES);
  if (data) {
    gestionDepenses = JSON.parse(data);
  }
};

// Synchroniser avec financialData
export const syncGestionDepense = async () => {
  gestionDepenses = financialData.map((f) => ({
    userId: f.userId,
    month: f.month,
    depenseTotal: f.depense,
    depenseUtilise: 0,
    depenseRestant: f.depense,
  }));

  await saveGestionDepenses();
};

// Ajouter une dépense
export const ajouterDepense = async (monthIndex: number, montant: number) => {
  const userData = gestionDepenses.filter((g) => g.userId === currentUser.id);

  const month = userData[monthIndex];
  if (!month) return;

  if (montant > month.depenseRestant) {
    console.warn("Budget dépense insuffisant");

    return {
      success: false,
      restant: month.depenseRestant,
    };
  }

  month.depenseUtilise += montant;

  month.depenseRestant = month.depenseTotal - month.depenseUtilise;

  await saveGestionDepenses();

  return {
    success: true,
    restant: month.depenseRestant,
  };
};

// ===============================
// 🚀 1️⃣3️⃣ INITIALISATION
// ===============================
export const getUserGoals = async (
  monthIndex?: number
): Promise<MonthlyGoal[]> => {
  await loadGoals();

  if (monthIndex !== undefined) {
    const month = MONTHS[monthIndex];

    return monthlyGoals.filter(
      (g) => g.userId === currentUser.id && g.month === month
    );
  }

  return monthlyGoals.filter((g) => g.userId === currentUser.id);
};
export const initializeAppData = async () => {
  await loadCurrentUser();
  await loadFinancialData();
  await loadGoals();
  await loadDepenses();
  await loadGestionDepenses();
};
