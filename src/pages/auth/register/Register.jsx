import { useState } from "react";
import { motion } from "framer-motion";
import { Global } from "../../../helpers/Global";
import { useAuth } from "../../../hooks";
import { ToastContainer, toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
export function Register() {
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "12345678",
    role: "client", // valor inicial
    accepted_terms: false,
  });
  const [errorMessage, setErrorMessage] = useState("");

  // Función para manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Función para enviar los datos al servidor
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Validación de contraseña y términos
    if (formData.password.length < 8) {
      setErrorMessage("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
      return;
    }
    if (!formData.accepted_terms) {
      setErrorMessage("Debes aceptar los Términos y condiciones.");
      return;
    }

    // Envío de datos al endpoint
    try {
      const response = await fetch(`${Global.endpoints.backend}users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          role: formData.role,
          accepted_terms: formData.accepted_terms,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al registrar el usuario");
      }

      // Si el registro es exitoso, limpiar el formulario o redirigir
      setErrorMessage("");
      let user = await response.json() 
       localStorage.setItem(
        "user",
        JSON.stringify({
          firstname: user.first_name,
          lastname: user.last_name,
          email: user.email,
          phone: user.phone,
          role: user.role,
        })
      );

      setAuth({
          firstname: user.first_name,
          lastname: user.last_name,
          email: user.email,
          phone: user.phone,
          role: user.role,
        });
      setLoading(false);
      toast.success("Usuario creado exitosamente");
      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center relative">
      <ToastContainer />
      {/* Fondo GIF en loop */}
      <div
        className="absolute top-0 left-0 w-full h-full z-[-1]"
        style={{
          backgroundImage:
            'url("https://raw.githubusercontent.com/woohdang/fotos-py/main/vid01.gif")', // GIF VIDEITO
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "opacity(1.1)",
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: "rgba(13, 29, 108, 0.75)",
            backdropFilter: "blur(3px) contrast(1.2)",
          }}
        ></div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-[487px] h-auto bg-blue-700 rounded-[25px] flex flex-col items-center p-6"
        style={{
          background: "linear-gradient(to bottom, rgba(26, 57, 210, 1), rgba(13, 29, 108, 1))",
        }}
      >
        <div className="flex w-full items-center justify-between mb-4">
          <motion.img
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            src="https://raw.githubusercontent.com/woohdang/fotos-py/main/Logo.png"
            alt="Logo"
            className="w-1/2 h-[64px]"
          />
        </div>
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-white text-2xl mb-8 text-center"
          style={{ fontFamily: "Exo, sans-serif", lineHeight: "normal" }}
        >
          ¡Bienvenido! ¡Sumate que esto se pica!
        </motion.h3>
        <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md mb-5 space-y-6">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex gap-4"
          >
            <input
              type="text"
              name="first_name"
              placeholder="Nombre"
              value={formData.first_name}
              onChange={handleChange}
              className="flex-1 h-10 px-4 text-lg rounded-lg border border-gray-300 shadow-sm shadow-black"
            />
            <input
              type="text"
              name="last_name"
              placeholder="Apellido"
              value={formData.last_name}
              onChange={handleChange}
              className="flex-1 h-10 px-4 text-lg rounded-lg border border-gray-300 shadow-sm shadow-black"
            />
          </motion.div>
          <motion.input
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            className="h-10 px-4 text-lg rounded-lg border border-gray-300 shadow-sm shadow-black"
          />
          <motion.input
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            className="h-10 px-4 text-lg rounded-lg border border-gray-300 shadow-sm shadow-black"
          />
          <motion.input
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            type="password"
            name="confirmPassword"
            placeholder="Confirmar contraseña"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="h-10 px-4 text-lg rounded-lg border border-gray-300 shadow-sm shadow-black"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            type="submit"
            className="h-12 bg-orange-500 text-white text-lg rounded-[25px] mt-4 shadow-sm shadow-black"
            style={{
              background:
                "linear-gradient(to right, rgba(237, 60, 22, 1), rgba(255, 73, 28, 1), rgba(238, 75, 39, 1), rgba(255, 99, 65, 1))",
            }}
          >
            {loading ? "Cargando..." : "Crear cuenta"}
            
          </motion.button>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="flex justify-center items-center space-x-2"
          >
            <input
              type="checkbox"
              name="accepted_terms"
              checked={formData.accepted_terms}
              onChange={handleChange}
              className="form-checkbox"
            />
            <span className="text-white text-sm underline cursor-pointer">
              Acepto los Términos y condiciones de privacidad
            </span>
          </motion.div>
        </form>
        {errorMessage && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-sm mt-2"
          >
            {errorMessage}
          </motion.p>
        )}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="text-white mt-4 text-base"
        >
          ¿Ya tienes una cuenta? <span className="cursor-pointer"><strong>Iniciar sesión</strong></span>
        </motion.p>
      </motion.div>
    </div>
  );
}

export default Register;
