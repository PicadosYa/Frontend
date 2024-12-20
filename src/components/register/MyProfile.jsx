// import React from 'react';
import { useState, useEffect } from "react";
import { MsgSuccess, MsgError } from "../../helpers/MsgNotification";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Global } from "../../helpers/Global";
import PicadosYaLoader from "../../assets/rayo-picados-ya-loader";
import { useUpdateUserProfile } from "../../services/UsersService";
import CustomFileInput from "../inputs/CustomFileInput";
import { useAuth } from "../../hooks";
import { ProfileIcon } from "./HeaderSession";
import { toast, ToastContainer } from "react-toastify";

// este si es el component de actualizar user
export function MyProfile({ setIsUserProfileOpen }) {
  const token = localStorage.getItem("token");
  const {authUser} = useAuth();
  const updateProfile = useUpdateUserProfile();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
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
    profilePicture: null,
  });

  useEffect(() => {
    const storedProfile = localStorage.getItem("userProfile");

    if (storedProfile) {
      setFormData(JSON.parse(storedProfile));
    } else if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setFormData((prev) => ({
          ...prev,
          id: decodedToken.id || "",
          first_name: decodedToken.first_name || "",
          last_name: decodedToken.last_name || "",
          email: decodedToken.email || "",
          phone: decodedToken.phone || "",
          position_player: decodedToken.position_player || "",
          team_name: decodedToken.team_name || "",
          age: decodedToken.age || 0,
          profile_picture_url: decodedToken.profile_picture_url || "",
        }));
      } catch (e) {
        MsgError("Error al decodificar el token.");
        console.error("Token decoding error:", e);
      }
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "age" ? parseInt(value, 10) || "" : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!token) {
      setIsLoading(false);
      navigate("/login");
      MsgError("No tienes un token válido. Por favor, inicia sesión.");
      return;
    }

    updateProfile.mutate(
      {
        userData: formData,
        profilePicture: formData.profilePicture,
      },
      {
        onSuccess: (data) => {
          setIsLoading(false);
          MsgSuccess("Perfil actualizado correctamente.");
          const token = data.token;
          localStorage.setItem("token", JSON.stringify(token));
          authUser()
          //window.location.reload();
        },
        onError: (error) => {
          setIsLoading(false);
          if (error.status === 401) {
            navigate("/login");
          } else if (error.status === 404) {
            navigate("/register");
          } else {
            toast.error("No se ha podido actualizar el perfil. Intentalo de nuevo mas tarde")
          }
        },
      }
    );

    console.log("Datos enviados:", formData);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <ToastContainer />
      <div className="fixed inset-0 bg-black opacity-50 transition-opacity duration-300"></div>
      <div
        className="z-40 flex flex-col w-[600px] h-[720px] rounded-[25px] p-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(26, 57, 210, 1), rgba(13, 29, 108, 1))",
        }}
      >
        {/* Encabezado */}
        <div className="flex items-center justify-end">
          <img
            src="/logo-picYasvg-svg 4.png"
            alt="Logo"
            className="w-12 h-12"
          />
          <h2 className="text-white text-xl font-semibold">Mi Perfil</h2>
        </div>
        <form onSubmit={handleSubmit} method="PUT">
          <div className="flex items-center mb-6 -mt-8">
            <div className="flex flex-col items-center mr-6">
              <div className="w-40 h-40 bg-gray-300 rounded-full flex justify-center items-center">
                {/* <img
                  src={
                   
                  }
                  alt="Profile"
                  className="w-full h-full rounded-full"
                /> */}
                 <ProfileIcon auth={{firstname: formData.first_name
                    , lastname: formData.last_name
                    , profile_picture_url: formData.profile_picture_url
                    }} noAction={true}/>
              </div>
              <div className="flex flex-col w-full">
                <label className="text-white">Edad</label>
                <div className="flex flex-row w-full gap-4">
                  <input
                    type="number"
                    name="age"
                    className="min-w-[70px] h-10 px-4 rounded-lg border border-gray-300 shadow-sm shadow-black"
                    value={formData.age}
                    onChange={handleChange}
                    style={{
                      width: "80px",
                      WebkitAppearance: "none",
                    }}
                  />
                  {/* <input className="bg-[rgba(25,32,71,1)] text-white rounded-[25px] px-4 py-2 min-w-[170px] shadow-sm shadow-black flex flex-row justify-center items-center" type="file">
                    <img
                      src="/Action.png"
                      alt=""
                      className="pr-4"
                    />
                    Cargar imagen
                  </input> */}
                  <CustomFileInput
                    accept="image/*"
                    multiple={false}
                    onFileChange={(selectedFiles) => {
                      const reader = new FileReader();
                      reader.onload = () => {
                        setFormData((prev) => ({
                          ...prev,
                          profile_picture_url: reader.result,
                          profilePicture: selectedFiles[0],
                        }));
                      };
                      reader.readAsDataURL(selectedFiles[0]);
                    }}
                    className="bg-[rgba(25,32,71,1)] text-white rounded-[25px] px-4 py-2 min-w-[170px] shadow-sm shadow-black flex flex-row justify-center items-center relative cursor-pointer"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-8 mt-16 w-full">
              <div className="flex flex-col w-full">
                <label className="text-white">Nombre</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="w-full h-10 px-4 rounded-lg border border-gray-300 shadow-sm shadow-black"
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-white">Apellido</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="w-full h-10 px-4 rounded-lg border border-gray-300 shadow-sm shadow-black"
                />
              </div>
            </div>
          </div>

          <div className="flex space-x-4 mb-6">
            <div className="flex flex-col w-2/3">
              <label className="text-white">Correo</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-10 px-4 rounded-lg border border-gray-300 shadow-sm shadow-black"
              />
            </div>
            <div className="flex flex-row gap-4">
              <div className="flex flex-col flex-grow">
                <label className="text-white">Teléfono</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full h-10 px-4 rounded-[25px] border border-gray-300 shadow-sm shadow-black"
                />
              </div>
            </div>
          </div>

          <div className="flex space-x-6 mb-6">
            <div className="flex flex-col w-1/2">
              <label className="text-white">Equipo</label>
              <input
                type="text"
                name="team_name"
                placeholder="Equipo"
                value={formData.team_name}
                onChange={handleChange}
                className="h-10 px-4 rounded-lg border border-gray-300 mb-6 shadow-sm shadow-black"
              />
              <button className="bg-[rgba(25,32,71,1)] text-white rounded-[25px] min-w-[148px] px-4 py-2 shadow-sm shadow-black flex flex-row justify-center items-center">
                <img
                  src="./../../../public/Action.png"
                  alt=""
                  className="pr-4"
                />
                Cargar escudo
              </button>
            </div>
            <div className="flex flex-col w-1/2">
              <label className="text-white">Posición</label>
              <input
                type="text"
                placeholder="Posición"
                name="position_player"
                value={formData.position_player}
                onChange={handleChange}
                className="h-10 px-4 rounded-lg border border-gray-300 mb-6 shadow-sm shadow-black"
              />
              <button className="bg-[rgba(25,32,71,1)] text-white rounded-[25px] min-w-[148px] px-4 py-2 shadow-sm shadow-black">
                Histórico Reservas
              </button>
            </div>
          </div>

          <div className="flex justify-between mb-4 mt-10">
            <button
              className="w-[45%] h-10 bg-[rgba(25,32,71,1)] text-white rounded-[25px] border-orange-600 shadow-sm shadow-black"
              onClick={(e) => {
                setIsUserProfileOpen(false);
              }}
            >
              Cancelar
            </button>
            <button
              className="w-[45%] flex justify-center items-center h-10 bg-orange-500 text-white rounded-[25px] shadow-sm shadow-black"
              style={{
                background:
                  "linear-gradient(to right, rgba(237, 60, 22, 1), rgba(255, 73, 28, 1), rgba(238, 75, 39, 1), rgba(255, 99, 65, 1))",
              }}
              type="submit"
            >
              {isLoading ? <PicadosYaLoader className="h-full" /> : "Confirmar"}
            </button>
          </div>

          <button
            className="absolute top-2 right-2 text-white"
            onClick={() => setIsUserProfileOpen(false)}
          >
            &times;
          </button>
        </form>
      </div>
    </div>
  );
}
