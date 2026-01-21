// =====================
// 🧩 TYPES
// =====================
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
// 👤 UTILISATEUR COURANT (STATE GLOBAL SIMPLE)
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
// 📊 DONNÉES FINANCIÈRES (tous les mois à 0 FBU)
// =====================
export const financialData: FinancialMonth[] = users.flatMap((user) =>
  MONTHS.map((month) => {
    return {
      userId: user.id,
      month,
      revenu: 0, // 👈 aucun argent au départ
      epargne: 0,
      depense: 0,
      investissement: 0,
      credit: 0,
    };
  })
);

// =====================
// 💸 DÉPENSES PAR CATÉGORIE
// =====================
export const depenses: Depense[] = [
  { categorie: "Nourriture", montant: 90000, color: "#3B82F6" },
  { categorie: "Déplacement", montant: 40000, color: "#FACC15" },
  { categorie: "Maison", montant: 100000, color: "#A855F7" },
  { categorie: "Projets", montant: 50000, color: "#22C55E" },
];

// =====================
// 🎯 OBJECTIFS MENSUELS
// =====================
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
// 🔍 SELECTEURS (GETTERS)
// =====================
export const getUserFinancialData = (): FinancialMonth[] =>
  financialData.filter((f) => f.userId === currentUser.id);

export const getUserGoals = (): MonthlyGoal[] =>
  monthlyGoals.filter((g) => g.userId === currentUser.id);

export const getTotalIncome = (): number =>
  getUserFinancialData()
    .filter((m) => m.revenu > 0)
    .reduce((sum, m) => sum + m.revenu, 0);

// =====================
// 🔄 ACTIONS / MUTATIONS
// =====================

// 💸 Sortir de l’argent
export const sortirArgent = (monthIndex: number, montant: number) => {
  const data = getUserFinancialData();
  const month = data[monthIndex];
  if (!month) return;

  const totalDepenses =
    month.depense + month.epargne + month.investissement + month.credit;

  if (montant > month.revenu - totalDepenses) {
    console.warn("💸 Fonds insuffisants !");
    return;
  }

  month.revenu -= montant;
};

// 💰 Récupérer / ajouter de l’argent
export const recupererArgent = (
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
  month.investissement = Math.round(
    (month.revenu * investissementPct) / 100
  );
  month.credit =
    month.revenu - (month.depense + month.epargne + month.investissement);
};
