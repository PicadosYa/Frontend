import { motion } from "framer-motion";

export function Register() {
  return (
    <div className="w-full h-screen flex items-center justify-center relative">
      {/* Fondo GIF en loop */}
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
        className="w-[487px] h-auto bg-blue-700 rounded-[25px] flex flex-col items-center p-6"
        style={{ background: "linear-gradient(to bottom, rgba(26, 57, 210, 1), rgba(13, 29, 108, 1))" }}
      >
        <div className="flex w-full items-center justify-between mb-4">
          <motion.img
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            src="./../../../public/Logo.png"
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
        <form className="flex flex-col w-full max-w-md mb-5 space-y-6">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex gap-4"
          >
            <input
              type="text"
              placeholder="Nombre"
              className="flex-1 h-10 px-4 text-lg rounded-lg border border-gray-300 shadow-sm shadow-black"
            />
            <input
              type="text"
              placeholder="Apellido"
              className="flex-1 h-10 px-4 text-lg rounded-lg border border-gray-300 shadow-sm shadow-black"
            />
          </motion.div>
          <motion.input
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            type="email"
            placeholder="Correo electrónico"
            className="h-10 px-4 text-lg rounded-lg border border-gray-300 shadow-sm shadow-black"
          />
          <motion.input
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            type="password"
            placeholder="Contraseña"
            className="h-10 px-4 text-lg rounded-lg border border-gray-300 shadow-sm shadow-black"
          />
          <motion.input
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            type="password"
            placeholder="Confirmar contraseña"
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
            Crear cuenta
          </motion.button>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="flex justify-center items-center space-x-2"
          >
            <input type="checkbox" className="form-checkbox" />
            <span
              className="text-white text-sm underline cursor-pointer"
              style={{
                fontFamily: "Ubuntu, sans-serif",
                fontSize: "10px",
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
        </form>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="text-white mt-4 text-base"
        >
          ¿Ya tienes una cuenta? <span className="cursor-pointer"><strong>Iniciar sesión</strong></span>
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="text-gray-300 text-xs inline-flex items-center pt-3 space-x-1 ml-auto"
        >
          <span>Copyright ©</span>
          <img
            src="../../../public/image 39.png"
            alt="Logo PicadosYA"
            className="w-62 h-17 pt-1"
          />
          <span>2024. All rights reserved.</span>
        </motion.p>
      </motion.div>
    </div>
  );
}

export default Register;



