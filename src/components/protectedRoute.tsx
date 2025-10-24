import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, checkingAuth } = useAuth();

  // while we're checking (reading localStorage on initial load), don't redirect — show nothing (or a spinner)
  if (checkingAuth) return null; // or return <LoadingSpinner /> if you want

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
}
