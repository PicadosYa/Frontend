import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Global } from "../../helpers/Global";

export function HeaderSession({ auth }) {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false)
  return (
    <div className="mx-5 bg-transparent rounded-[25px] p-4 flex justify-end items-center">
      <div
        className="flex space-x-6 items-center text-white"
        style={{ fontFamily: "Exo, sans-serif", lineHeight: "normal" }}
      >
        <span>{`Hola!, ${auth.firstname}`}</span>
        <div className="w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center relative">
          <img
            src="./../../../public/Proyecto nuevo 1.png"
            alt="Profile"
            className="w-full h-full rounded-full cursor-pointer"
            onClick={()=> setIsUserModalOpen(!isUserModalOpen)}
          />
          {isUserModalOpen && (

            <div className="absolute top-[100%] w-44 z-10 bg-dark-blue rounded-md flex flex-col gap-2 p-2">
              <h4 className="text-center font-bold">{auth.firstname}</h4>
              <Link
                to="perfil"
                className="hover:font-bold"
              >Perfil
              </Link>
              <Link
                to="reservas"
                className="hover:font-bold"
              >Reservas
              </Link>
              
            </div>
          )}
          </div>

        {/* <img src="../../../public/Hamburguer Menu.png" alt="" /> */}
        <Link
          to="/logout"
          className="px-4 py-2 bg-gradient-to-r from-orange-dark to-orange-light rounded-md"
        >
          Cerrar Sesion
        </Link>
      </div>
    </div>
  );
}
