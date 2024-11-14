import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoutes = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoutes;
