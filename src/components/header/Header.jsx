import React from "react";
import {Link} from "react-router-dom";
import { Global } from "../../helpers/Global";

const Header = () => {
const btnsAuth = [
    { name: "Login", path: "/login" },
    { name: "Register", path: "/register" },
]
  return (
    <header className="bg-[#d0d3d4]">
      <nav>
        <ul className="flex justify-end">
          {btnsAuth.map((btn, index) => {
            return (
              <li key={index} className="mx-4 my-2 px-3 py-1 bg-slate-600 font-semibold text-white rounded-full">
                <Link to={btn.path}>{btn.name}</Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
