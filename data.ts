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

// 🔹 Gestion réelle des dépenses
export type GestionDepense = {
  userId: string;
  month: string;

  // Budget dépenses initialement prélevé
  depenseTotal: number;

  // Montant réellement consommé
  depenseUtilise: number;

  // Budget réellement restant
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

// Historique réel des transactions
export const TRANSACTIONS_HISTORY_KEY = "@transactions_history";

// ===============================
// 👤 4️⃣ UTILISATEURS
// ===============================

export const users: User[] = [
  {
    id: "u001",
    name: "NIYONKIZA Jean Michel",
  },
  {
    id: "u002",
    name: "Aline Mukamana",
  },
  {
    id: "u003",
    name: "Eric Ndayishimiye",
  },
];

export let currentUser: User = users[0];

// ===============================
// 🔐 5️⃣ GESTION UTILISATEUR
// ===============================

export const loadCurrentUser = async () => {
  try {
    const data = await AsyncStorage.getItem(
      STORAGE_KEYS.USER
    );

    if (data) {
      currentUser = JSON.parse(data);
    }
  } catch (error) {
    console.error(
      "Erreur chargement utilisateur :",
      error
    );
  }
};

export const setCurrentUser = async (userId: string) => {
  const user = users.find(
    (u) => u.id === userId
  );

  if (!user) return;

  currentUser = user;

  await AsyncStorage.setItem(
    STORAGE_KEYS.USER,
    JSON.stringify(user)
  );
};

// ===============================
// 📊 6️⃣ DONNEES FINANCIERES
// ===============================

export let financialData: FinancialMonth[] =
  users.flatMap((user) =>
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
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.FINANCE,
      JSON.stringify(financialData)
    );
  } catch (error) {
    console.error(
      "Erreur sauvegarde données financières :",
      error
    );
  }
};

export const loadFinancialData = async () => {
  try {
    const data = await AsyncStorage.getItem(
      STORAGE_KEYS.FINANCE
    );

    if (data) {
      financialData = JSON.parse(data);
    }
  } catch (error) {
    console.error(
      "Erreur chargement données financières :",
      error
    );
  }
};

// ===============================
// 💸 8️⃣ DEPENSES
// ===============================

export let depenses: Depense[] = [
  {
    categorie: "Nourriture",
    montant: 90000,
    color: "#3B82F6",
  },
  {
    categorie: "Déplacement",
    montant: 40000,
    color: "#FACC15",
  },
  {
    categorie: "Maison",
    montant: 100000,
    color: "#A855F7",
  },
];

export const saveDepenses = async () => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.DEPENSES,
      JSON.stringify(depenses)
    );
  } catch (error) {
    console.error(
      "Erreur sauvegarde dépenses :",
      error
    );
  }
};

export const loadDepenses = async () => {
  try {
    const data = await AsyncStorage.getItem(
      STORAGE_KEYS.DEPENSES
    );

    if (data) {
      depenses = JSON.parse(data);
    }
  } catch (error) {
    console.error(
      "Erreur chargement dépenses :",
      error
    );
  }
};

// ===============================
// 🎯 9️⃣ OBJECTIFS
// ===============================

export let monthlyGoals: MonthlyGoal[] = [];

export const saveGoals = async () => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.GOALS,
      JSON.stringify(monthlyGoals)
    );
  } catch (error) {
    console.error(
      "Erreur sauvegarde objectifs :",
      error
    );
  }
};

export const loadGoals = async () => {
  try {
    const data = await AsyncStorage.getItem(
      STORAGE_KEYS.GOALS
    );

    if (data) {
      monthlyGoals = JSON.parse(data);
    }
  } catch (error) {
    console.error(
      "Erreur chargement objectifs :",
      error
    );
  }
};

// ===============================
// 🔍 🔟 GETTERS
// ===============================

export const getUserFinancialData =
  (): FinancialMonth[] =>
    financialData.filter(
      (f) => f.userId === currentUser.id
    );

export const getCurrentMonth = (): string =>
  MONTHS[new Date().getMonth()];

export const getCurrentMonthBudget = () =>
  financialData.find(
    (f) =>
      f.userId === currentUser.id &&
      f.month === getCurrentMonth()
  );

export const getTotalCollected = (): number =>
  getUserFinancialData().reduce(
    (sum, m) => sum + m.revenu,
    0
  );

// ===============================
// 🧠 1️⃣1️⃣ GESTION DES DEPENSES
// ===============================

export let gestionDepenses: GestionDepense[] = [];

// ===============================
// 💾 SAUVEGARDE GESTION DEPENSES
// ===============================

