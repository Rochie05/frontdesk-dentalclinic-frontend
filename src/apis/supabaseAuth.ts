import axios, {
  type AxiosRequestConfig,
  type AxiosResponse,
  type RawAxiosRequestHeaders
} from 'axios'
import type { AxiosError } from 'axios'
import { useCallback } from 'react'
import { useUser } from '@/contexts/UserContext'

const DEFAULT_BASE_URL = 'http://localhost:8000'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? DEFAULT_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

const isAbsoluteUrl = (url: string): boolean => /^https?:\/\//i.test(url)

const normalizeEndpoint = (endpoint: string): string => {
  if (!endpoint) {
    throw new Error('Endpoint is required for authenticated requests')
  }

  if (isAbsoluteUrl(endpoint)) {
    return endpoint
  }

  return endpoint.startsWith('/') ? endpoint : `/${endpoint}`
}

const withAuthHeader = (
  token: string,
  headers?: RawAxiosRequestHeaders
): RawAxiosRequestHeaders => ({
  ...headers,
  Authorization: `Bearer ${token}`
})

export class SupabaseAuthError extends Error {
  statusCode: number
  response?: AxiosResponse<unknown>

  constructor(message: string, statusCode: number, response?: AxiosResponse<unknown>, cause?: unknown) {
    super(message)
    this.name = 'SupabaseAuthError'
    this.statusCode = statusCode
    this.response = response
    if (cause) {
      ;(this as Error & { cause?: unknown }).cause = cause
    }
  }
}

export const postWithSupabaseToken = async <TBody = unknown, TResponse = unknown>(
  endpoint: string,
  body: TBody,
  token: string,
  config?: AxiosRequestConfig<TBody>
): Promise<TResponse> => {
  try {
    const requestConfig: AxiosRequestConfig<TBody> = {
      ...config,
      headers: withAuthHeader(token, config?.headers as RawAxiosRequestHeaders | undefined)
    }

    const response = await apiClient.post<TResponse>(normalizeEndpoint(endpoint), body, requestConfig)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ detail?: string; message?: string }>
      const status = axiosError.response?.status ?? 0
      const detail = axiosError.response?.data?.detail || axiosError.response?.data?.message || axiosError.message

      throw new SupabaseAuthError(detail, status, axiosError.response, axiosError)
    }

    throw error
  }
}

export const useSupabaseAuthenticatedPost = () => {
  const { authToken } = useUser()

  const postAuthenticated = useCallback(
    async <TBody = unknown, TResponse = unknown>(
      endpoint: string,
      body: TBody,
      config?: AxiosRequestConfig<TBody>
    ): Promise<TResponse> => {
      if (!authToken) {
        throw new SupabaseAuthError('Authentication token is required', 401)
      }

      return postWithSupabaseToken<TBody, TResponse>(endpoint, body, authToken, config)
    },
    [authToken]
  )

  return {
    authToken,
    postAuthenticated
  }
}
