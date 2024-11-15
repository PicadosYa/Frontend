import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../hooks";
import Footer from "../../footer/Footer";
import PuffLoaderComponent from "../../loader/PuffLoader";
import { Global } from "../../../helpers/Global";

const PrivateLayout = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    return (
      <div className="">
        <PuffLoaderComponent isLoading={loading} />
      </div>
    );
  } else {
    return (
      <>
        {auth.role == Global.rolesTypes.admin ? (
          <Outlet />
        ) : (
          <Navigate to="/login" />
        )}
        <Footer />
      </>
    );
  }
};

export default PrivateLayout;
