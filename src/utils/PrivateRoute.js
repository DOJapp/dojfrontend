import { useNavigate } from "react-router-dom";
import Layout from "../layouts/Layout";
import { useEffect } from "react";

function PrivateRoute() {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    // If no access token and no refresh token, redirect to login
    if (!accessToken && !refreshToken) {
      navigate("/login"); // Redirect to login if both tokens are missing
    }
    // If only refreshToken exists, you might want to attempt refreshing the access token
    // Add logic for token refresh here if needed, otherwise, keep it as is
  }, [navigate]); // Only depend on navigate

  return <Layout />;
}

export default PrivateRoute;