export const saveGestionDepenses = async () => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.GESTION_DEPENSES,
      JSON.stringify(gestionDepenses)
    );
  } catch (error) {
    console.error(
      "Erreur sauvegarde gestion dépenses :",
      error
    );
  }
};

// ===============================
// 📥 CHARGEMENT GESTION DEPENSES
// ===============================

export const loadGestionDepenses = async () => {
  try {
    const data = await AsyncStorage.getItem(
      STORAGE_KEYS.GESTION_DEPENSES
    );

    if (data) {
      gestionDepenses = JSON.parse(data);
    }
  } catch (error) {
    console.error(
      "Erreur chargement gestion dépenses :",
      error
    );
  }
};

// ===============================
// 🔄 SYNCHRONISATION
// ===============================
//
// Cette fonction crée le budget réel de dépenses
// à partir du budget prélevé dans financialData.
//
// IMPORTANT :
// depenseTotal = budget initial
// depenseUtilise = consommation réelle
// depenseRestant = budget initial - consommation
//
// ===============================

export const syncGestionDepense = async () => {
  const ancienneGestion = [...gestionDepenses];

  gestionDepenses = financialData.map((f) => {
    // Chercher l'ancien état du mois
    const ancienne = ancienneGestion.find(
      (g) =>
        g.userId === f.userId &&
        g.month === f.month
    );

    // Si le mois existe déjà, on conserve
    // la consommation réelle.
    if (ancienne) {
      const depenseTotal = f.depense;

      const depenseUtilise = Math.min(
        ancienne.depenseUtilise,
        depenseTotal
      );

      return {
        userId: f.userId,
        month: f.month,
        depenseTotal,
        depenseUtilise,
        depenseRestant:
          Math.max(
            0,
            depenseTotal - depenseUtilise
          ),
      };
    }

    // Nouveau mois
    return {
      userId: f.userId,
      month: f.month,
      depenseTotal: f.depense,
      depenseUtilise: 0,
      depenseRestant: f.depense,
    };
  });

  await saveGestionDepenses();
};

// ===============================
// 💸 1️⃣2️⃣ AJOUTER UNE DEPENSE REELLE
// ===============================

export const ajouterDepense = async (
  monthIndex: number,
  montant: number
) => {
  const userData =
    gestionDepenses.filter(
      (g) => g.userId === currentUser.id
    );

  const month = userData[monthIndex];

  if (!month) {
    return {
      success: false,
      reason: "MONTH_NOT_FOUND",
    };
  }

  // Vérification du budget réellement disponible
  if (
    montant > month.depenseRestant
  ) {
    console.warn(
      "Budget dépense insuffisant"
    );

    return {
      success: false,
      restant: month.depenseRestant,
    };
  }

  // Consommation réelle
  month.depenseUtilise += montant;

  // Nouveau reste réel
  month.depenseRestant =
    Math.max(
      0,
      month.depenseTotal -
        month.depenseUtilise
    );

  await saveGestionDepenses();

  return {
    success: true,
    restant: month.depenseRestant,
  };
};

// ===============================
// 💰 1️⃣3️⃣ TOTAL DES DEPENSES
// RÉELLEMENT CONSOMMÉES
// ===============================

export const getTotalDepenseUtiliseeReel =
  (): number => {
    const userData =
      gestionDepenses.filter(
        (g) =>
          g.userId === currentUser.id
      );

    return userData.reduce(
      (total, mois) =>
        total + mois.depenseUtilise,
      0
    );
  };

// ===============================
// 💰 1️⃣4️⃣ TOTAL BUDGET DEPENSE
// INITIAL
// ===============================

export const getTotalBudgetDepense =
  (): number => {
    const userData =
      gestionDepenses.filter(
        (g) =>
          g.userId === currentUser.id
      );

    return userData.reduce(
      (total, mois) =>
        total + mois.depenseTotal,
      0
    );
  };

// ===============================
// 💰 1️⃣5️⃣ TOTAL DEPENSE NON CONSOMMÉ
// ===============================
//
// Exemple :
//
// Budget = 100 000
// Utilisé = 30 000
// Reste   = 70 000
//
// ===============================

export const getTotalDepenseRestantReel =
  (): number => {
    const userData =
      gestionDepenses.filter(
        (g) =>
          g.userId === currentUser.id
      );

    return userData.reduce(
      (total, mois) =>
        total + mois.depenseRestant,
      0
    );
  };

