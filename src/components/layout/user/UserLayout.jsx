import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import Footer from "../../footer/Footer";
import PuffLoaderComponent from "../../loader/PuffLoader";
import { Global } from "../../../helpers/Global";
import AdminSideBar from "../../../pages/reservas/AdminSideBar";

const UserLayout = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    return <PuffLoaderComponent isLoading={loading} />;
  } else {
    return (
      <>
        {auth.role == Global.rolesTypes.field ? (
          <Outlet />
        ) : (
          <Navigate to="/login" />
        )}
        <Footer />
      </>
    );
  }
};

export default UserLayout;
