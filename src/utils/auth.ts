import api from "./api";
import { AxiosError } from "axios";
import { UserProfile } from "../types/user";
import { AuthResponse } from "../types/user";

/**
 * Validates wallet address format
 * Must be exactly 10 characters
 */
const isValidWalletAddress = (address: string): boolean => {
  if (!address) return false;
  // Wallet address must be exactly 10 characters
  return address.length === 10;
};

const validateAuthInputs = (
  walletAddress: string,
  password: string,
  isSignUp: boolean = false
): string | null => {
  if (!isValidWalletAddress(walletAddress)) {
    return "Invalid wallet address format. Must be exactly 10 characters.";
  }
  if (!password || password.length === 0) {
    return "Password is required";
  }
  if (isSignUp && !walletAddress.startsWith("0")) {
    return "Invalid wallet address format. Must be start with 0.";
  }
  if (isSignUp && password.length < 6) {
    return "Password must be at least 6 characters";
  }
  return null;
};

export const signIn = async (
  walletAddress: string,
  password: string
): Promise<AuthResponse> => {
  const errorAuthInput = validateAuthInputs(walletAddress, password, false);
  if (errorAuthInput) {
    return {
      success: false,
      message: errorAuthInput,
    };
  }

  try {
    const response = await api.post("/users/sign-in", {
      walletAddress,
      password,
    });
    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    let errorMessage = "Sign-in fail!";
    if (error instanceof AxiosError && error.response) {
      errorMessage =
        (error.response.data as { message: string }).message || errorMessage;
    }
    return {
      success: false,
      message: errorMessage,
    };
  }
};

export const signUp = async (
  walletAddress: string,
  password: string
): Promise<AuthResponse> => {
  const errorAuthInput = validateAuthInputs(walletAddress, password, true);
  if (errorAuthInput) {
    return {
      success: false,
      message: errorAuthInput,
    };
  }
  try {
    const response = await api.post("/users/sign-up", {
      walletAddress,
      password,
    });
    return {
      success: true,
      data: response.data.data,
      message: response.data.message,
    };
  } catch (error) {
    let errorMessage = "Register fail!";
    if (error instanceof AxiosError && error.response) {
      errorMessage =
        (error.response.data as { message: string }).message || errorMessage;
    }
    return {
      success: false,
      message: errorMessage,
    };
  }
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("accessToken");
};

export const getWalletAddress = (): string | null => {
  return localStorage.getItem("walletAddress");
};

export const logout = (): void => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("walletAddress");
  localStorage.removeItem("isAuthenticated");
};

export const getUserProfile = async (): Promise<
  UserProfile | null | AuthResponse
> => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;
    const response = await api.get("/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // return response.data.data;
    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    console.error("loi khi lay thong tin user:", error);
    return null;
  }
};

export const updateUserProfile = async (
  data: Partial<UserProfile>
): Promise<UserProfile | null> => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;

    const response = await api.put("users/profile", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Update profile fail:", error);
    throw error;
  }
};
