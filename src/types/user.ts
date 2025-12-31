export interface UserProfile {
  walletAddress?: string
  username?: string
  bio?: string
  balance?: string
  telegramUrl?: string
  xUrl?: string
  githubUrl?: string
}

export interface AuthResponse {
  success: boolean
  message?: string
  data?: unknown
}