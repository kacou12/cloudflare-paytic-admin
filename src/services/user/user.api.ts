import type { DefaultFiltersPayload } from '../global.type'
import { Http } from '../Http'
import { UserRouteApi } from './user.constants'
import type { UserRequest, UserResponse, UserUpdatePayload } from './user.type'

export async function fetchFiltersUsersApi({
  payload,
}: {
  payload: DefaultFiltersPayload
}): Promise<SuccessResponse<PaginationResponse<UserResponse>> | undefined> {
  const result = await Http.get<SuccessResponse<PaginationResponse<UserResponse>>>(
    UserRouteApi.default,
    payload,
  )

  return result
}

export async function fetchUserByIdApi({
  id,
}: {
  id: string
}): Promise<SuccessResponse<UserResponse> | undefined> {
  return await Http.get<SuccessResponse<UserResponse>>(`${UserRouteApi.default}/${id}`)
}

export async function updateUserApi({
  id,
  data,
}: {
  id: string
  data: UserUpdatePayload
}): Promise<SuccessResponse<any> | undefined> {
  return await Http.put<SuccessResponse<any>>(`${UserRouteApi.default}/${id}`, data)
}

export async function createUserApi(
  data: UserRequest,
): Promise<SuccessResponse<UserResponse> | undefined> {
  const result = await Http.post<SuccessResponse<UserResponse>>(UserRouteApi.default, data, {
    // headers: {
    //   'Device-Id': getDeviceId(),
    // },
  })

  return result
}

export async function deleteUserApi({
  id,
}: {
  id: string
}): Promise<SuccessResponse<any> | undefined> {
  return await Http.delete<SuccessResponse<any>>(`${UserRouteApi.default}/${id}`)
}
