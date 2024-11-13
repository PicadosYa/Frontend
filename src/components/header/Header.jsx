import React from "react";
import {Link} from "react-router-dom";
import { Global } from "../../helpers/Global";

const Header = () => {
const btnsAuth = [
    { name: "Registrarme", path: "/register" },
    { name: "Iniciar Sesión", path: "/login" },
]
  return (
    <header className="font-exo absolute px-[13px] py-[20px]  w-full">
      <nav className="bg-gradient-to-r from-main-blue to-[#0D1D6C] flex justify-between items-center rounded-[25px] py-[10px] px-[15px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] border border-[#00000059]">
        <Link to="/"><img src="/logo-picados-ya.png" alt="Logo" className="h-[57px]" /></Link>
        <ul className="flex gap-[20px] justify-end">
          {btnsAuth.map((btn, index) => {
            return (
              <Link key={index} to={btn.path}>
                <button className=" shadow-[0px_4px_2px_rgba(0,0,0,0.51)]  px-[40px] py-[10px] bg-gradient-to-r from-orange-dark to-orange-light rounded-[10px] hover:bg-gradient-to-r hover:from-orange-light hover:to-orange-dark">
                  <p className="text-white font-semibold ">{btn.name}</p>
                </button>
              </Link>
            )
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
