import React from "react";
import {Link} from "react-router-dom";
import { Global } from "../../helpers/Global";

const Header = () => {
const btnsAuth = [
    { name: "Login", path: "/login" },
    { name: "Register", path: "/register" },
]
  return (
      <header className="w-[calc(100%-40px)] mx-5 mt-5 bg-gradient-to-r from-gray-700 to-black rounded-[25px] p-4 flex justify-between items-center absolute  ">
        <Link to="/">
          <img src={Global.images.logoSB} alt="Logo" className="w-219 h-16 mb-[-20px] mt-[-20px]" /> 
        
        </Link>
        <div className="flex space-x-4">
          <Link to="/login">
            <button className=" text-[#eb2a00] font-semibold hover:text-white transition-colors rounded-[25px] px-6 py-2">Registrarme</button>
          
          </Link>
          <Link to="/login">
           <button className=" text-[#eb2a00] font-semibold hover:text-white transition-colors rounded-[25px] px-6 py-2">Iniciar sesión</button>
          
          </Link>
        </div>
      </header>
  );
};

export default Header;
