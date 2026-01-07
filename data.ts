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
// 📅 MOIS STANDARD
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

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const financialData: FinancialMonth[] = users.flatMap((user) =>
  MONTHS.map((month) => {
    const revenu = random(500_000, 40_000_000);
    const epargne = random(10_000, revenu * 0.3);
    const depense = random(10_000, revenu * 0.5);
    const investissement = random(10_000, revenu * 0.4);

    return {
      userId: user.id,
      month,
      revenu,
      epargne,
      depense,
      investissement,
    };
  })
);

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

const STATUSES: MonthlyGoal["status"][] = [
  "achieved",
  "in-progress",
  "failed",
];

export const monthlyGoals: MonthlyGoal[] = users.flatMap((user) =>
  MONTHS.flatMap((month) => {
    const count = random(1, 3); // 1 à 3 objectifs par mois

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

export const getUserGoals = (): MonthlyGoal[] =>
  monthlyGoals.filter((g) => g.userId === currentUser.id);
