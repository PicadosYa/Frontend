import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useScroll } from "./hooks/useScroll";
import ChoiceModal from "../register/Choice"; // Importa el nuevo modal
import { useAuth } from "../../hooks/useAuth";
import { HeaderSession } from "../register/HeaderSession";
import { MyProfile } from "../../pages/user/MyProfile";

const Header = () => {
  const scrolled = useScroll();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { auth } = useAuth();

  console.log(auth);

  const btnsAuth = [
    {
      name: "Registrarme",
      path: "/choice",
      action: () => setIsModalOpen(true),
    },
    { name: "Iniciar Sesión", path: "/login" },
  ];

  return (
    <>
      <header
        className={`${
          scrolled ? "scrolled" : ""
        } font-exo absolute px-[13px] py-[20px] w-full`}
      >
        <nav className="bg-gradient-to-r from-main-blue to-[#0D1D6C] flex justify-between items-center rounded-[25px] py-[10px] px-[15px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] border border-[#00000059]">
          <Link to="/">
            <img
              src="https://raw.githubusercontent.com/woohdang/fotos-py/main/Logo.png"
              alt="Logo"
              className="h-[57px]"
            />
          </Link>
          {auth.email ? (
            <HeaderSession auth={auth} />
          ) : (
            <ul className="flex gap-[20px] justify-end">
              <li>
                <button
                  onClick={btnsAuth[0].action}
                  className="shadow-[0px_4px_2px_rgba(0,0,0,0.51)] px-[40px] py-[10px] bg-gradient-to-r from-orange-dark to-orange-light rounded-[10px] hover:bg-gradient-to-r hover:from-orange-light hover:to-orange-dark"
                >
                  <p className="text-white font-semibold">{btnsAuth[0].name}</p>
                </button>
              </li>
              <li className="shadow-[0px_4px_2px_rgba(0,0,0,0.51)] px-[40px] py-[10px] bg-gradient-to-r from-orange-dark to-orange-light rounded-[10px] hover:bg-gradient-to-r hover:from-orange-light hover:to-orange-dark">
                <Link to={btnsAuth[1].path}>
                  <p className="text-white font-semibold">{btnsAuth[1].name}</p>
                </Link>
              </li>
            </ul>
          )}
        </nav>
      </header>

      {isModalOpen && <ChoiceModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default Header;
