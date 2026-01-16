// =====================
// 👤 UTILISATEURS
// =====================
export type User = { id: string; name: string };

export const users: User[] = [
  { id: "u001", name: "NIYONKIZA Jean Michel" },
  { id: "u002", name: "Aline Mukamana" },
  { id: "u003", name: "Eric Ndayishimiye" },
];

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
  credit: number;
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
    const credit = random(5_000, revenu * 0.2);

    return {
      userId: user.id,
      month,
      revenu,
      epargne,
      depense,
      investissement,
      credit,
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

const STATUSES: MonthlyGoal["status"][] = ["achieved", "in-progress", "failed"];

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

export const getUserGoals = (): MonthlyGoal[] =>
  monthlyGoals.filter((g) => g.userId === currentUser.id);

// =====================
// 💸 SORTIR DE L’ARGENT (ModalS)
// =====================
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

  console.log(`📊 Mois : ${month.month}`);
  console.log(`Revenu restant : ${month.revenu} FBU`);
  console.log(`Dépense : ${month.depense} FBU`);
  console.log(`Épargne : ${month.epargne} FBU`);
  console.log(`Investissement : ${month.investissement} FBU`);
  console.log(`Crédit : ${month.credit} FBU`);
};

// =====================
// 💰 AJOUTER/RECUPERER ARGENT (ModalM)
// =====================
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

  // Calcul automatique du pourcentage de revenu restant
  const revenuPct = 100 - (depensePct + investissementPct + epargnePct);

  month.depense = Math.round((month.revenu * depensePct) / 100);
  month.epargne = Math.round((month.revenu * epargnePct) / 100);
  month.investissement = Math.round((month.revenu * investissementPct) / 100);
  month.credit =
    month.revenu - (month.depense + month.epargne + month.investissement);

  console.log(`📊 Mois : ${month.month}`);
  console.log(`Revenu : ${month.revenu} FBU`);
  console.log(`Dépense : ${month.depense} FBU (${depensePct}%)`);
  console.log(`Épargne : ${month.epargne} FBU (${epargnePct}%)`);
  console.log(
    `Investissement : ${month.investissement} FBU (${investissementPct}%)`
  );
  console.log(`Crédit : ${month.credit} FBU`);
};
