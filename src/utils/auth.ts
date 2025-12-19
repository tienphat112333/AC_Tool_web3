export interface AuthResponse {
  success: boolean
  message?: string
}

/**
 * Validates wallet address format
 * Must be exactly 10 characters
 */
const isValidWalletAddress = (address: string): boolean => {
  if (!address) return false
  // Wallet address must be exactly 10 characters
  return address.length === 10
}

/**
 * Mock login function
 * Accepts wallet address (exactly 10 characters) and any non-empty password
 */
export const mockLogin = (walletAddress: string, password: string): AuthResponse => {
  // Basic validation
  if (!isValidWalletAddress(walletAddress)) {
    return {
      success: false,
      message: 'Invalid wallet address format. Must be exactly 10 characters.',
    }
  }

  if (!password || password.length === 0) {
    return {
      success: false,
      message: 'Password is required',
    }
  }

  // Mock successful login
  localStorage.setItem('isAuthenticated', 'true')
  localStorage.setItem('walletAddress', walletAddress)

  return {
    success: true,
    message: 'Login successful',
  }
}

/**
 * Mock register function
 * Accepts wallet address (exactly 10 characters) and any non-empty password
 */
export const mockRegister = (
  walletAddress: string,
  password: string,
  confirmPassword: string
): AuthResponse => {
  // Basic validation
  if (!isValidWalletAddress(walletAddress)) {
    return {
      success: false,
      message: 'Invalid wallet address format. Must be exactly 10 characters.',
    }
  }

  if (!password || password.length === 0) {
    return {
      success: false,
      message: 'Password is required',
    }
  }

  if (password !== confirmPassword) {
    return {
      success: false,
      message: 'Passwords do not match',
    }
  }

  if (password.length < 6) {
    return {
      success: false,
      message: 'Password must be at least 6 characters',
    }
  }

  // Mock successful registration
  localStorage.setItem('isAuthenticated', 'true')
  localStorage.setItem('walletAddress', walletAddress)

  return {
    success: true,
    message: 'Registration successful',
  }
}

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return localStorage.getItem('isAuthenticated') === 'true'
}

/**
 * Get current wallet address
 */
export const getWalletAddress = (): string | null => {
  return localStorage.getItem('walletAddress')
}

/**
 * Logout function
 */
export const logout = (): void => {
  localStorage.removeItem('isAuthenticated')
  localStorage.removeItem('walletAddress')
}
