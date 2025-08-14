import type { HttpStatusCode } from 'axios'

export {}

declare global {
  type SuccessResponse<T = any> = {
    data: T
    message?: string
    status?: boolean
  }

  type ErrorResponse = {
    data: string
    message?: string
    status?: true
  }

  type PaginationResponse<T = any> = {
    items: Array<T>
    total: number
    hasMore: boolean
  }
}