// ===============================
// 💰 1️⃣6️⃣ TOTAL RESTE RÉEL
// ===============================
//
// C'est LA fonction importante.
//
// Pour chaque mois :
//
// credit
// +
// budget dépenses non consommé
// =
// reste réel du mois
//
// Puis on additionne tous les mois.
//
// ===============================

export const getTotalResteReel =
  (): number => {
    const userData =
      financialData.filter(
        (f) =>
          f.userId === currentUser.id
      );

    let totalResteReel = 0;

    userData.forEach((month) => {
      // Gestion réelle du même mois
      const gestion =
        gestionDepenses.find(
          (g) =>
            g.userId === currentUser.id &&
            g.month === month.month
        );

      // Reste provenant des prélèvements
      const resteApresPrelevements =
        month.credit;

      // Budget dépenses initial
      const budgetDepense =
        gestion?.depenseTotal ?? 0;

      // Dépense réellement consommée
      const depenseReelle =
        gestion?.depenseUtilise ?? 0;

      // Budget dépenses qui n'a PAS été consommé
      const depenseNonConsommee =
        Math.max(
          0,
          budgetDepense -
            depenseReelle
        );

      // Reste réel du mois
      const resteMois =
        resteApresPrelevements +
        depenseNonConsommee;

      totalResteReel += resteMois;
    });
    console.log("la somme total = ",totalResteReel)
    return totalResteReel;
  };

// ===============================
// 📅 1️⃣7️⃣ RESTE RÉEL D'UN MOIS
// ===============================

export const getResteReelDuMois = (
  monthIndex: number
): number => {
  const month =
    getUserFinancialData()[monthIndex];

  if (!month) return 0;

  const gestion =
    gestionDepenses.find(
      (g) =>
        g.userId === currentUser.id &&
        g.month === month.month
    );

  const resteApresPrelevements =
    month.credit;

  const depenseRestant =
    gestion?.depenseRestant ?? 0;

  return (
    resteApresPrelevements +
    depenseRestant
  );
};

// ===============================
// 💰 1️⃣8️⃣ AJOUTER ARGENT
// ===============================

export const recupererArgent = async (
  monthIndex: number,
  montant: number,
  depensePct: number,
  investissementPct: number,
  epargnePct: number
) => {
  const userData =
    financialData.filter(
      (f) => f.userId === currentUser.id
    );

  const month =
    userData[monthIndex];

  if (!month) return;

  // Vérifier les pourcentages AVANT
  // de modifier les données
  const totalPct =
    depensePct +
    investissementPct +
    epargnePct;

  if (totalPct > 100) {
    console.warn(
      "Les pourcentages dépassent 100%"
    );

    return {
      success: false,
      reason: "PERCENTAGE_OVER_100",
    };
  }

  // ===============================
  // 1️⃣ AJOUT DU REVENU
  // ===============================

  month.revenu += montant;

  // ===============================
  // 2️⃣ CALCUL DES PRÉLÈVEMENTS
  // ===============================

  const depenseAmount =
    Math.round(
      (montant * depensePct) / 100
    );

  const investissementAmount =
    Math.round(
      (montant *
        investissementPct) /
        100
    );

  const epargneAmount =
    Math.round(
      (montant * epargnePct) / 100
    );

  const totalPrelevement =
    depenseAmount +
    investissementAmount +
    epargneAmount;

  // ===============================
  // 3️⃣ APPLICATION
  // ===============================

  month.depense +=
    depenseAmount;

  month.investissement +=
    investissementAmount;

  month.epargne +=
    epargneAmount;

  // ===============================
  // 4️⃣ RESTE APRÈS PRÉLÈVEMENTS
  // ===============================

  const reste =
    montant -
    totalPrelevement;

  month.credit += reste;

  // ===============================
  // 5️⃣ METTRE À JOUR LE BUDGET
  // RÉEL DES DÉPENSES
  // ===============================

  const gestion =
    gestionDepenses.find(
      (g) =>
        g.userId === currentUser.id &&
        g.month === month.month
    );

  if (gestion) {
    // Le nouveau prélèvement de dépenses
    // augmente le budget total disponible.
    gestion.depenseTotal +=
      depenseAmount;

    gestion.depenseRestant +=
      depenseAmount;
  } else {
    // Si le mois n'existe pas encore
    gestionDepenses.push({
      userId: currentUser.id,
      month: month.month,
      depenseTotal:
        depenseAmount,
      depenseUtilise: 0,
      depenseRestant:
        depenseAmount,
    });
  }

  await saveFinancialData();
  await saveGestionDepenses();

  return {
    success: true,
    data: {
      montant,
      depenseAmount,
      investissementAmount,
      epargneAmount,
      reste,
    },
  };
};

