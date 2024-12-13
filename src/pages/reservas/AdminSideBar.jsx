import { Link, useLocation } from "react-router-dom";
import UserProfile from "./UserProfile";
import { BackTo } from "../../helpers/BackTo";
import { MdOutlineCalendarMonth, MdLogout, MdDashboard } from "react-icons/md";
import { IoSpeedometerOutline } from "react-icons/io5";
import { AiOutlineShop, AiOutlineTeam } from "react-icons/ai";
import { CiCirclePlus } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa";
import { ProfileIcon } from "@/components/register";
import { useAuth } from "@/hooks";

/**************************************************************/
/***************  CLIENT ADMIN SIDEBAR COMPONENT **************/
/**************************************************************/
const options = {
  General: "/canchero",
  Reservas: "/canchero/reservas",
  "Mis ventas": "/canchero/ventas",
  "Mis canchas": "/canchero/canchas",
};

const AdminSideBar = () => {
  const location = useLocation();
  const {auth} = useAuth();

  const navs = [
    {
      name: "Ingresar reserva",
      icon: CiCirclePlus,
      to: "",
      class:
        "bg-gradient-to-r from-[#ED3C16] via-[#EF4923] to-[#F75632] text-white",
    },
     {
      name: "General",
      icon: MdDashboard,
      to: options.General,
      class: "",
    },
    {
      name: "Reservas",
      icon: MdOutlineCalendarMonth,
      to: options.Reservas,
      class: "",
    },
    { name: "Mis ventas", icon: IoSpeedometerOutline, to: options["Mis ventas"], class: "" },
    { name: "Mis canchas", icon: AiOutlineShop, to: options["Mis canchas"], class: "" },
    // { name: "Mis equipos", icon: AiOutlineTeam, to: "", class: "" },
  ];

  const navsControl = [
    { name: "Mi perfil", icon: "", to: "", class: "" },
    {
      name: "Cerrar Sesion",
      icon: MdLogout,
      to: "/logout",
      class: "bg-[#515151] text-white",
    },
  ];

  return (
    <div className="w-64 bg-[#181818] h-full pt-10 font-semibold px-4">
      <UserProfile />
      <section className="flex flex-col items-center">
        <button onClick={BackTo} className="flex items-center text-white mb-2">
          <FaArrowLeft className="mr-4" />
          Volver
        </button>
        {navs.map((nav, index) => {
          return (
            <Link
              key={index}
              to={nav.to}
              className={`flex justify-evenly items-center w-full h-[43px] rounded-3xl mt-5 border-transparent cursor-pointer transition-colors duration-300 ease-in-out text-base mx-auto shadow-md hover:bg-gray-200 hover:text-gray-800 ${
                nav.class
              } ${
                location.pathname == nav.to ? "text-white" : "text-[#515151]"
              }`}
            >
              {nav.icon && <nav.icon className="text-xl" />}
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
              className={`flex justify-evenly items-center w-full h-[43px] rounded-3xl mt-5 border-transparent cursor-pointer transition-colors duration-300 ease-in-out text-[0.9rem] mx-auto shadow-md hover:bg-gray-200 hover:text-gray-800 ${
                nav.class
              } ${
                location.pathname == nav.to ? "text-white" : "text-[#515151]"
              }`}
            >
              {nav.icon && <nav.icon className="text-xl" />}
              {nav.name}
            </Link>
          );
        })}
      </section>
    </div>
  );
};

export default AdminSideBar;
