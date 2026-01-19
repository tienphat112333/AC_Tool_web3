export interface UserProfile {
  walletAddress?: string;
  username?: string;
  bio?: string;
  balance?: string;
  telegramUrl?: string;
  xUrl?: string;
  githubUrl?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}
