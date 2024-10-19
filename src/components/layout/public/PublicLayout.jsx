import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../hooks";
import PuffLoaderComponent from "../../loader/PuffLoader";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";

const PublicLayout = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    return (
      <div className="">
        <PuffLoaderComponent isLoading={loading} />
      </div>
    );
  }
  return (
    <>
      <Header />
      {true ? <Outlet /> : <Navigate to="/user" />}
      <Footer />
    </>
  );
};

export default PublicLayout;
