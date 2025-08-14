// import { env } from '@/config/env'
import type { TransactionStatusEnum } from '@/constants/constant.enum'
import type {
  DashboardFiltersPayload,
  DashboardFiltersRequest,
  DashboardTransactionsStatsPayload,
  DefaultFiltersPayload,
  TransactionFiltersPayload,
} from '../global.type'
import { Http } from '../Http'
import { TransactionRouteApi } from './transaction-constants'
import type {
  DashboardStatsResponse,
  TransactionResponse,
  TransactionStatsResponse,
} from './transaction-type'

export async function fetchFiltersTransactionsApi({
  payload,
}: {
  payload: TransactionFiltersPayload
}): Promise<SuccessResponse<PaginationResponse<TransactionResponse>> | undefined> {
  payload.dates![0].setHours(0, 0, 0, 0)
  payload.dates![1].setHours(23, 59, 59, 59)

  const formatPayload = {
    startDate: payload.dates![0].toISOString(),
    endDate: payload.dates![1].toISOString(),
    ...payload,
  }
  const result = await Http.get<SuccessResponse<PaginationResponse<TransactionResponse>>>(
    TransactionRouteApi.filter,
    formatPayload,
  )

  return result
}

export async function fetchDashboardFiltersTransactionsApi({
  payload,
}: {
  payload: DashboardFiltersPayload
}): Promise<SuccessResponse<PaginationResponse<TransactionResponse>> | undefined> {
  payload.dates![0].setHours(0, 0, 0, 0)
  payload.dates![1].setHours(23, 59, 59, 59)

  const formatPayload = {
    startDate: payload.dates![0].toISOString(),
    endDate: payload.dates![1].toISOString(),
    ...payload,
  }

  const result = await Http.get<SuccessResponse<PaginationResponse<TransactionResponse>>>(
    TransactionRouteApi.default,
    formatPayload,
  )

  return result
}
export async function fetchDashboardTransactionsStatsApi({
  payload,
}: {
  payload: DashboardTransactionsStatsPayload
}): Promise<SuccessResponse<DashboardStatsResponse> | undefined> {
  payload.dates![0].setHours(0, 0, 0, 0)
  payload.dates![1].setHours(23, 59, 59, 59)

  const formatPayload = {
    startDate: payload.dates![0].toISOString(),
    endDate: payload.dates![1].toISOString(),
    ...payload,
  }
  const result = await Http.get<SuccessResponse<DashboardStatsResponse>>(
    TransactionRouteApi.dashboardStats,
    formatPayload,
  )

  return result
}

export async function fetchTransactionStatsApi({
  payload,
}: {
  payload: DashboardTransactionsStatsPayload // Supposant que le payload est similaire pour l'instant
}): Promise<SuccessResponse<TransactionStatsResponse> | undefined> {
  payload.dates![0].setHours(0, 0, 0, 0)
  payload.dates![1].setHours(23, 59, 59, 59)

  const formatPayload = {
    startDate: payload.dates![0].toISOString(),
    endDate: payload.dates![1].toISOString(),
    ...payload,
  }
  const result = await Http.get<SuccessResponse<TransactionStatsResponse>>(
    TransactionRouteApi.transactionStats, // À confirmer si c'est le bon endpoint
    formatPayload,
  )

  return result
}

export async function fetchUserTransactionsByIdApi({
  id,
}: {
  id: string
}): Promise<SuccessResponse<PaginationResponse<TransactionResponse>> | undefined> {
  return await Http.get<SuccessResponse<PaginationResponse<TransactionResponse>>>(
    `${TransactionRouteApi.default}`,
    {
      user_id: id,
    },
  )
}

export async function updateTransactionStatusApi({
  id,status
}: {
  id: string,
  status:string
}): Promise<SuccessResponse<any> | undefined> {
  return await Http.post<SuccessResponse<any>>(
    `${TransactionRouteApi.updateStatus({id,status})}`,
    {}
    
  )
}
