import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MsgSuccess, MsgError } from "../../helpers/MsgNotification";
import { jwtDecode } from "jwt-decode";
import ReservationPopup from './reservationPopup/organisms/ReservationPopup';


export function MyProfile({ onClose }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [showReservationPopup, setShowReservationPopup] = useState(false);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token); 
        setFormData((prev) => ({
          ...prev,
          id: decodedToken.id || "", 
          first_name: decodedToken.first_name || "",
          last_name: decodedToken.last_name || "",
          email: decodedToken.email || "",
          phone: decodedToken.phone || "",
        }));
      } catch (e) {
        MsgError("Error al decodificar el token.");
        console.error("Token decoding error:", e);
      }
    }
  }, [token]);
  const [formData, setFormData] = useState({
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    position_player: "",
    team_name: "",
    age: 0,
    profile_picture_url: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    console.log(e)
    if (!token) {
      MsgError("No tienes un token válido. Por favor, inicia sesión.");
      return;
    }
    try {
      const res = await fetch(`localhost:8080/api/users/update-user-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al actualizar el perfil");
      }

      MsgSuccess("Perfil actualizado correctamente.");
    } catch (e) {
      MsgError(e.message || "Ha ocurrido un error al actualizar el perfil.");
    }
    console.log("Datos enviados:", formData);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 ">
      
      <div
        className="fixed inset-0 bg-black opacity-50 transition-opacity duration-300"

      ></div>
      <div
        className="z-40 flex flex-col w-[600px] h-[720px] rounded-[25px] p-10 "
        style={{
          background:
            "linear-gradient(to bottom, rgba(26, 57, 210, 1), rgba(13, 29, 108, 1))",
        }}
      >
        {/* Encabezado */}
        <div className="flex items-center justify-end ">
          <img
            src="./../../../public/logo-picYasvg-svg 4.png"
            alt="Logo"
            className="w-12 h-12"
          />{" "}
          {/* Ruta de logo */}
          <h2 className="text-white text-xl font-semibold">Mi Perfil</h2>
        </div>
        <form onSubmit={(e) => {
          e.preventDefault();
          console.log("Formulario enviado");
          handleSubmit(e);
        }} method="PUT">
        {/* Bloque de imagen de perfil */}
        <div className="flex items-center mb-6 -mt-8">
          <div className="flex flex-col items-center mr-6">
            <div className="w-40 h-40 bg-gray-300 rounded-full flex justify-center items-center">
              <img
                src="./../../../public/Proyecto nuevo 1.png"
                alt="Profile"
                className="w-full h-full rounded-full"
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="text-white">Edad</label>
              <div className="flex flex-row w-full gap-4">
                <input
                  type="text"
                  className="min-w-[70px] h-10 px-4 rounded-lg border border-gray-300 shadow-sm shadow-black"
                  value={formData.age}
                  onChange={handleChange}
                />
                <button className="bg-[rgba(25,32,71,1)] text-white rounded-[25px] px-4 py-2 min-w-[170px] shadow-sm shadow-black flex flex-row justify-center items-center">
                  <img
                    src="./../../../public/Action.png"
                    alt=""
                    className="pr-4"
                    //value={formData.profile_picture_url}
                    //onChange={handleChange}
                  />
                  Cargar imagen
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-8 mt-16 w-full">
            <div className="flex flex-col w-full">
              <label className="text-white">Nombre</label>
              <input
                type="text"
                name="first_name"
                onChange={handleChange}
                className="w-full h-10 px-4 rounded-lg border border-gray-300 shadow-sm shadow-black"
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="text-white">Apellido</label>
              <input
                type="text"
                value={formData.last_name}
                onChange={handleChange}
                className="w-full h-10 px-4 rounded-lg border border-gray-300 shadow-sm shadow-black"
              />
            </div>
          </div>
        </div>

        {/* Bloque de contacto */}
        <div className="flex space-x-4 mb-6">
          <div className="flex flex-col w-2/3">
            <label className="text-white">Correo</label>
            <input
              type="email"
              value={formData.phone}
              onChange={handleChange}
              className="w-full h-10 px-4 rounded-lg border border-gray-300 shadow-sm shadow-black"
            />
          </div>
           
           <div className="flex flex-row gap-4">
            {/*
            <div className="flex flex-col" style={{ maxWidth: "85px" }}>
              <label className="text-white">País</label>
              <input
                type="text"
                placeholder="País"
                className="w-full h-10 px-2 rounded-lg border border-gray-300 shadow-sm shadow-black"
              />
            </div>*/}
            <div className="flex flex-col flex-grow">
              <label className="text-white">Teléfono</label>
              <input
                type="tel"
                value={formData.position_player}
                onChange={handleChange}
                className="w-full h-10 px-4 rounded-[25px] border border-gray-300 shadow-sm shadow-black"
              />
            </div>
          </div>
        </div>

        {/* Bloque de equipo y posición */}
          <div className="flex space-x-6 mb-6">
            <div className="flex flex-col w-1/2">
              <label className="text-white">Equipo</label>
              <input
                type="text"
                name="team_name"
                value={formData.team_name}
                onChange={handleChange}
                className="h-10 px-4 rounded-lg border border-gray-300 mb-6 shadow-sm shadow-black"
              />
              <button className="bg-[rgba(25,32,71,1)] text-white rounded-[25px] min-w-[148px] px-4 py-2 shadow-sm shadow-black flex flex-row justify-center items-center">
                <img src="./../../../public/Action.png" alt="" className="pr-4" />
                Cargar escudo
              </button>
            </div>
            <div className="flex flex-col w-1/2">
              <label className="text-white">Posición</label>
              <input
                type="text"
                name="position_player"
                value={formData.position_player}
                onChange={handleChange}
                className="h-10 px-4 rounded-lg border border-gray-300 mb-6 shadow-sm shadow-black"
              />
             <button className="bg-[rgba(25,32,71,1)] text-white rounded-[25px] min-w-[148px] px-4 py-2 shadow-sm shadow-black"
                onClick={() => setShowReservationPopup(true)}>
                Histórico Reservas
            </button>
            </div>
          </div>

          {/* Botones de acción */}
        <div className="flex justify-between mb-4 mt-10">
          <button className="w-[45%] h-10 bg-[rgba(25,32,71,1)] text-white rounded-[25px] border-orange-600 shadow-sm shadow-black">
            Cancelar
          </button>
          <button
            className="w-[45%] h-10 bg-orange-500 text-white rounded-[25px] shadow-sm shadow-black"
            style={{
              background:
                "linear-gradient(to right, rgba(237, 60, 22, 1), rgba(255, 73, 28, 1), rgba(238, 75, 39, 1), rgba(255, 99, 65, 1))",
            }}
            type="submit"
          >
            Confirmar
          </button>
        </div>
        {/* <button className="absolute top-2 right-2 text-white" onClick={onClose}>
          &times;
        </button>*/}
        </form>
        
      </div>
         {/* Render del Popup */}
         {showReservationPopup && (
          <ReservationPopup onClose={() => setShowReservationPopup(false)} />
        )}
    </div>
  );
}
