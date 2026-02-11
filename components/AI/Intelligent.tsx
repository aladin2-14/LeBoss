import { getCurrentMonthBudget } from "@/data";

type Action = "Diminuer" | "Augmenter";

interface Stat {
  pourcentage: number;
  action: Action;
}

interface Result {
  depense: Stat;
  investissement: Stat;
  epargne: Stat;
}

export function analyseBudget(text: string): Result {
  const t = text.toLowerCase();

  // 🔄 RÉCUPÉRER BUDGET RÉEL
  const budget = getCurrentMonthBudget();

  // 🧮 BASE DYNAMIQUE (si revenu = 0 → fallback équilibré)
  let depense = 60;
  let investissement = 20;
  let epargne = 20;

  if (budget && budget.revenu > 0) {
    depense = Math.round((budget.depense / budget.revenu) * 100);
    investissement = Math.round(
      (budget.investissement / budget.revenu) * 100
    );
    epargne = 100 - depense - investissement;
  }

  // 🔎 MOTS-CLÉS
  const wantsDecrease = /(diminuer|réduire|baisser|moins)/;
  const wantsIncrease = /(augmenter|plus|accroître|élever)/;

  const depenseWords = /(dépense|nourriture|transport|maison|loyer|facture)/;
  const investissementWords = /(invest|agriculture|commerce|business|élevage)/;
  const epargneWords = /(épargne|économ|banque|mobile money|savings)/;

  // 🧠 INTENTIONS
  if (wantsDecrease.test(t) && depenseWords.test(t)) {
    depense -= 10;
    epargne += 5;
    investissement += 5;
  }

  if (wantsIncrease.test(t) && investissementWords.test(t)) {
    investissement += 10;
    depense -= 5;
    epargne -= 5;
  }

  if (wantsIncrease.test(t) && epargneWords.test(t)) {
    epargne += 10;
    depense -= 5;
    investissement -= 5;
  }

  // 🎯 CONTEXTE
  if (t.includes("agriculture")) investissement += 5;
  if (t.includes("transport")) depense -= 5;
  if (t.includes("nourriture")) depense -= 5;
  if (t.includes("économ")) epargne += 5;

  // ⚖️ NORMALISATION
  const total = depense + investissement + epargne;
  depense = Math.round((depense / total) * 100);
  investissement = Math.round((investissement / total) * 100);
  epargne = 100 - depense - investissement;

  // 🧾 ACTIONS VS SITUATION ACTUELLE
  const action = (value: number, base: number): Action =>
    value > base ? "Augmenter" : "Diminuer";

  return {
    depense: {
      pourcentage: depense,
      action: action(depense, budget ? (budget.depense / budget.revenu) * 100 : 60),
    },
    investissement: {
      pourcentage: investissement,
      action: action(
        investissement,
        budget ? (budget.investissement / budget.revenu) * 100 : 20
      ),
    },
    epargne: {
      pourcentage: epargne,
      action: action(
        epargne,
        budget ? (budget.epargne / budget.revenu) * 100 : 20
      ),
    },
  };
}
