// =====================
// 👤 UTILISATEURS
// =====================

export type User = {
  id: string;
  name: string;
};

export const users: User[] = [
  { id: "u001", name: "NIYONKIZA Jean Michel" },
  { id: "u002", name: "Aline Mukamana" },
  { id: "u003", name: "Eric Ndayishimiye" },
];

// =====================
// 🔐 UTILISATEUR CONNECTÉ
// =====================

export let currentUser: User = users[0];

export const setCurrentUser = (userId: string) => {
  const user = users.find((u) => u.id === userId);
  if (user) currentUser = user;
};

// =====================
// 📊 DONNÉES FINANCIÈRES
// =====================

export type FinancialMonth = {
  userId: string;
  month: string;
  revenu: number;
  epargne: number;
  depense: number;
  investissement: number;
};

export const financialData: FinancialMonth[] = [
  {
    userId: "u001",
    month: "Janvier",
    revenu: 35000000,
    epargne: 500000,
    depense: 200000,
    investissement: 100000,
  },
  {
    userId: "u001",
    month: "Février",
    revenu: 40000000,
    epargne: 100000,
    depense: 2000000,
    investissement: 1000000,
  },
  {
    userId: "u001",
    month: "Mars",
    revenu: 500000,
    epargne: 15000,
    depense: 25000,
    investissement: 100000,
  },

  {
    userId: "u002",
    month: "Janvier",
    revenu: 60,
    epargne: 20,
    depense: 30,
    investissement: 10,
  },
  {
    userId: "u002",
    month: "Février",
    revenu: 55,
    epargne: 15,
    depense: 25,
    investissement: 15,
  },
  {
    userId: "u002",
    month: "Mars",
    revenu: 65,
    epargne: 25,
    depense: 30,
    investissement: 10,
  },

  {
    userId: "u003",
    month: "Janvier",
    revenu: 30,
    epargne: 5,
    depense: 15,
    investissement: 10,
  },
  {
    userId: "u003",
    month: "Février",
    revenu: 35,
    epargne: 10,
    depense: 15,
    investissement: 10,
  },
  {
    userId: "u003",
    month: "Mars",
    revenu: 40,
    epargne: 10,
    depense: 20,
    investissement: 10,
  },
];

export const getUserFinancialData = (): FinancialMonth[] =>
  financialData.filter((f) => f.userId === currentUser.id);

// =====================
// 🎯 OBJECTIFS MENSUELS
// =====================

export type MonthlyGoal = {
  userId: string;
  month: string;
  title: string;
  description: string;
  status: "in-progress" | "achieved" | "failed";
};

export const monthlyGoals: MonthlyGoal[] = [
  {
    userId: "u001",
    month: "Janvier",
    title: "Créer une épargne solide",
    description: "Mettre de côté au moins 500 000 FBU pour les urgences",
    status: "achieved",
  },
  {
    userId: "u001",
    month: "Janvier",
    title: "Créer une épargne solide",
    description: "Mettre de côté au moins 90 000 FBU pour les urgences",
    status: "achieved",
  },
  {
    userId: "u001",
    month: "Juin",
    title: "Créer une épargne solide",
    description: "Mettre de côté au moins 500 000 FBU pour les urgences",
    status: "achieved",
  },
  {
    userId: "u001",
    month: "Decembre",
    title: "Créer une épargne solide",
    description: "Mettre de côté au moins 500 000 FBU pour les urgences",
    status: "achieved",
  },
  {
    userId: "u001",
    month: "Février",
    title: "Investir dans mon business",
    description: "Allouer 1 000 000 FBU pour développer mon activité",
    status: "in-progress",
  },
  {
    userId: "u001",
    month: "Mars",
    title: "Réduire mes dépenses",
    description: "Ne pas dépasser 25 000 FBU de dépenses inutiles",
    status: "failed",
  },

  {
    userId: "u002",
    month: "Janvier",
    title: "Épargner pour voyager",
    description: "Mettre 20 FBU de côté pour un futur voyage",
    status: "achieved",
  },
  {
    userId: "u002",
    month: "Février",
    title: "Mieux gérer mon budget",
    description: "Limiter mes dépenses à 25 FBU",
    status: "in-progress",
  },
];

export const getUserGoals = (): MonthlyGoal[] =>
  monthlyGoals.filter((g) => g.userId === currentUser.id);
