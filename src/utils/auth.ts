import api from "./api";
import { AxiosError } from "axios";
import { UserProfile } from "../types/user";
import { ApiResponse } from "../types/user";

const isValidWalletAddress = (address: string): boolean => {
  if (!address) return false;
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
): Promise<ApiResponse<UserProfile>> => {
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
): Promise<ApiResponse<UserProfile>> => {
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

export const getUserProfile = async (): Promise<ApiResponse<UserProfile>> => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("No access Token");
    const response = await api.get("/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    let errorMessage = "Get user fail!";
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

export const updateUserProfile = async (
  data: Partial<UserProfile>
): Promise<ApiResponse<UserProfile>> => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("No access Token");

    const response = await api.put("users/profile", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      success: true,
      data: response.data.data,
      message: response.data.data,
    };
  } catch (error) {
    let errorMessage = "Update profile fail:";
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

export const requestLoginMessage = async (
  walletAddress: string
): Promise<ApiResponse<string>> => {
  try {
    const response = await api.post("/users/request", {
      walletAddress,
    });
    return {
      success: true,
      message: "Message generated successfully",
      data: response.data.data,
    };
  } catch (error) {
    let errorMessage = "Request message fail!";
    if (error instanceof AxiosError && error.response) {
      errorMessage =
        (error.response.data as { message: string }).message || errorMessage;
    }
    console.log('loi:',errorMessage);
    return {
      success: false,
      message: errorMessage,
    };
  }
};

export const loginWithWallet = async (
  walletAddress: string,
  signature: string,
  message: string
): Promise<ApiResponse<string>> => {
  try {
    const response = await api.post("/users/login", {
      walletAddress,
      signature,
      message,
    });
    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    let errorMessage = "Login fail!";
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
