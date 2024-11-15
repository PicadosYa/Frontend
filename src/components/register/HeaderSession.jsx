import React from "react";
import { Link } from "react-router-dom";
import { Global } from "../../helpers/Global";

export function HeaderSession({ auth }) {
  return (
    <div className="mx-5 bg-transparent rounded-[25px] p-4 flex justify-end items-center">
      <div
        className="flex space-x-6 items-center text-white"
        style={{ fontFamily: "Exo, sans-serif", lineHeight: "normal" }}
      >
        <span>{`Hola!, ${auth.firstname}`}</span>
        <div className="w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center">
          <img
            src="./../../../public/Proyecto nuevo 1.png"
            alt="Profile"
            className="w-full h-full rounded-full"
          />
        </div>

        {/* <img src="../../../public/Hamburguer Menu.png" alt="" /> */}
        <Link
          to={
            auth.role == Global.rolesTypes.field
              ? "/canchero/logout"
              : "/admin/logout"
          }
        >
          Cerrar Sesion
        </Link>
      </div>
    </div>
  );
}
