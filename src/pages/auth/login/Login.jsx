import React, { useState } from "react";
import { useAuth, useForm } from "../../../hooks";
import { Global } from "../../../helpers/Global";
import { MsgSuccess, MsgError } from "../../../helpers/MsgNotification";
import { ToastContainer } from "react-toastify";
import {
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { setAuth } = useAuth();
  const { form, changed } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const loginUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`${Global.endpoints.backend}users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.status !== 200) throw new Error(res.statusText);

      const data = await res.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          firstname: data.user.first_name,
          lastname: data.user.last_name,
          email: data.user.email,
          phone: data.user.phone,
          role: data.user.role,
        })
      );

      setAuth(data.user);
      MsgSuccess("Inicio de sesión exitoso!");
    } catch (error) {
      MsgError("Ha ocurrido un error al iniciar sesión.");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <ToastContainer />

      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-[396px] h-[431.84px] bg-blue-700 rounded-[25px] flex flex-col items-center p-6"
        style={{
          background:
            "linear-gradient(to bottom, rgba(26, 57, 210, 1), rgba(13, 29, 108, 1))",
        }}
      >
        <div className="flex w-full items-center justify-between mb-6">
          <motion.img
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            src={Global.images.logoSB}
            alt="Logo de la Empresa, Picados Ya."
            className="w-1/2 h-[62px] mt-[-10px] mb-[-20px]"
          />
        </div>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-white text-[16px] font-extrabold mb-5 text-center"
          style={{ fontFamily: "Exo, sans-serif", lineHeight: "normal" }}
        >
          ¿Estás listo para picarla?
        </motion.h2>
        <form
          onSubmit={loginUser}
          className="flex flex-col w-full max-w-md mb-5 space-y-8 items-center"
        >
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <label htmlFor="email" className="sr-only">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Correo electrónico"
              className="w-[306px] h-[47px] px-4 text-lg rounded-lg  shadow-sm shadow-black mx-auto"  
              onChange={changed}
            />
          </motion.div>
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <label htmlFor="password" className="sr-only">
              Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                placeholder="Contraseña"
                className=""
                className="w-[306px] h-[47px] px-5 text-lg rounded-lg shadow-sm shadow-black mx-auto"
                onChange={changed}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                aria-label={
                  showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
              >
                {showPassword ? (
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
            </div>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isLoading}
              className="w-[306px] h-[47px] bg-orange-500 text-white text-lg rounded-[25px] mt-4 shadow-sm shadow-black"
              style={{
                background:
                  "linear-gradient(to right, rgba(237, 60, 22, 1), rgba(255, 73, 28, 1), rgba(238, 75, 39, 1), rgba(255, 99, 65, 1))",
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
                "Iniciar sesión"
              )}
            </motion.button>
          </motion.div>
        </form>
        <div className="flex flex-col items-center mt-2 text-white text-base">
          <p className="flex gap-5 text-white text-base">
            <span
              className="text-white cursor-pointer underline"
              style={{
                fontFamily: "Ubuntu, sans-serif",
                fontSize: "11px",
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
              Olvidé mi contraseña
            </span>
            <span
              className="text-white cursor-pointer"
              style={{
                fontFamily: "Ubuntu, sans-serif",
                fontSize: "11px",
                fontWeight: 400,
                lineHeight: "normal",
                textDecorationStyle: "solid",
                textDecorationSkipInk: "none",
                textDecorationThickness: "auto",
                textUnderlineOffset: "auto",
                textUnderlinePosition: "from-font",
              }}
            >
              ¿No tienes una cuenta? <strong>Crear cuenta</strong>
            </span>
          </p>
        </div>
        <p className="text-gray-300 text-xs inline-flex items-center pt-4">
          <span>Copyright ©</span>
          <img
            src="../../../public/image 39.png"
            alt="Logo PicadosYA"
            className="w-62 h-17 pt-1"
          />
          <span>2024. All rights reserved.</span>
        </p>
      </motion.section>
    </main>
  );
};

export default Login;
