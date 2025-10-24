import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
  isAuthenticated: boolean;
  checkingAuth: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);


  useEffect(() => {
    const t = localStorage.getItem("token");
    if (t) setTokenState(t);
    setCheckingAuth(false);
  }, []);


  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  const setToken = (t: string | null) => {
    setTokenState(t);
  };

  return (
    <AuthContext.Provider
      value={{ token, setToken, isAuthenticated: !!token, checkingAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