// ===============================
// 💸 1️⃣9️⃣ SORTIR ARGENT
// ===============================

export const sortirArgent = async (
  monthIndex: number,
  montant: number,
  source:
    | "depense"
    | "investissement"
    | "epargne",
  categorie: string,
  description?: string
) => {
  const userData =
    financialData.filter(
      (f) => f.userId === currentUser.id
    );

  const month =
    userData[monthIndex];

  if (!month) {
    return {
      success: false,
      reason: "MONTH_NOT_FOUND",
    };
  }

  // ===============================
  // 1️⃣ VÉRIFICATION DU BUDGET
  // ===============================

  const budget =
    month[source];

  if (montant > budget) {
    console.warn(
      `Fonds insuffisants dans ${source}`
    );

    return {
      success: false,
      reason: "INSUFFICIENT",
      manque:
        montant - budget,
    };
  }

  // ===============================
  // 2️⃣ SI C'EST UNE DÉPENSE
  // ===============================

  if (source === "depense") {
    const gestion =
      gestionDepenses.find(
        (g) =>
          g.userId === currentUser.id &&
          g.month === month.month
      );

    if (!gestion) {
      console.warn(
        "Gestion des dépenses introuvable"
      );

      return {
        success: false,
        reason:
          "GESTION_DEPENSE_NOT_FOUND",
      };
    }

    // Vérifier la consommation réelle
    if (
      montant >
      gestion.depenseRestant
    ) {
      console.warn(
        "Dépense supérieure au budget restant"
      );

      return {
        success: false,
        reason:
          "DEPENSE_BUDGET_INSUFFICIENT",
        restant:
          gestion.depenseRestant,
        manque:
          montant -
          gestion.depenseRestant,
      };
    }

    // ===============================
    // CONSOMMATION RÉELLE
    // ===============================

    gestion.depenseUtilise +=
      montant;

    gestion.depenseRestant =
      Math.max(
        0,
        gestion.depenseTotal -
          gestion.depenseUtilise
      );
  }

  // ===============================
  // 3️⃣ RETIRER DU BUDGET
  // ===============================

  month[source] -=
    montant;

  console.log(
    `💸 Retrait de ${montant} FBu depuis ${source} -> ${categorie}`
  );

  // ===============================
  // 4️⃣ HISTORIQUE
  // ===============================

  try {
    const existing =
      await AsyncStorage.getItem(
        TRANSACTIONS_HISTORY_KEY
      );

    const parsed =
      existing
        ? JSON.parse(existing)
        : [];

    const newTransaction = {
      id: Date.now().toString(),
      montant,
      source,
      categorie,
      description,
      date:
        new Date().toISOString(),
    };

    const updated = [
      newTransaction,
      ...parsed,
    ];

    await AsyncStorage.setItem(
      TRANSACTIONS_HISTORY_KEY,
      JSON.stringify(updated)
    );

    console.log(
      "💾 TRANSACTION STOCKÉE :",
      newTransaction
    );
  } catch (error) {
    console.error(
      "Erreur sauvegarde transaction :",
      error
    );
  }

  // ===============================
  // 5️⃣ SAUVEGARDE
  // ===============================

  await saveFinancialData();
  await saveGestionDepenses();

  // ===============================
  // 6️⃣ TOTAL RESTE RÉEL
  // ===============================

  const totalResteReel =
    getTotalResteReel();

  return {
    success: true,

    data: {
      montant,
      source,
      categorie,
      description,
    },

    totalResteReel,
  };
};

// ===============================
// 🎯 2️⃣0️⃣ GET USER GOALS
// ===============================

export const getUserGoals = async (
  monthIndex?: number
): Promise<MonthlyGoal[]> => {
  await loadGoals();

  if (
    monthIndex !== undefined
  ) {
    const month =
      MONTHS[monthIndex];

    return monthlyGoals.filter(
      (g) =>
        g.userId ===
          currentUser.id &&
        g.month === month
    );
  }

  return monthlyGoals.filter(
    (g) =>
      g.userId ===
      currentUser.id
  );
};

// ===============================
// 🚀 2️⃣1️⃣ INITIALISATION
// ===============================

export const initializeAppData =
  async () => {
    await loadCurrentUser();

    await loadFinancialData();

    await loadGoals();

    await loadDepenses();

    await loadGestionDepenses();

    // Si aucune gestion des dépenses
    // n'existe encore, créer les données.
    if (
      gestionDepenses.length === 0
    ) {
      await syncGestionDepense();
    }
  };
