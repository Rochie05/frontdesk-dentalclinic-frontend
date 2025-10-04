export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  access_token: string
  refresh_token: string
  user: {
    id: string
    email: string
    roles: string[]
    staff_info: {
      staff_id: number
      last_name: string
      first_name: string
      contact_number: string
      email: string
      staff_image_url: string | null
      role_id: number
      role_name: string
    }
    display_name: string
    email_verified: boolean
  }
  expires_in: number
  token_type: string
}

export interface RefreshTokenRequest {
  refresh_token: string
}

export interface RefreshTokenResponse {
  access_token: string
  refresh_token: string
  expires_in: number
  token_type: string
}

export interface UserProfileResponse {
  user: {
    id: string
    email: string
    roles: string[]
    display_name: string
    email_verified: boolean
    user_metadata: Record<string, any>
    app_metadata: Record<string, any>
    verification_method: string
  }
}

export interface AuthErrorResponse {
  error: string
  message?: string
}