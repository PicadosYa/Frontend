import  { useState } from "react";
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
  const [isChecked, setIsChecked] = useState(false);
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
    if (!isChecked) {
      MsgError("Debes aceptar los términos y condiciones para registrarte.");
      return;
    }
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
          user_name: newUser.name,
          user_email: newUser.email,
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
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#22358b] to-[#2c45b4] p-4">
      <ToastContainer />
      <form
        className=" space-y-8 bg-gradient-to-r from-[#2c45b4] to-[#22358b] p-10 mt-28 rounded-xl shadow-2xl"
        onSubmit={handleSubmit}
      >
        <header className="flex justify-between items-center">
          <div>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              src={Global.images.logoSB}
              alt="Logo de la Empresa, Picados Ya."
              className="h-24 w-auto"
            />
          </div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-1 font-bold text-white"
          >
            Bienvenido!
          </motion.h1>
        </header>

        <div className="flex gap-[10px] mb-[15px]">
          <input
            className="px-2 py-1 rounded-full mx-2"
            type="text"
            name="name"
            placeholder="Nombre"
            onChange={changed}
            required
          />
          <input
            className="px-2 py-1 rounded-full mx-2"
            type="text"
            name="lastname"
            placeholder="Apellido"
            onChange={changed}
            required
          />
        </div>

        <input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          onChange={changed}
          required
          autoComplete="on"
        />

        <div className="form-group password-group">
          <input
            type={showPassword.password ? "text" : "password"}
            name="password"
            placeholder="Contraseña"
            onChange={changed}
            required
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => togglePasswordVisibility("password")}
          >
            {showPassword.password ? "👁️" : "🙈"}
          </button>
        </div>

        <div className="form-group password-group">
          <input
            type={showPassword.confirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirmar contraseña"
            onChange={changed}
            required
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => togglePasswordVisibility("confirmPassword")}
          >
            {showPassword.confirmPassword ? "👁️" : "🙈"}
          </button>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading}
            className="relative w-48 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-gradient-to-r from-[#eb2a00] to-[#ff471f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
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
          </motion.button>
        </motion.div>

        <div className="flex justify-center items-center space-x-2">
          <input type="checkbox" 
            className="form-checkbox" 
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}/>
          <span className="text-white text-sm underline cursor-pointer" style={{
              fontFamily: "Ubuntu, sans-serif",
              fontSize: "10px",
              fontWeight: 400,
              lineHeight: "normal",
              textDecorationLine: "underline",
              textDecorationStyle: "solid",
              textDecorationSkipInk: "none",
              textDecorationThickness: "auto",
              textUnderlineOffset: "auto",
              textUnderlinePosition: "from-font"
            }}>
            Acepto los Términos y condiciones de privacidad
          </span>
        </div>


        <p className="flex justify-center iniciar-sesion text-white">
          ¿Ya tienes una cuenta?
          <Link to="/login" className="font-semibold ml-2">
            Iniciar Sesión
          </Link>
        </p>
      </form>
    </main>
  );
};

export default Register;
2;
