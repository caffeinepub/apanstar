import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import type { Identity } from "@icp-sdk/core/agent";

export interface AuthState {
  identity: Identity | undefined;
  isAuthenticated: boolean;
  isInitializing: boolean;
  login: () => void;
  logout: () => void;
}

export function useAuth(): AuthState {
  const { identity, login, clear, isInitializing } = useInternetIdentity();

  return {
    identity,
    isAuthenticated: !!identity,
    isInitializing,
    login,
    logout: clear,
  };
}
