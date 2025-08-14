// import { env } from '@/config/env'
import { Http } from '../Http'
import { AdminRouteApi } from './admin-constants'
import type {
  AdminFiltersPayload,
  AdminRequest,
  AdminResponse,
  AdminUpdatePayload,
} from './admin-type'

// const mock = new MockAdapter(axios.create())

export async function createAdminApi(
  data: AdminRequest,
): Promise<SuccessResponse<AdminResponse> | undefined> {
  const result = await Http.post<SuccessResponse<AdminResponse>>('/api/v1/admin', data, {
    // headers: {
    //   'Device-Id': getDeviceId(),
    // },
  })

  return result
}

export async function fetchAdminsApi(
  page: number,
): Promise<SuccessResponse<PaginationResponse<AdminResponse>> | undefined> {
  const result = await Http.get<SuccessResponse<PaginationResponse<AdminResponse>>>('/admins', {
    page,
  })
  return result
}

export async function fetchFiltersAdminsApi({
  payload,
}: {
  payload: AdminFiltersPayload
}): Promise<SuccessResponse<PaginationResponse<AdminResponse>> | undefined> {
  const result = await Http.get<SuccessResponse<PaginationResponse<AdminResponse>>>(
    // AdminRouteApi.filter,
    '/admins',
    payload,
  )

  return result
}
export async function fetchAdminByIdApi({
  id,
}: {
  id: string
}): Promise<SuccessResponse<AdminResponse> | undefined> {
  return await Http.get<SuccessResponse<AdminResponse>>(`/admin/${id}`)
}

export async function updateAdminApi({
  id,
  data,
}: {
  id: string
  data: AdminUpdatePayload
}): Promise<SuccessResponse<AdminResponse> | undefined> {
  return await Http.put<SuccessResponse<AdminResponse>>(`/admin/${id}`, data)
}
