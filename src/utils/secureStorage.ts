/**
 * Secure Storage Utility
 * 
 * Provides encrypted storage for sensitive authentication data.
 * Uses Web Crypto API for encryption and sessionStorage for storage.
 * 
 * Security features:
 * - AES-GCM encryption for all stored data
 * - Session-based storage (cleared when browser/tab closes)
 * - Encryption key derived from browser fingerprint
 * - No plain-text storage of tokens or sensitive data
 */

class SecureStorage {
  private static instance: SecureStorage
  private encryptionKey: CryptoKey | null = null
  private readonly STORAGE_PREFIX = '__secure_'
  private readonly KEY_MATERIAL_STORAGE = '__km_'

  private constructor() {
    this.initializeEncryption()
  }

  public static getInstance(): SecureStorage {
    if (!SecureStorage.instance) {
      SecureStorage.instance = new SecureStorage()
    }
    return SecureStorage.instance
  }

  /**
   * Initialize encryption key
   * Uses a combination of browser characteristics to generate a unique key
   */
  private async initializeEncryption(): Promise<void> {
    try {
      // Generate or retrieve key material
      let keyMaterial = sessionStorage.getItem(this.KEY_MATERIAL_STORAGE)
      
      if (!keyMaterial) {
        // Generate new key material from browser fingerprint
        const fingerprint = await this.generateBrowserFingerprint()
        keyMaterial = fingerprint
        sessionStorage.setItem(this.KEY_MATERIAL_STORAGE, keyMaterial)
      }

      // Derive encryption key from key material
      const encoder = new TextEncoder()
      const keyData = encoder.encode(keyMaterial)
      
      const baseKey = await crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'PBKDF2' },
        false,
        ['deriveBits', 'deriveKey']
      )

      // Derive AES-GCM key
      this.encryptionKey = await crypto.subtle.deriveKey(
        {
          name: 'PBKDF2',
          salt: encoder.encode('dental-clinic-secure-storage'),
          iterations: 100000,
          hash: 'SHA-256'
        },
        baseKey,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt', 'decrypt']
      )
    } catch (error) {
      console.error('Failed to initialize encryption:', error)
      throw new Error('Secure storage initialization failed')
    }
  }

  /**
   * Generate a browser fingerprint for key derivation
   */
  private async generateBrowserFingerprint(): Promise<string> {
    const components = [
      navigator.userAgent,
      navigator.language,
      new Date().getTimezoneOffset().toString(),
      screen.width.toString(),
      screen.height.toString(),
      screen.colorDepth.toString(),
      // Add a random component for additional entropy
      crypto.getRandomValues(new Uint32Array(4)).join('')
    ]

    const fingerprint = components.join('|')
    const encoder = new TextEncoder()
    const data = encoder.encode(fingerprint)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  }

  /**
   * Encrypt data using AES-GCM
   */
  private async encrypt(data: string): Promise<string> {
    if (!this.encryptionKey) {
      await this.initializeEncryption()
    }

    if (!this.encryptionKey) {
      throw new Error('Encryption key not available')
    }

    const encoder = new TextEncoder()
    const dataBuffer = encoder.encode(data)

    // Generate random IV
    const iv = crypto.getRandomValues(new Uint8Array(12))

    // Encrypt
    const encryptedBuffer = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      this.encryptionKey,
      dataBuffer
    )

    // Combine IV and encrypted data
    const combined = new Uint8Array(iv.length + encryptedBuffer.byteLength)
    combined.set(iv, 0)
    combined.set(new Uint8Array(encryptedBuffer), iv.length)

    // Convert to base64
    return btoa(String.fromCharCode(...combined))
  }

  /**
   * Decrypt data using AES-GCM
   */
  private async decrypt(encryptedData: string): Promise<string> {
    if (!this.encryptionKey) {
      await this.initializeEncryption()
    }

    if (!this.encryptionKey) {
      throw new Error('Encryption key not available')
    }

    try {
      // Decode from base64
      const combined = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0))

      // Extract IV and encrypted data
      const iv = combined.slice(0, 12)
      const encryptedBuffer = combined.slice(12)

      // Decrypt
      const decryptedBuffer = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        this.encryptionKey,
        encryptedBuffer
      )

      const decoder = new TextDecoder()
      return decoder.decode(decryptedBuffer)
    } catch (error) {
      console.error('Decryption failed:', error)
      throw new Error('Failed to decrypt data')
    }
  }

  /**
   * Store encrypted data in sessionStorage
   */
  public async setItem(key: string, value: string): Promise<void> {
    try {
      const encrypted = await this.encrypt(value)
      sessionStorage.setItem(this.STORAGE_PREFIX + key, encrypted)
    } catch (error) {
      console.error('Failed to store item:', error)
      throw new Error('Failed to store secure data')
    }
  }

  /**
   * Retrieve and decrypt data from sessionStorage
   */
  public async getItem(key: string): Promise<string | null> {
    try {
      const encrypted = sessionStorage.getItem(this.STORAGE_PREFIX + key)
      if (!encrypted) {
        return null
      }
      return await this.decrypt(encrypted)
    } catch (error) {
      console.error('Failed to retrieve item:', error)
      // If decryption fails, remove the corrupted item
      this.removeItem(key)
      return null
    }
  }

  /**
   * Remove item from storage
   */
  public removeItem(key: string): void {
    sessionStorage.removeItem(this.STORAGE_PREFIX + key)
  }

  /**
   * Clear all secure storage items
   */
  public clear(): void {
    // Remove all items with our prefix
    const keys = Object.keys(sessionStorage)
    keys.forEach(key => {
      if (key.startsWith(this.STORAGE_PREFIX) || key === this.KEY_MATERIAL_STORAGE) {
        sessionStorage.removeItem(key)
      }
    })
  }

  /**
   * Store JSON object securely
   */
  public async setJSON<T>(key: string, value: T): Promise<void> {
    const json = JSON.stringify(value)
    await this.setItem(key, json)
  }

  /**
   * Retrieve JSON object securely
   */
  public async getJSON<T>(key: string): Promise<T | null> {
    const json = await this.getItem(key)
    if (!json) {
      return null
    }
    try {
      return JSON.parse(json) as T
    } catch (error) {
      console.error('Failed to parse JSON:', error)
      this.removeItem(key)
      return null
    }
  }
}

// Export singleton instance
export const secureStorage = SecureStorage.getInstance()

// Storage keys for type safety
export const SecureStorageKeys = {
  AUTH_TOKEN: 'authToken',
  REFRESH_TOKEN: 'refreshToken',
  USER: 'user',
  TOKEN_EXPIRY: 'tokenExpiry',
  TOKEN_TYPE: 'tokenType',
  REMEMBER_ME: 'rememberMe',
  SAVED_EMAIL: 'savedEmail',
  SAVED_PASSWORD: 'savedPassword'
} as const
