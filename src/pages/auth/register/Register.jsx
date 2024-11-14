import { useState } from "react";
import { useForm } from "../../../hooks/useForm";
import { motion } from "framer-motion";
import { Global } from "../../../helpers/Global";
import { Link, useNavigate } from "react-router-dom";
import { MsgSuccess, MsgError } from "../../../helpers/MsgNotification";
import { ToastContainer } from "react-toastify";
import { sendEmail } from "../../../services/sendEmail";
import "./RegisterForm.css";

const Register = () => {
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
      <div className="w-[859px] h-auto bg-blue-700 rounded-[25px] p-8 flex flex-col items-center" style={{ background: "linear-gradient(to bottom, rgba(26, 57, 210, 1), rgba(13, 29, 108, 1))" }}>
        <ToastContainer />
        <div className="flex items-center justify-between w-full mb-4">
          <img src="../../../public/logo-picados-ya.png" alt="Logo" className="w-1/3 h-20" />
          <h2 className="text-white text-2x2 font-semibold" style={{ fontFamily: "Exo, sans-serif", lineHeight: "normal" }}>
            ¡Bienvenido! ¡Sumate que esto se pica!
          </h2>
        </div>
        <form className="flex flex-col w-full space-y-10" onSubmit={handleSubmit}>
          <div className="flex w-full space-x-8">
            {/* Columna Izquierda */}
            <div className="flex flex-col w-1/2 space-y-6">
              <input
                type="text"
                name="name"
                placeholder="Nombre"
                className="h-10 px-4 text-lg rounded-[25px] border border-gray-300 shadow-sm shadow-black"
                onChange={changed}
                required
              />
              <input
                type="text"
                name="lastname"
                placeholder="Apellido"
                className="h-10 px-4 text-lg rounded-[25px] border border-gray-300 shadow-sm shadow-black"
                onChange={changed}
                required
              />
              <input
                type="text"
                name="complexName"
                placeholder="Nombre del complejo"
                className="h-10 px-4 text-lg rounded-[25px] border border-gray-300 shadow-sm shadow-black"
              />
              <input
                type="text"
                name="address"
                placeholder="Dirección"
                className="h-10 px-4 text-lg rounded-[25px] border border-gray-300 shadow-sm shadow-black"
              />
              <input
                type="text"
                name="type"
                placeholder="Tipo"
                className="h-10 px-4 text-lg rounded-[25px] border border-gray-300 shadow-sm shadow-black"
              />
              <div className="relative">
                <input
                  type={showPassword.password ? "text" : "password"}
                  name="password"
                  placeholder="Escribe una contraseña min, 8 caracteres"
                  className="h-10 px-4 text-lg rounded-[25px] border border-gray-300 shadow-sm shadow-black"
                  onChange={changed}
                  required
                />
                <button
                  type="button"
                  className="toggle-password absolute right-4 top-1/2 transform -translate-y-1/2"
                  onClick={() => togglePasswordVisibility("password")}
                >
                  <img src="../../../public/eye-icon-gray.png" alt="Toggle Password Visibility" className="w-5 h-5" />
                </button>
              </div>
            </div>
            {/* Columna Derecha */}
            <div className="flex flex-col w-1/2 space-y-6">
              <input
                type="email"
                name="email"
                placeholder="Correo Electrónico"
                className="h-10 px-4 text-lg rounded-[25px] border border-gray-300 shadow-sm shadow-black"
                onChange={changed}
                required
                autoComplete="on"
              />
              <input
                type="text"
                name="country"
                placeholder="País"
                className="h-10 px-4 text-lg rounded-[25px] border border-gray-300 shadow-sm shadow-black"
              />
              <input
                type="text"
                name="locality"
                placeholder="Barrio / Localidad"
                className="h-10 px-4 text-lg rounded-[25px] border border-gray-300 shadow-sm shadow-black"
              />
              <input
                type="number"
                name="pricePerHour"
                placeholder="Precio por hora"
                className="h-10 px-4 text-lg rounded-[25px] border border-gray-300 shadow-sm shadow-black"
              />
              <div className="relative">
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
                >
                  <img src="../../../public/eye-icon-gray.png" alt="Toggle Password Visibility" className="w-5 h-5" />
                </button>
              </div>
              <button
                className="bg-[rgba(25,32,71,1)] text-white rounded-[10px] rounded-[25px] px-4 py-2 min-w-[170px] shadow-sm shadow-black flex flex-row justify-center items-center"
              >
                <img src='./../../../public/Action.png' alt="" className="pr-4" />Cargar imagenes
              </button>
              <button
                type="submit"
                className="h-10 bg-orange-500 text-white text-lg rounded-[25px] shadow-sm shadow-black"
                style={{
                  background: "linear-gradient(to right, rgba(237, 60, 22, 1), rgba(243, 64, 24, 1), rgba(241, 74, 37, 1), rgba(255, 99, 65, 1))",
                }}
              >
                {isLoading ? (
                  <motion.svg
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
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
              </button>
            </div>
          </div>
          <div className="flex justify-around w-full mt-4 items-center">
            <div className="flex justify-center">
              <span className="text-white text-sm cursor-pointer">
                ¿Ya tienes una cuenta? <strong>Iniciar sesión</strong>
              </span>
            </div>
            <div className="flex justify-center items-center space-x-2 mr-[-28px]">
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
            </div>
          </div>
        </form>
        <div className="flex justify-end">
          <p className="text-gray-300 text-xs inline-flex items-center pt-9 space-x-1 ml-auto">
            <span>Copyright ©</span>
            <img src="../../../public/image 39.png" alt="Logo PicadosYA" className="w-62 h-17 pt-1" />
            <span>2024. All rights reserved.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
