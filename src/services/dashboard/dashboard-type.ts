// Types pour le tableau de bord

// Type pour la répartition par canal
export type CanalRepartition = {
  canal: string
  montant: string
  pourcentage: string
}

// Type pour les montants collectés et transférés
export type MontantData = {
  total: string
  evolution: string
  repartition: CanalRepartition[]
}

// Type pour les transactions journalières
export type TransactionsJournalieres = {
  montantCollecte: MontantData
  montantTransfere: MontantData
}

// Type pour les statistiques de cartes cadeaux
export type CartesStatistiques = {
  total: string
  evolution: string
}

// Type pour la progression des transactions
export type ProgressionTransactions = {
  complete: number
  enCours: number
  echec: number
}

// Type pour les cartes et transactions
export type CartesEtTransactions = {
  montantCartesCadeaux: CartesStatistiques
  nombreCartesCadeaux: CartesStatistiques
  nombreTransferts: CartesStatistiques
  nombreTotalTransactions: {
    progression: ProgressionTransactions
  }
}

// Type pour le résumé du tableau de bord
export type DashboardSummary = {
  transactionsJournalieres: TransactionsJournalieres
  cartesEtTransactions: CartesEtTransactions
}

// Type pour les données de trafic utilisateur par mois
export type TraficMensuel = {
  mois: string
  actif: number
  inactif: number
}

// Type pour les données de trafic utilisateur
export type TraficUtilisateurs = {
  parReseau: TraficMensuel[]
}

// Type pour les données de statut des transactions par mois
export type StatutMensuel = {
  mois: string
  collecte: number
  transfert: number
}

// Type pour le statut des transactions
export type StatutTransactions = {
  donneesMensuelles: StatutMensuel[]
}

// Type pour une transaction récente
export type Transaction = {
  id: string
  nom: string
  horaire: string
  montant: string
  type: 'collecte' | 'transfert'
}

// Type principal pour toutes les données du tableau de bord
export type DashboardData = {
  dashboardSummary: DashboardSummary
  traficUtilisateurs: TraficUtilisateurs
  statutTransactions: StatutTransactions
  transactionsRecentes: Transaction[]
}
