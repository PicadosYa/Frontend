import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../hooks";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import { Global } from "../../../helpers/Global";

const PublicLayout = () => {
  const { auth } = useAuth();
  const { role } = auth;
  const [route, setRoute] = useState("");

  useEffect(() => {
    if (role === Global.rolesTypes.admin) {
      setRoute("/admin");
      console.log("admin");
    } else if (role === Global.rolesTypes.field) {
      setRoute("/canchero");
      console.log("canchero");
    } else {
      setRoute("");
      console.log("public");
    }
  }, [role]);

  return (
    <>
      {role === Global.rolesTypes.admin || role === Global.rolesTypes.field ? (
        <Navigate to={route} />
      ) : (
        <Outlet />
      )}
      <Footer />
    </>
  );
};

export default PublicLayout;
