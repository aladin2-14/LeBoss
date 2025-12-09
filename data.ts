export type FinancialMonth = {
    month: string;
    revenu: number;
    epargne: number;
    depense: number;
    investissement: number;
  };
  
  export const financialData: FinancialMonth[] = [
    { month: "Janvier", revenu: 35, epargne: 0, depense: 0, investissement: 0 },
    { month: "Février", revenu: 0, epargne: 0, depense: 0, investissement: 0 },
    { month: "Mars", revenu: 40, epargne: 10, depense: 45, investissement: 5 },
    { month: "Avril", revenu: 35, epargne: 20, depense: 40, investissement: 5 },
    { month: "Mai", revenu: 0, epargne: 0, depense: 0, investissement: 0 },
    { month: "Juin", revenu: 40, epargne: 10, depense: 45, investissement: 5 },
    { month: "Juillet", revenu: 35, epargne: 20, depense: 40, investissement: 5 },
    { month: "Août", revenu: 0, epargne: 0, depense: 0, investissement: 0 },
    { month: "Septembre", revenu: 40, epargne: 10, depense: 45, investissement: 5 },
    { month: "Octobre", revenu: 35, epargne: 20, depense: 40, investissement: 5 },
    { month: "Novembre", revenu: 0, epargne: 0, depense: 0, investissement: 0 },
    { month: "Décembre", revenu: 30, epargne: 10, depense: 15, investissement: 5 },
  ];
  
  export type FinancialMonthWithPercentage = FinancialMonth & {
    revenuPercent: number;
    epargnePercent: number;
    depensePercent: number;
    investissementPercent: number;
  };
  
  // Calcul automatique des pourcentages
  export const financialDataWithPercent: FinancialMonthWithPercentage[] =
    financialData.map((item) => {
      if (item.revenu === 0) {
        return {
          ...item,
          revenuPercent: 0,
          epargnePercent: 0,
          depensePercent: 0,
          investissementPercent: 0,
        };
      }
  
      const total = item.revenu + item.epargne + item.depense + item.investissement;
  
      return {
        ...item,
        revenuPercent: parseFloat(((item.revenu / total) * 100).toFixed(2)),
        epargnePercent: parseFloat(((item.epargne / total) * 100).toFixed(2)),
        depensePercent: parseFloat(((item.depense / total) * 100).toFixed(2)),
        investissementPercent: parseFloat(((item.investissement / total) * 100).toFixed(2)),
      };
    });
  