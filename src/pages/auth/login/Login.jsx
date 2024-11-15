import React, { useState } from "react";
import { useAuth, useForm } from "../../../hooks";
import { Global } from "../../../helpers/Global";
import { MsgSuccess, MsgError } from "../../../helpers/MsgNotification";
import { ToastContainer } from "react-toastify";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      MsgError("Ha ocurrido un error al iniciar sesión.");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <main className="relative w-full h-screen flex items-center justify-center p-4">
      {/* Fondo GIF en loop */}
      <div
        className="absolute top-0 left-0 w-full h-full z-[-1]"
        style={{
          backgroundImage:
            'url("https://raw.githubusercontent.com/woohdang/fotos-py/main/vid03.gif")', // TODO: Inserta la ruta a tu GIF
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "opacity(1.1)", // Ajusta la opacidad del GIF de fondo
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: "rgba(13, 29, 108, 0.75)", //micromalla azul
            backdropFilter: "blur(3px) contrast(1.2)",
          }}
        ></div>
      </div>

      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md bg-blue-700 rounded-[25px] flex flex-col items-center p-6"
        style={{
          background:
            "linear-gradient(to bottom, rgba(26, 57, 210, 1), rgba(13, 29, 108, 1))",
        }}
      >
        <ToastContainer />
        <div className="flex w-full items-center justify-between mb-6">
          <motion.img
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            src="https://raw.githubusercontent.com/woohdang/fotos-py/main/Logo.png"
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
          className="flex flex-col w-full mb-5 space-y-8 items-center"
        >
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="w-full"
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
              className="w-full h-[47px] px-5 text-lg rounded-[25px] shadow-sm shadow-black"
              onChange={changed}
            />
          </motion.div>
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="w-full"
          >
            <label htmlFor="password" className="sr-only">
              Contraseña
            </label>
            <div className="relative w-full">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                placeholder="Contraseña"
                className="w-full h-[47px] px-5 text-lg rounded-[25px] shadow-sm shadow-black"
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
            className="w-full"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isLoading}
              className="w-full h-[47px] bg-orange-500 text-white text-lg rounded-[25px] mt-4 shadow-sm shadow-black"
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
              Olvidé mi contraseña
            </span>
            <span
              className="text-white cursor-pointer"
              style={{
                fontFamily: "Ubuntu, sans-serif",
                fontSize: "13px",
                fontWeight: 400,
                lineHeight: "normal",
                textDecorationStyle: "solid",
                textDecorationSkipInk: "none",
                textDecorationThickness: "auto",
                textUnderlineOffset: "auto",
                textUnderlinePosition: "from-font",
              }}
            >
              ¿No tienes una cuenta?{" "}
              <Link to="/choice/register">Crear cuenta</Link>
            </span>
          </p>
        </div>
        <p className="text-gray-300 text-xs inline-flex items-center pt-9">
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
