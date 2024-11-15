import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Global } from "../../helpers/Global";
import { MyProfile } from "../../pages/user/MyProfile";

export function HeaderSession({ auth }) {
  const [isModalOpenProfile, setIsModalOpenProfile] = useState(false);
  const btn = [
    {
      name: "Mi Perfil",
      path: "/perfil",
      action: () => setIsModalOpenProfile(true),
    },
  ];
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
        {auth.role == Global.rolesTypes.field ? (
          <Link to="/canchero/reservas">Mis Reservas</Link>
        ) : null}
        <Link onClick={btn[0].action}>{btn[0].name}</Link>
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
      {isModalOpenProfile && (
        <MyProfile onClose={() => setIsModalOpenProfile(false)} />
      )}
    </div>
  );
}

// {config && (
//   <>
//     {auth.role == Global.rolesTypes.field ? (
//       <>
//         <Link className="clone-user" to="/canchero/logout">
//           Cerrar sesión
//         </Link>
//         <Link to={"/canchero/perfil"}>Mi Perfil</Link>
//         <Link to={"/canchero/reservas"}>Mis Reservas</Link>
//       </>
//     ) : (
//       <>
//         <Link className="clone-user" to="/admin/logout">
//           Cerrar sesión
//         </Link>
//         {/* <Link to={"/canchero/perfil"}>Mi Perfil</Link>
//   <Link to={"/canchero/reservas"}>Mis Reservas</Link> */}
//       </>
//     )}
//   </>
// )}
