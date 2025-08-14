import Dashboard from '@/views/DashboardView.vue'

enum AdminRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  VIEWER = 'VIEWER',
  // Ajoutez d'autres rôles selon vos besoins
}

export const TransactionRouteApi = {
  default: '/admin/api/v1/transaction',
  transactionStats: '/admin/api/v1/transaction/stats-txn-types',
  dashboardStats: '/admin/api/v1/transaction/dashboard',
  getOne: (id: string) => `/admin/api/v1/transaction/${id}`,
  getOneName: `/admin/api/v1/transaction/*`,
  // updateStatus: (id: string) => `/admin/api/v1/transaction/${id}/status`,
  relaunchTransaction: (id: string) => `/admin/api/v1/transaction/${id}/relaunch`,
  relaunchTransactionName: `/admin/api/v1/transaction/*/relaunch`,
  updateStatusName: `/admin/api/v1/transaction/*/status`,
  filter: '/admin/api/v1/transaction',
  updateStatus: ({id, status}:{id: string, status: string}) => `/admin/api/v1/transaction/${id}/status/${status}`,

}

export { AdminRole }
