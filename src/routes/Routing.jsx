import React from "react";
import { Routes, Route } from "react-router-dom";
import { Logout } from "../services/Logout";
import { PrivateLayout, PublicLayout } from "../components/layout";
import { Error404, Home, Login, Profile, RegisterOwner } from "../pages";
import UserLayout from "../components/layout/user/UserLayout";
import BookingManagment from "../pages/reservas/BookingManagment";
import { Register } from "../components/register";

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
        <Route path="perfil" element={<Profile />} />
        <Route path="reservas" element={<BookingManagment />} />
      </Route>

      <Route path="/admin" element={<PrivateLayout />}>
        <Route index element={<Home />} />
        <Route path="logout" element={<Logout />} />
        <Route path="perfil" element={<Profile />} />
      </Route>

      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default Routing;
