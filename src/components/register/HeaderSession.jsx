import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Global } from "../../helpers/Global";
import { MyProfile } from "./MyProfile";
import { useEffect } from "react";

export function HeaderSession({ auth }) {
  const [firstName, setFirstName] = useState("");
  const storedProfile = localStorage.getItem("userProfile");
  useEffect(() => {
    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile) {
      const userProfileNoParsed = JSON.parse(storedProfile);
      setFirstName(userProfileNoParsed.first_name); 
    } else if (auth.firstname) {
      setFirstName(auth.firstname); 
    }
  }, []);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false)
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false)
  return (
    <div className="mx-5 bg-transparent rounded-[25px] p-4 flex justify-end items-center">
      <div
        className="flex space-x-6 items-center text-white"
        style={{ fontFamily: "Exo, sans-serif", lineHeight: "normal" }}
      >
        <span>{firstName ? `Hola!, ${firstName}` : `Hola!, ${auth.firstname}`}</span>
        <div className="w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center relative">
          <img
            src={auth.profile_picture_url ? auth.profile_picture_url : "/Proyecto nuevo 1.png"}
            alt="Profile"
            className="w-full h-full rounded-full cursor-pointer"
            onClick={()=> setIsUserModalOpen(!isUserModalOpen)}
          />
          {isUserModalOpen && (

            <div className="absolute top-[100%] w-44 z-10 bg-dark-blue rounded-md flex flex-col gap-2 p-2">
              <h4 className="text-center font-bold">{firstName ? `Hola!, ${firstName}` : `Hola!, ${auth.firstname}`}</h4>
              <button className="hover:font-bold text-left"
                onClick={() => setIsUserProfileOpen(!isUserProfileOpen)}
              >Actualizar perfil</button>
              {auth.role === "client" ? null : (
                <Link
                  to="reservas"
                  className="hover:font-bold"
                >Reservas
                </Link>
              )}
              
            </div>
          )}
          </div>

        {/* <img src="../../../public/Hamburguer Menu.png" alt="" /> */}
        {auth.role == Global.rolesTypes.field ? (
          <Link to="/canchero/reservas">Mis Reservas</Link>
        ) : null}
        {/* <Link onClick={btn[0].action}>{btn[0].name}</Link> */}
        <Link
          to="/logout"
          className="px-4 py-2 bg-gradient-to-r from-orange-dark to-orange-light rounded-md"
        >
          Cerrar Sesion
        </Link>
      </div>
      {isUserProfileOpen &&(

        <div className="fixed top-0 left-0 z-10 flex justify-center items-center min-w-full bg-dark-blue-opacity ">
            <MyProfile setIsUserProfileOpen={setIsUserProfileOpen} />
        </div>
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
