import { useNavigate } from "react-router-dom";
import Layout from "../layouts/Layout";
import { useEffect } from "react";

function PrivateRoute() {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken && !refreshToken) {
      navigate("/login");
    }
  }, []); // Only depend on navigate

  return <Layout />;
}

export default PrivateRoute;
