import React from "react";
import { Routes, Route } from "react-router-dom";
import { Logout } from "../services/Logout";
import { PrivateLayout, PublicLayout } from "../components/layout";
import { Error404, Home, Login, RegisterOwner, Reservas } from "../pages";
import UserLayout from "../components/layout/user/UserLayout";
import { Register } from "../pages/auth/register/Register";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="choice/registerOwner" element={<RegisterOwner />} />
        <Route path="choice/register" element={<Register />} />
      </Route>

      <Route path="/canchero" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="logout" element={<Logout />} />
        <Route path="reservas" element={<Reservas />} />
      </Route>

      <Route path="/admin" element={<PrivateLayout />}>
        <Route index element={<Home />} />
        <Route path="logout" element={<Logout />} />
      </Route>

      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default Routing;
