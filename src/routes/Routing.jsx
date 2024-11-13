import React from "react";
import { Routes, Route } from "react-router-dom";
import { Logout } from "../services/Logout";
import { PrivateLayout, PublicLayout } from "../components/layout";
import { Error404, Home, Login, Profile, Register } from "../pages";

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          {/* <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} /> */}
        </Route>

        <Route path="/login" element={<PublicLayout />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/register" element={<PublicLayout />}>
          <Route index element={<Register />} />
        </Route>

        <Route path="/user" element={<PrivateLayout />}>
          <Route index element={<Home />} />
          <Route path="logout" element={<Logout />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
};

export default Routing;
