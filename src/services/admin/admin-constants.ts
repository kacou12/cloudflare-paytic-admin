enum AdminRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  VIEWER = 'VIEWER',
  // Ajoutez d'autres rôles selon vos besoins
}

export const AdminRouteApi = {
  default: '/api/v1/admins',
  getOne: (id: string) => `/api/v1/admins/${id}`,
  filter: '/api/v1/admins/filter',
}

export { AdminRole }
