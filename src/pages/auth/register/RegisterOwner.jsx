import { useState } from "react";
import { useForm } from "../../../hooks/useForm";
import { motion } from "framer-motion";
import { Global } from "../../../helpers/Global";
import { useNavigate } from "react-router-dom";
import { MsgSuccess, MsgError } from "../../../helpers/MsgNotification";
import { ToastContainer } from "react-toastify";
import { sendEmail } from "../../../services/sendEmail";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import "./RegisterForm.css";

const RegisterOwner = () => {
  const navigate = useNavigate();
  const { form, changed } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const { endpoints, emailJS } = Global;

  const togglePasswordVisibility = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFormData(form);
    try {
      const res = await fetch(`${endpoints.backend}auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.status !== 201) throw new Error(res.statusText);
      MsgSuccess("Usuario creado exitosamente!");
      let mailBody = {
        service_id: emailJS.service_id,
        template_id: emailJS.template_id,
        user_id: emailJS.user_id,
        template_params: {
          user_name: formData.name,
          user_email: formData.email,
        },
      };
      sendEmail(emailJS.mailUrlApi, mailBody);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (e) {
      MsgError("Ha ocurrido un error al crear el usuario.");
      console.error("Error:", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      {/*Fondo GIF en loop*/}
      <div
        className="absolute top-0 left-0 w-full h-full z-[-1]"
        style={{
          backgroundImage: 'url("/public/vid01.gif")', // GIF VIDEITO
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "opacity(1.1)", // opacidad del GIF
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: "rgba(13, 29, 108, 0.75)", // micromalla azul
            backdropFilter: "blur(3px) contrast(1.2)",
          }}
        ></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-[859px] h-auto bg-blue-700 rounded-[25px] p-8 flex flex-col items-center"
        style={{
          background:
            "linear-gradient(to bottom, rgba(26, 57, 210, 1), rgba(13, 29, 108, 1))",
        }}
      >
        <ToastContainer />
        <div className="flex items-center justify-between w-full mb-4">
          <motion.img
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            src="../../../public/logo-picados-ya.png"
            alt="Logo"
            className="w-1/3 h-20"
          />
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-white text-2x2 font-semibold"
            style={{ fontFamily: "Exo, sans-serif", lineHeight: "normal" }}
          >
            ¡Bienvenido! ¡Sumate que esto se pica!
          </motion.h2>
        </div>
        <form
          className="flex flex-col w-full space-y-10"
          onSubmit={handleSubmit}
        >
          <div className="flex w-full space-x-8">
            {/* Columna Izquierda */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-col w-1/2 space-y-6"
            >
              <motion.input
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                type="text"
                name="name"
                placeholder="Nombre"
                className="h-10 px-4 text-lg rounded-[25px] border border-gray-300 shadow-sm shadow-black"
                onChange={changed}
                required
              />
              <motion.input
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                type="text"
                name="lastname"
                placeholder="Apellido"
                className="h-10 px-4 text-lg rounded-[25px] border border-gray-300 shadow-sm shadow-black"
                onChange={changed}
                required
              />
              <motion.input
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                type="text"
                name="complexName"
                placeholder="Nombre del complejo"
                className="h-10 px-4 text-lg rounded-[25px] border border-gray-300 shadow-sm shadow-black"
              />
              <motion.input
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                type="text"
                name="address"
                placeholder="Dirección"
                className="h-10 px-4 text-lg rounded-[25px] border border-gray-300 shadow-sm shadow-black"
              />
              <motion.input
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                type="text"
                name="type"
                placeholder="Tipo de cancha"
                className="h-10 px-4 text-lg rounded-[25px] border border-gray-300 shadow-sm shadow-black"
              />
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.5 }}
                className="relative"
              >
                <input
                  type={showPassword.password ? "text" : "password"}
                  name="password"
                  placeholder=" Contraseña min. 8 caracteres "
                  className="h-10 px-4 text-lg rounded-[25px] border border-gray-300 shadow-sm shadow-black"
                  onChange={changed}
                  required
                />
                <button
                  type="button"
                  className="toggle-password absolute right-4 top-1/2 transform -translate-y-1/2"
                  onClick={() => togglePasswordVisibility("password")}
                  aria-label={
                    showPassword.password
                      ? "Ocultar contraseña"
                      : "Mostrar contraseña"
                  }
                >
                  {showPassword.password ? (
                    <EyeSlashIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  ) : (
                    <EyeIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="relative"
              >
                <input
                  type={showPassword.confirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirmar contraseña"
                  className="h-10 px-4 text-lg rounded-[25px] border border-gray-300 shadow-sm shadow-black"
                  onChange={changed}
                  required
                />
                <button
                  type="button"
                  className="toggle-password absolute right-4 top-1/2 transform -translate-y-1/2"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                  aria-label={
                    showPassword.confirmPassword
                      ? "Ocultar contraseña"
                      : "Mostrar contraseña"
                  }
                >
                  {showPassword.confirmPassword ? (
                    <EyeSlashIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  ) : (
                    <EyeIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="flex justify-center"
              >
                <span className="text-white text-sm cursor-pointer">
                  ¿Ya tienes una cuenta? <strong>Iniciar sesión</strong>
                </span>
              </motion.div>
            </motion.div>
            {/* Columna Derecha */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col w-1/2 space-y-6"
            >
              <motion.input
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                type="email"
                name="email"
                placeholder="Correo Electrónico"
                className="h-10 px-4 text-lg rounded-[25px] border border-gray-300 shadow-sm shadow-black"
                onChange={changed}
                required
                autoComplete="on"
              />
              <motion.input
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                type="text"
                name="country"
                placeholder="País"
                className="h-10 px-4 text-lg rounded-[25px] border border-gray-300 shadow-sm shadow-black"
              />
              <motion.input
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                type="text"
                name="locality"
                placeholder="Barrio / Localidad"
                className="h-10 px-4 text-lg rounded-[25px] border border-gray-300 shadow-sm shadow-black"
              />
              <motion.input
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                type="number"
                name="pricePerHour"
                placeholder="Precio por hora"
                className="h-10 px-4 text-lg rounded-[25px] border border-gray-300 shadow-sm shadow-black"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.5 }}
                className="bg-[rgba(25,32,71,1)] text-white rounded-[10px] rounded-[25px] px-4 py-2 min-w-[170px] shadow-sm shadow-black flex flex-row justify-center items-center"
              >
                <img
                  src="./../../../public/Action.png"
                  alt=""
                  className="pr-4"
                />
                Cargar imagenes
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                type="submit"
                className="h-10 bg-orange-500 text-white text-lg rounded-[25px] shadow-sm shadow-black"
                style={{
                  background:
                    "linear-gradient(to right, rgba(237, 60, 22, 1), rgba(243, 64, 24, 1), rgba(241, 74, 37, 1), rgba(255, 99, 65, 1))",
                }}
              >
                {isLoading ? (
                  <motion.svg
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-5 h-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </motion.svg>
                ) : (
                  "Crear Cuenta"
                )}
              </motion.button>
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="flex justify-center items-center space-x-2 mt-4"
              >
                <input type="checkbox" className="form-checkbox" />
                <span
                  className="text-white text-sm underline cursor-pointer"
                  style={{
                    fontFamily: "Ubuntu, sans-serif",
                    fontSize: "13px",
                    fontWeight: 400,
                    lineHeight: "normal",
                    textDecorationLine: "underline",
                    textDecorationStyle: "solid",
                    textDecorationSkipInk: "none",
                    textDecorationThickness: "auto",
                    textUnderlineOffset: "auto",
                    textUnderlinePosition: "from-font",
                  }}
                >
                  Acepto los Términos y condiciones de privacidad
                </span>
              </motion.div>
            </motion.div>
          </div>
        </form>
        <div className="flex justify-end">
          <p className="text-gray-300 text-xs inline-flex items-center pt-10 space-x-1 ml-auto">
            <span>Copyright ©</span>
            <img
              src="../../../public/image 39.png"
              alt="Logo PicadosYA"
              className="w-62 h-17 pt-1"
            />
            <span>2024. All rights reserved.</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterOwner;
