import { useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  signIn,
  signUp,
  requestLoginMessage,
  loginWithWallet,
} from "../../utils/auth";
import { useConnect, useSignMessage, useAccount } from "wagmi";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../utils/error";

interface AuthModalProps {
  mode: "register" | "signin";
  isOpen: boolean;
  onClose: () => void;
  onModeSwitch: () => void;
  onSuccess: () => void;
}

const AuthModal = ({
  mode,
  isOpen,
  onClose,
  onModeSwitch,
  onSuccess,
}: AuthModalProps) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { connectAsync, connectors } = useConnect();
  const { signMessageAsync } = useSignMessage();
  const { address, isConnected } = useAccount();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      let response;
      if (mode === "register") {
        response = await signUp(walletAddress, password);
      } else {
        response = await signIn(walletAddress, password);
      }

      if (response.success) {
        if (mode === "register") {
          toast(response.message);
          onModeSwitch();
        } else {
          const token = response.data;
          if (typeof token === "string") {
            localStorage.setItem("accessToken", token);
          }
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("walletAddress", walletAddress);
          onSuccess();
          toast(response.message);
          handleClose();
        }
      } else {
        toast.error(response.message || "Authentication failed");
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnectWallet = async () => {
    setIsLoading(true);
    try {
      let userAddress = address;
      if (!isConnected || !userAddress) {
        const connector =
          connectors.find((c) => c.name === "MetaMask") || connectors[0];
        const result = await connectAsync({ connector });
        userAddress = result.accounts[0];
      }

      if (!userAddress) throw new Error("No address found");

      const msgRes = await requestLoginMessage(userAddress);
      if (!msgRes.success || !msgRes.data) {
        toast.error(msgRes.message || "Failed to get message");
        setIsLoading(false);
        return;
      }

      const signature = await signMessageAsync({ message: msgRes.data });

      const loginRes = await loginWithWallet(
        userAddress,
        signature,
        msgRes.data,
      );
      if (loginRes.success) {
        const token = loginRes.data;
        if (typeof token === "string") {
          localStorage.setItem("accessToken", token);
        }
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("walletAddress", userAddress);
        onSuccess();
        toast(loginRes.message);
        handleClose();
      } else {
        toast.error(loginRes.message || "Login failed");
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setWalletAddress("");
    setPassword("");
    setConfirmPassword("");
    setError("");
    setShowPassword(false);
    setShowConfirmPassword(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleClose}
    >
      <div
        className="relative bg-white rounded-2xl w-full max-w-[500px] p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-9 right-4 text-black "
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <h2 className="text-xl font-bold leading-[28px] text-center mb-6">
          {mode === "register" ? "Register" : "Sign In"}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 borde border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="wallet-address"
              className="block text-base leading-[24px] font-medium mb-2"
            >
              Wallet Address
            </label>
            <Input
              id="wallet-address"
              type="text"
              placeholder="Ox...."
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              required
              hasError={!!error}
              className="w-[452px] h-[52px] rounded-lg px-[10px] py-4"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-base leading-[24px] font-medium mb-2"
            >
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="**********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                hasError={!!error}
                className="w-[452px] h-[52px] rounded-lg px-[10px] py-4"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {mode === "register" && (
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="**********"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  hasError={!!error}
                  className="w-[452px] h-[52px] rounded-lg px-[10px] py-4"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary-primary2 text-white h-12 rounded-lg"
            disabled={isLoading}
          >
            {isLoading
              ? "Processing..."
              : mode === "register"
                ? "Register"
                : "Sign"}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={handleConnectWallet}
          className="w-full h-12 rounded-lg border-2 hover:bg-gray-50 mb-4"
          disabled={isLoading}
        >
          Metamask
        </Button>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={onModeSwitch}
            className="text-sm text-black underline"
          >
            {mode === "register"
              ? "You already have an Account?"
              : "You haven't Account?"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
