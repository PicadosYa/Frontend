import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const btnsAuth = [
    { name: "Login", path: "/login" },
    { name: "Register", path: "/register" },
  ];

  return (
    <header className="bg-[#d0d3d4] flex items-center justify-between px-4">
      {/* Logo que redirige a home */}
      <Link to="/" className="flex items-center">
        <img src="/favicon.ico" alt="Logo" className="h-8 w-8" />
      </Link>

      {/* Botones de autenticación */}
      <nav>
        <ul className="flex justify-end">
          {btnsAuth.map((btn, index) => (
            <li
              key={index}
              className="mx-4 my-2 px-3 py-1 bg-slate-600 font-semibold text-white rounded-full"
            >
              <Link to={btn.path}>{btn.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
