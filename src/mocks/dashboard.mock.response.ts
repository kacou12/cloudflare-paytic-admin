export const mockAdminResponse = {
  dashboardSummary: {
    transactionsJournalieres: {
      montantCollecte: {
        total: '23450551 F CFA',
        evolution: '+15%',
        repartition: [
          {
            canal: 'Canal 1',
            montant: '482377 CFA',
            pourcentage: '5.53%',
          },
          {
            canal: 'Canal 2',
            montant: '482377 CFA',
            pourcentage: '5.53%',
          },
          {
            canal: 'Canal 3',
            montant: '482377 CFA',
            pourcentage: '5.53%',
          },
          {
            canal: 'Canal 4',
            montant: '482377 CFA',
            pourcentage: '5.53%',
          },
        ],
      },
      montantTransfere: {
        total: '23450551 F CFA',
        evolution: '+15%',
        repartition: [
          {
            canal: 'Canal 1',
            montant: '482377 CFA',
            pourcentage: '5.53%',
          },
          {
            canal: 'Canal 2',
            montant: '482377 CFA',
            pourcentage: '5.53%',
          },
          {
            canal: 'Canal 3',
            montant: '482377 CFA',
            pourcentage: '5.53%',
          },
          {
            canal: 'Canal 4',
            montant: '482377 CFA',
            pourcentage: '5.53%',
          },
        ],
      },
    },
    cartesEtTransactions: {
      montantCartesCadeaux: {
        total: '23450551 F CFA',
        evolution: '+15%',
      },
      nombreCartesCadeaux: {
        total: '23450551',
        evolution: '+15%',
      },
      nombreTransferts: {
        total: '18500',
        evolution: '+15%',
      },
      nombreTotalTransactions: {
        progression: {
          complete: 75,
          enCours: 15,
          echec: 10,
        },
      },
    },
  },
  traficUtilisateurs: {
    parReseau: [
      { mois: 'Jan', actif: 40, inactif: 10 },
      { mois: 'Fev', actif: 60, inactif: 15 },
      { mois: 'Mar', actif: 45, inactif: 10 },
      { mois: 'Avr', actif: 55, inactif: 12 },
      { mois: 'Mai', actif: 50, inactif: 10 },
      { mois: 'Juin', actif: 58, inactif: 11 },
      { mois: 'Juil', actif: 60, inactif: 13 },
      { mois: 'Aout', actif: 59, inactif: 14 },
      { mois: 'Sept', actif: 58, inactif: 12 },
      { mois: 'Oct', actif: 62, inactif: 13 },
      { mois: 'Nov', actif: 65, inactif: 14 },
    ],
  },
  statutTransactions: {
    donneesMensuelles: [
      { mois: 'Jan', collecte: 3, transfert: 5 },
      { mois: 'Avril', collecte: 2, transfert: 4 },
      { mois: 'Juil', collecte: 1, transfert: 3 },
      { mois: 'Oct', collecte: 4, transfert: 6 },
    ],
  },
  transactionsRecentes: [
    {
      id: '123456789',
      nom: 'OUEDRAOGO Ibrahim',
      horaire: '10h30',
      montant: '100 000 CFA',
      type: 'collecte',
    },
    {
      id: '987654321',
      nom: 'Appia Yaovi',
      horaire: '08h15',
      montant: '150 000 CFA',
      type: 'transfert',
    },
    {
      id: '456789123',
      nom: 'Tanguy Mamadou',
      horaire: '07h56',
      montant: '100 000 CFA',
      type: 'transfert',
    },
  ],
}
