import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { UserProfile } from "../types/user";
import { getUserProfile, isAuthenticated, logout as authLogout } from "../utils/auth";

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuth, setIsAuth] = useState<boolean>(isAuthenticated());

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const response = await getUserProfile();
      if (response.success && response.data) {
        setUser(response.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to fetch profile", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuth) {
        fetchProfile();
    } else {
        setUser(null);
        setIsLoading(false);
    }
  }, [isAuth]);

  const login = () => {
    setIsAuth(true);
  };

  const logout = () => {
    authLogout();
    setIsAuth(false);
    setUser(null);
  };

  const refreshProfile = async () => {
    await fetchProfile();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: isAuth,
        login,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
