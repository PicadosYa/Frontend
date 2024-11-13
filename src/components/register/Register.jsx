// import React from 'react';

export function Register() {
  return (
    <div className="w-[487px] h-[615.3px] bg-blue-700 rounded-[25px] flex flex-col items-center p-6 " style={{ background: "linear-gradient(to bottom, rgba(26, 57, 210, 1), rgba(13, 29, 108, 1))" }}>
      <div className="flex w-full items-center justify-between mb-4 ">
        <img src='./../../../public/Logo.png' alt="Logo" className="w-1/2 h-[64px]" />
      </div>
      <h3 className="text-white text-2xl mb-8 text-center" style={{ fontFamily: "Exo, sans-serif", lineHeight: "normal" }}>¡Bienvenido! ¡Sumate que esto se pica!</h3>
      <form className="flex flex-col w-full max-w-md mb-5 space-y-6">
        <div className="flex gap-4">
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
        </div>
        <input
          type="email"
          placeholder="Correo electrónico"
          className="h-10 px-4 text-lg rounded-lg border border-gray-300 shadow-sm shadow-black"
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="h-10 px-4 text-lg rounded-lg border border-gray-300 shadow-sm shadow-black"
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          className="h-10 px-4 text-lg rounded-lg border border-gray-300 shadow-sm shadow-black"
        />
        <button type="submit" className="h-12 bg-orange-500 text-white text-lg rounded-[25px] mt-4 shadow-sm shadow-black" style={{
          background:
            "linear-gradient(to right, rgba(237, 60, 22, 1), rgba(255, 73, 28, 1), rgba(238, 75, 39, 1), rgba(255, 99, 65, 1))",
        }}>
          Crear cuenta
        </button>
        <div className="flex justify-center items-center space-x-2">
          <input type="checkbox" className="form-checkbox" />
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
      </form>
      <p className="text-white mt-4 text-base">
        ¿Ya tienes una cuenta? <span className=" cursor-pointer"><strong>Iniciar sesión</strong></span>
      </p>
      <p className="text-gray-300 text-xs inline-flex items-center pt-3 space-x-1 ml-auto">
        <span>Copyright ©</span>
        <img src="../../../public/image 39.png" alt="Logo PicadosYA" className="w-62 h-17 pt-1" />
        <span>2024. All rights reserved.</span>
      </p>

    </div>
  );
}


