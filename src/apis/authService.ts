import axios from 'axios'
import type { 
  LoginRequest, 
  LoginResponse, 
  RefreshTokenRequest, 
  RefreshTokenResponse,
  UserProfileResponse,
  AuthErrorResponse 
} from '@/types/api'
import { SupabaseAuthError } from './supabaseAuth'

const DEFAULT_BASE_URL = 'http://localhost:8000'

const authClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? DEFAULT_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export class AuthenticationError extends Error {
  statusCode: number
  response?: any

  constructor(message: string, statusCode: number, response?: any) {
    super(message)
    this.name = 'AuthenticationError'
    this.statusCode = statusCode
    this.response = response
  }
}

export const loginWithSupabase = async (credentials: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await authClient.post<LoginResponse>('/api/common/auth/login/', credentials)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 0
      const errorData = error.response?.data as AuthErrorResponse
      const message = errorData?.error || errorData?.message || error.message
      
      throw new AuthenticationError(message, status, error.response?.data)
    }
    throw error
  }
}

export const logoutFromSupabase = async (token: string): Promise<void> => {
  try {
    await authClient.post('/api/common/auth/logout/', {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 0
      const errorData = error.response?.data as AuthErrorResponse
      const message = errorData?.error || errorData?.message || error.message
      
      throw new AuthenticationError(message, status, error.response?.data)
    }
    throw error
  }
}

export const refreshSupabaseToken = async (refreshToken: RefreshTokenRequest): Promise<RefreshTokenResponse> => {
  try {
    const response = await authClient.post<RefreshTokenResponse>('/api/common/auth/refresh/', refreshToken)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 0
      const errorData = error.response?.data as AuthErrorResponse
      const message = errorData?.error || errorData?.message || error.message
      
      throw new AuthenticationError(message, status, error.response?.data)
    }
    throw error
  }
}

export const getUserProfile = async (token: string): Promise<UserProfileResponse> => {
  try {
    const response = await authClient.get<UserProfileResponse>('/api/common/auth/profile/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 0
      const errorData = error.response?.data as AuthErrorResponse
      const message = errorData?.error || errorData?.message || error.message
      
      throw new SupabaseAuthError(message, status, error.response, error)
    }
    throw error
  }
}

// Export auth client for other uses
export { authClient }