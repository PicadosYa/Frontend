import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Global } from "../../../helpers/Global";
import { MsgSuccess, MsgError } from "../../../helpers/MsgNotification";
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode"; //npm install jwt-decode
import "./RegisterForm.css";

const UpdateUser = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { endpoints } = Global;

  const [formData, setFormData] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    position_player: "",
    team_name: "",
    age: "",
    profile_picture_url: "",
  });
  const [isLoading, setIsLoading] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      MsgError("No tienes un token válido. Por favor, inicia sesión.");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(`${endpoints.backend}users/update-user-profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al actualizar el perfil");
      }

      MsgSuccess("Perfil actualizado correctamente.");
      setTimeout(() => navigate("/"), 2000);
    } catch (e) {
      MsgError(e.message || "Ha ocurrido un error al actualizar el perfil.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#22358b] to-[#2c45b4] p-4">
      <ToastContainer />
      <form
        className="space-y-8 bg-gradient-to-r from-[#2c45b4] to-[#22358b] p-10 rounded-xl shadow-2xl"
        onSubmit={handleSubmit}
      >
        <header className="flex justify-between items-center">
          <motion.img
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            src={Global.images.logoSB}
            alt="Logo de la Empresa"
            className="h-24 w-auto"
          />
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-1 font-bold text-white"
          >
            Actualiza tu perfil
          </motion.h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="first_name"
            placeholder="Nombre"
            value={formData.first_name}
            onChange={handleChange}
            className="px-3 py-2 rounded-lg w-full"
            required
          />
          <input
            type="text"
            name="last_name"
            placeholder="Apellido"
            value={formData.last_name}
            onChange={handleChange}
            className="px-3 py-2 rounded-lg w-full"
            required
          />
        </div>

        <input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          value={formData.email}
          onChange={handleChange}
          className="px-3 py-2 rounded-lg w-full"
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Teléfono"
          value={formData.phone}
          onChange={handleChange}
          className="px-3 py-2 rounded-lg w-full"
          required
        />

        <input
          type="text"
          name="position_player"
          placeholder="Posición de jugador"
          value={formData.position_player}
          onChange={handleChange}
          className="px-3 py-2 rounded-lg w-full"
          required
        />

        <input
          type="text"
          name="team_name"
          placeholder="Nombre del equipo"
          value={formData.team_name}
          onChange={handleChange}
          className="px-3 py-2 rounded-lg w-full"
          required
        />

        <input
          type="number"
          name="age"
          placeholder="Edad"
          value={formData.age}
          onChange={handleChange}
          className="px-3 py-2 rounded-lg w-full"
          required
        />

        <input
          type="text"
          name="profile_picture_url"
          placeholder="URL de la foto de perfil"
          value={formData.profile_picture_url}
          onChange={handleChange}
          className="px-3 py-2 rounded-lg w-full"
          required
        />

        <motion.button
          whileHover={{ scale: !isLoading ? 1.05 : 1 }}
          whileTap={{ scale: !isLoading ? 0.95 : 1 }}
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 text-white font-bold rounded-lg 
            ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-[#eb2a00] to-[#ff471f]"}`}
        >
          {isLoading ? "Cargando..." : "Confirmar"}
        </motion.button>
      </form>
    </main>
  );
};

export default UpdateUser;
