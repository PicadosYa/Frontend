import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../hooks";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import PuffLoaderComponent from "../../loader/PuffLoader";

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
        <Header role={auth.role} />
        {false ? <Outlet /> : <Navigate to="/login" />}
        <Footer />
      </>
    );
  }
};

export default PrivateLayout;
