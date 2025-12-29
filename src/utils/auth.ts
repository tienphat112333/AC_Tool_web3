import api from "./api"
import { AxiosError } from 'axios';
export interface AuthResponse {
  success: boolean
  message?: string
  data?: unknown
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

export const signUp = async(
  walletAddress: string,
  password: string,
): Promise<AuthResponse> => {
  // Basic validation
  if(!walletAddress.startsWith('0')) {
    return {
      success: false,
      message: 'Invalid wallet address format. Must be start with 0.',
    }
  }


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

  if (password.length < 6) {
    return {
      success: false,
      message: 'Password must be at least 6 characters',
    }
  }

  try {
    const response = await api.post('/users/sign-up', { walletAddress, password });
    
    return {
      success: true,
      data: response.data.data,
      message: response.data.message
    };
  } catch (error) {
    let errorMessage = 'Register fail!';

    if (error instanceof AxiosError && error.response) {
      errorMessage = (error.response.data as { message: string }).message || errorMessage;
    }
    
    return {
      success: false,
      message: errorMessage
    };
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
