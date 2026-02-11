import AsyncStorage from "@react-native-async-storage/async-storage";

// =====================
// 🧩 TYPES
// =====================
export type User = { id: string; name: string };
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
export type Depense = { categorie: string; montant: number; color: string };

// =====================
// 📅 CONSTANTES
// =====================
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

const GOAL_TEMPLATES = [
  {
    title: "Augmenter mon épargne",
    description: "Mettre plus d’argent de côté chaque mois",
  },
  {
    title: "Mieux contrôler mes dépenses",
    description: "Réduire les dépenses inutiles",
  },
  {
    title: "Investir intelligemment",
    description: "Placer une partie du revenu dans des investissements",
  },
  {
    title: "Préparer un grand projet",
    description: "Mettre de l’argent de côté pour un projet important",
  },
];

const STATUSES: MonthlyGoal["status"][] = ["achieved", "in-progress", "failed"];

// =====================
// 👤 UTILISATEURS
// =====================
export const users: User[] = [
  { id: "u001", name: "NIYONKIZA Jean Michel" },
  { id: "u002", name: "Aline Mukamana" },
  { id: "u003", name: "Eric Ndayishimiye" },
];

// =====================
// 👤 UTILISATEUR COURANT
// =====================
export let currentUser: User = users[0];
export const setCurrentUser = (userId: string) => {
  const user = users.find((u) => u.id === userId);
  if (user) currentUser = user;
};

// =====================
// 🛠️ HELPERS
// =====================
function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// =====================
// 📊 STORE FINANCIER
// =====================
export const financialData: FinancialMonth[] = users.flatMap((user) =>
  MONTHS.map((month) => ({
    userId: user.id,
    month,
    revenu: 0,
    depense: 0,
    epargne: 0,
    investissement: 0,
    credit: 0,
  }))
);

// =====================
// 💸 DEPENSES ET OBJECTIFS
// =====================
export const depenses: Depense[] = [
  { categorie: "Nourriture", montant: 90000, color: "#3B82F6" },
  { categorie: "Déplacement", montant: 40000, color: "#FACC15" },
  { categorie: "Maison", montant: 100000, color: "#A855F7" },
  { categorie: "Projets", montant: 50000, color: "#22C55E" },
];

export const monthlyGoals: MonthlyGoal[] = users.flatMap((user) =>
  MONTHS.flatMap((month) => {
    const count = random(1, 3);
    return Array.from({ length: count }).map(() => {
      const tpl = GOAL_TEMPLATES[random(0, GOAL_TEMPLATES.length - 1)];
      return {
        userId: user.id,
        month,
        title: tpl.title,
        description: tpl.description,
        status: STATUSES[random(0, STATUSES.length - 1)],
      };
    });
  })
);

// =====================
// 🔍 GETTERS
// =====================
export const getUserFinancialData = (): FinancialMonth[] =>
  financialData.filter((f) => f.userId === currentUser.id);

export const getUserGoals = (): MonthlyGoal[] =>
  monthlyGoals.filter((g) => g.userId === currentUser.id);

export const getTotalIncome = (): number =>
  getUserFinancialData().reduce((sum, m) => sum + m.revenu, 0);

export const getTotalMoneyForCurrentUser = (): number => {
  return getUserFinancialData().reduce(
    (sum, m) => sum + m.revenu + m.depense + m.investissement + m.epargne,
    0
  );
};

// =====================
// 🔄 PERSISTENCE ASYNC
// =====================
export const loadFinancialData = async () => {
  try {
    const stored = await AsyncStorage.getItem("@financialData");
    if (stored) {
      const parsed: FinancialMonth[] = JSON.parse(stored);
      financialData.splice(0, financialData.length, ...parsed);
      console.log("✅ Données chargées depuis AsyncStorage :", financialData);
    } else {
      console.log(
        "ℹ️ Aucun stockage existant trouvé, données par défaut utilisées."
      );
    }
  } catch (e) {
    console.log("Erreur chargement financialData:", e);
  }
};

const saveFinancialData = async () => {
  try {
    await AsyncStorage.setItem("@financialData", JSON.stringify(financialData));
    console.log("💾 Données sauvegardées dans AsyncStorage :", financialData);
  } catch (e) {
    console.log("Erreur sauvegarde financialData :", e);
  }
};

// =====================
// 🔄 MUTATIONS
// =====================

// Ajouter / mettre à jour le revenu
export const recupererArgent = (
  monthIndex: number,
  revenu: number,
  depensePct: number,
  investissementPct: number,
  epargnePct: number
) => {
  const data = getUserFinancialData();
  const month = data[monthIndex];
  if (!month) return;

  const originalRevenu = month.revenu;

  month.revenu += revenu;
  month.depense = Math.round((month.revenu * depensePct) / 100);
  month.epargne = Math.round((month.revenu * epargnePct) / 100);
  month.investissement = Math.round((month.revenu * investissementPct) / 100);
  month.credit =
    month.revenu - (month.depense + month.epargne + month.investissement);

  console.log(
    `💰 Revenu mois ${month.month} : ${originalRevenu} → ${month.revenu}`
  );

  saveFinancialData();
};

// Retirer de l’argent
export const sortirArgent = (monthIndex: number, montant: number) => {
  const data = getUserFinancialData();
  const month = data[monthIndex];
  if (!month) return;

  console.log(`Avant retrait : ${month.revenu} FBu`);

  if (montant > month.revenu) {
    console.warn("💸 Fonds insuffisants !");
    return;
  }

  month.revenu -= montant;

  // recalculer les autres montants proportionnellement
  const total =
    month.depense + month.epargne + month.investissement + month.credit;
  if (total > 0) {
    month.depense = Math.round((month.depense / total) * month.revenu);
    month.epargne = Math.round((month.epargne / total) * month.revenu);
    month.investissement = Math.round(
      (month.investissement / total) * month.revenu
    );
    month.credit =
      month.revenu - (month.depense + month.epargne + month.investissement);
  }

  console.log(`Après retrait : ${month.revenu} FBu`);

  saveFinancialData();
};
