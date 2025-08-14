// Types pour les transactions
interface Transaction {
  id: string
  date: string
  type: TransactionType
  amount: number
  recipient?: string
  time: string
  paymentMethod?: {
    name: string
    icon: string
  }
  isSuccess: boolean
  from?: {
    name: string
    icon: string
  }
  to?: {
    name: string
    icon: string
  }
}

export enum TransactionType {
  PAYMENT = 'payment',
  TRANSFER = 'transfer',
  PURCHASE = 'purchase',
}

// Énumération pour grouper les transactions
enum TransactionGroup {
  TODAY = "Aujourd'hui",
  YESTERDAY = 'Hier',
  OTHER = '02/07/2024',
}

// Interface pour le regroupement des transactions
interface GroupedTransactions {
  [key: string]: Transaction[]
}

// Données de exemple
const usertransactionsData: Transaction[] = [
  {
    id: '1',
    date: "Aujourd'hui",
    type: TransactionType.PAYMENT,
    amount: 100000,
    recipient: '0107565605 (Karim)',
    isSuccess: false,
    time: '10h30',
    from: {
      name: 'Wave',
      icon: '🌊',
    },
    to: {
      name: 'OM',
      icon: '🟡',
    },
  },
  {
    id: '2',
    date: "Aujourd'hui",
    type: TransactionType.PURCHASE,
    recipient: 'Apple card',
    amount: 8000,
    isSuccess: true,
    time: '08h30',
    paymentMethod: {
      name: 'Apple card',
      icon: '🍎',
    },
  },
  {
    id: '3',
    date: 'Hier',
    type: TransactionType.PAYMENT,
    amount: 4800,
    recipient: 'Yango_Mamadou',
    time: '12h06',
    isSuccess: true,
    from: {
      name: 'Wave',
      icon: '🌊',
    },
    to: {
      name: 'MTN',
      icon: '💛',
    },
  },
  // ... autres transactions
]

// Fonction pour grouper les transactions par date
const groupTransactionsByDate = (transactions: Transaction[]): GroupedTransactions => {
  return transactions.reduce((groups: GroupedTransactions, transaction) => {
    const { date } = transaction
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(transaction)
    return groups
  }, {})
}

// Export pour utilisation dans le composant

export type { Transaction, GroupedTransactions }
export { TransactionGroup, usertransactionsData, groupTransactionsByDate }
