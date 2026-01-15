import axios from "axios";

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }

  // Handle Ethers/MetaMask errors
  const err = error as any;
  if (err.code === "ACTION_REJECTED") {
    return "You rejected the transaction.";
  }
  if (err.code === "CALL_EXCEPTION") {
    return "Transaction failed: Smart Contract rejected the request. Please check your inputs or balance.";
  }
  if (err.code === "INSUFFICIENT_FUNDS") {
    return "Insufficient funds for gas.";
  }
  if (err.message && err.message.includes("user rejected")) {
    return "User rejected the request.";
  }

  if (error instanceof Error) {
    // If it's a huge RPC error, try to extract reason
    if (error.message.includes("execution reverted")) {
         return "Transaction reverted by Smart Contract. Conditions not met.";
    }
    return error.message.length > 100 ? "An unexpected error occurred." : error.message;
  }

  return "Unexpected error";
}
