import { Link, useLocation } from "react-router-dom";
import UserProfile from "./UserProfile";

/**************************************************************/
/***************  CLIENT ADMIN SIDEBAR COMPONENT **************/
/**************************************************************/

const AdminSideBar = () => {
  const location = useLocation();

  const navs = [
    { name: "Ingresar reserva", icon: "", to: "", class: "bg-gradient-to-r from-[#ED3C16] via-[#EF4923] to-[#F75632] text-white" },
    { name: "Reservas", icon: "", to: "/canchero/reservas", class: "" },
    { name: "Mis ventas", icon: "", to: "", class: "" },
    { name: "Mis canchas", icon: "", to: "", class: "" },
    { name: "Mis equipos", icon: "", to: "", class: "" },
  ];

  const navsControl = [
    { name: "Mi perfil", icon: "", to: "/canchero/perfil", class: "" },
    { name: "Cerrar Sesion", icon: "", to: "/canchero/logout", class: "bg-[#515151] text-white" },
  ];

  return (
    <div className="w-64 bg-[#181818] min-h-full pt-10 font-semibold px-4">
      <UserProfile />
      <section className="flex flex-col">
        {navs.map((nav, index) => {
          return (
            <Link
              key={index}
              to={nav.to}
              className={`flex justify-evenly items-center w-full h-[43px] rounded-3xl mt-5 border-transparent cursor-pointer transition-colors duration-300 ease-in-out text-base mx-auto shadow-md hover:bg-gray-200 hover:text-gray-800 ${nav.class} ${
                location.pathname == nav.to ? "text-white" : "text-[#515151]"
              }`}
            >
              {nav.name}
            </Link>
          );
        })}
      </section>
      <section className="mt-24">
        {navsControl.map((nav, index) => {
          return (
            <Link
              key={index}
              to={nav.to}
              className={`flex justify-evenly items-center w-full h-[43px] rounded-3xl mt-5 border-transparent cursor-pointer transition-colors duration-300 ease-in-out text-[0.9rem] mx-auto shadow-md hover:bg-gray-200 hover:text-gray-800 ${nav.class} ${
                location.pathname == nav.to ? "text-white" : "text-[#515151]"
              }`}
            >
              {nav.name}
            </Link>
          );
        })}
      </section>
    </div>
  );
};

export default AdminSideBar;
