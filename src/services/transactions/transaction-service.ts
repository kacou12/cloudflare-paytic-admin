import { defaultProviderColor } from '@/lib/utils'
import { getProviderColor, setDefaultProviderColor, setProviderColor } from '../auth/auth-util'
import type {
  DashboardTransactionsStatsPayload,
  DefaultFiltersPayload,
  TransactionFiltersPayload,
} from '../global.type'
import {
  fetchDashboardFiltersTransactionsApi,
  fetchDashboardTransactionsStatsApi,
  fetchFiltersTransactionsApi,
  fetchTransactionStatsApi, // Ajout de l'importation
  fetchUserTransactionsByIdApi,
  updateTransactionStatusApi,
} from './transaction-api'
import type {
  DashboardStatsResponse,
  TransactionResponse,
  TransactionStatsResponse, // Ajout de l'importation
} from './transaction-type'

export async function fetchFiltersTransactions(
  payload: TransactionFiltersPayload,
): Promise<PaginationResponse<TransactionResponse> | undefined> {
  try {
    let payloadData = { ...payload }
    const res = await fetchFiltersTransactionsApi({
      payload,
    })

    let customData = res?.data

    customData?.items.sort((a, b) => {
      const dateA = new Date(a.created_at)
      const dateB = new Date(b.created_at)
      return dateB.getTime() - dateA.getTime() // dateB - dateA pour le plus récent au plus ancien
    })

    return customData
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}
export async function fetchDashboardFiltersTransactions(
  payload: DefaultFiltersPayload,
): Promise<PaginationResponse<TransactionResponse> | undefined> {
  try {
    let payloadData = { ...payload }
    const res = await fetchDashboardFiltersTransactionsApi({
      payload,
    })

    let customData = res?.data

    customData?.items.sort((a, b) => {
      const dateA = new Date(a.created_at)
      const dateB = new Date(b.created_at)
      return dateB.getTime() - dateA.getTime() // dateB - dateA pour le plus récent au plus ancien
    })

    return customData
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function fetchDashboardTransactionsStats(
  payload: DashboardTransactionsStatsPayload,
): Promise<DashboardStatsResponse | undefined> {
  try {
    let payloadData = { ...payload }
    const res = await fetchDashboardTransactionsStatsApi({
      payload,
    })

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function fetchTransactionStats(
  payload: DashboardTransactionsStatsPayload, // Supposant que le payload est similaire
): Promise<TransactionStatsResponse | undefined> {
  try {
    const res = await fetchTransactionStatsApi({
      // Appel de la nouvelle fonction API
      payload,
    })

    let customData = res!.data
    if (!customData?.sum_txns_amount_group_by_provider) {
      customData!.sum_txns_amount_group_by_provider = []
    }

    for (let index = 0; index < customData.sum_txns_amount_group_by_provider.length; index++) {
      const element = customData.sum_txns_amount_group_by_provider[index]
      if (!getProviderColor(element.operator.toLowerCase())) {
        const finded = defaultProviderColor.find((el) => {
          if (el.name.toLowerCase() === element.operator.toLowerCase()) {
            return el
          }
        })
        if (finded) {
          setDefaultProviderColor(element.operator.toLowerCase(), finded.color)
        } else {
          setProviderColor(element.operator.toLowerCase())
        }
      }
    }

    return customData
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function fetchUserTransactions({
  id,
}: {
  id: string
}): Promise<PaginationResponse<TransactionResponse> | undefined> {
  try {
    const res = await fetchUserTransactionsByIdApi({ id: id })

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function updateTransactionStatus({
  id,
  status
}: {
  id: string,
  status:string
}): Promise<any | undefined> {
  try {
    const res = await updateTransactionStatusApi({ id: id, status: status })

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}
