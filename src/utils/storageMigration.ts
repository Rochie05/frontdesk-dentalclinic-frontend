/**
 * Storage Migration Utility
 * 
 * Migrates authentication data from insecure localStorage to secure encrypted storage.
 * This should be run once when users first load the app after the security update.
 */

import { secureStorage, SecureStorageKeys } from './secureStorage'

interface LegacyUser {
  id: string
  email: string
  role: string
  isAuthenticated: boolean
  accessToken?: string | null
}

/**
 * Migrate data from localStorage to secure storage
 */
export async function migrateFromLocalStorage(): Promise<void> {
  try {
    // Check if migration has already been done
    const migrationComplete = sessionStorage.getItem('__migration_complete')
    if (migrationComplete === 'true') {
      return
    }

    console.log('Starting storage migration...')

    // Migrate user data
    const legacyUser = localStorage.getItem('user')
    if (legacyUser) {
      try {
        const parsedUser = JSON.parse(legacyUser) as LegacyUser
        await secureStorage.setJSON(SecureStorageKeys.USER, parsedUser)
        console.log('Migrated user data')
      } catch (error) {
        console.error('Failed to migrate user data:', error)
      }
      localStorage.removeItem('user')
    }

    // Migrate auth token
    const legacyAuthToken = localStorage.getItem('authToken')
    if (legacyAuthToken) {
      await secureStorage.setItem(SecureStorageKeys.AUTH_TOKEN, legacyAuthToken)
      localStorage.removeItem('authToken')
      console.log('Migrated auth token')
    }

    // Migrate refresh token
    const legacyRefreshToken = localStorage.getItem('refreshToken')
    if (legacyRefreshToken) {
      await secureStorage.setItem(SecureStorageKeys.REFRESH_TOKEN, legacyRefreshToken)
      localStorage.removeItem('refreshToken')
      console.log('Migrated refresh token')
    }

    // Mark migration as complete
    sessionStorage.setItem('__migration_complete', 'true')
    console.log('Storage migration completed successfully')
  } catch (error) {
    console.error('Storage migration failed:', error)
    // Don't throw - allow app to continue even if migration fails
  }
}

/**
 * Clear all authentication data from both localStorage and secure storage
 * Useful for debugging or forced logout scenarios
 */
export function clearAllAuthData(): void {
  // Clear localStorage
  localStorage.removeItem('user')
  localStorage.removeItem('authToken')
  localStorage.removeItem('refreshToken')

  // Clear secure storage
  secureStorage.removeItem(SecureStorageKeys.USER)
  secureStorage.removeItem(SecureStorageKeys.AUTH_TOKEN)
  secureStorage.removeItem(SecureStorageKeys.REFRESH_TOKEN)

  // Clear migration flag
  sessionStorage.removeItem('__migration_complete')

  console.log('All authentication data cleared')
}
