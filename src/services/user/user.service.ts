import type { DefaultFiltersPayload } from '../global.type'
import {
  createUserApi,
  deleteUserApi,
  fetchFiltersUsersApi,
  fetchUserByIdApi,
  updateUserApi,
} from './user.api'
import type { UserRequest, UserResponse, UserUpdatePayload } from './user.type'

export async function fetchFiltersUsers(
  payload: DefaultFiltersPayload,
): Promise<PaginationResponse<UserResponse> | undefined> {
  try {
    let payloadData = { ...payload }
    const res = await fetchFiltersUsersApi({
      payload,
    })

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function fetchUserById({ id }: { id: string }): Promise<UserResponse | undefined> {
  try {
    const res = await fetchUserByIdApi({ id: id })

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function updateUser({
  id,
  data,
}: {
  id: string
  data: UserUpdatePayload
}): Promise<any | undefined> {
  try {
    const res = await updateUserApi({
      data: data,
      id: id,
    })

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function createUser({ data }: { data: UserRequest }): Promise<any | undefined> {
  try {
    const res = await createUserApi(data)

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function deleteUser({ id }: { id: string }): Promise<any | undefined> {
  try {
    const res = await deleteUserApi({
      id: id,
    })

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}
