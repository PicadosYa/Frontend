// import React from 'react';

export function RegisterOwner() {
  return (
    <div className="w-[859px] h-[615px] bg-blue-700 rounded-[25px] p-8 flex flex-col items-center" style={{ background: "linear-gradient(to bottom, rgba(26, 57, 210, 1), rgba(13, 29, 108, 1))" }}>
      <div className="flex items-center justify-between w-full mb-4">
        <img src='./../../../public/Logo.png' alt="Logo" className="w-1/3 h-20" />
        <h2 className="text-white text-2x2 font-semibold" style={{ fontFamily: "Exo, sans-serif", lineHeight: "normal" }}>
          ¡Bienvenido! ¡Sumate que esto se pica!
        </h2>
      </div>
      <form className="flex flex-col w-full space-y-10">
        <div className="flex w-full space-x-8">
          {/* Columna Izquierda */}
          <div className="flex flex-col w-1/2 space-y-6">
            <input
              type="text"
              placeholder="Nombre"
              className="h-10 px-4 text-lg rounded-[25px] border border-gray-300 shadow-sm shadow-black"
            />
            <input
              type="text"
              placeholder="Nombre del complejo"
              className="h-10 px-4 text-lg rounded-[25px] border border-gray-300 shadow-sm shadow-black"
            />
            <input
              type="text"
              placeholder="Dirección"
              className="h-10 px-4 text-lg rounded-[25px] border border-gray-300 shadow-sm shadow-black"
            />
            <input
              type="text"
              placeholder="Tipo"
              className="h-10 px-4 text-lg rounded-[25px] border border-gray-300 shadow-sm shadow-black"
            />
            <input
              type="password"
              placeholder="Escribe una contraseña min, 8 caracteres"
              className="h-10 px-4 text-lg rounded-[25px] border border-gray-300 shadow-sm shadow-black"
            />
            <input
              type="password"
              placeholder="Confirmar contraseña"
              className="h-10 px-4 text-lg rounded-[25px] border border-gray-300 shadow-sm shadow-black"
            />
          </div>
          {/* Columna Derecha */}
          <div className="flex flex-col w-1/2 space-y-6">
            <input
              type="text"
              placeholder="Apellido"
              className="h-10 px-4 text-lg rounded-[25px] border border-gray-300 shadow-sm shadow-black"
            />
            <input
              type="text"
              placeholder="País"
              className="h-10 px-4 text-lg rounded-[25px] border border-gray-300 shadow-sm shadow-black"
            />
            <input
              type="text"
              placeholder="Barrio / Localidad"
              className="h-10 px-4 text-lg rounded-[25px] border border-gray-300 shadow-sm shadow-black"
            />
            <input
              type="number"
              placeholder="Precio por hora"
              className="h-10 px-4 text-lg rounded-[25px] border border-gray-300 shadow-sm shadow-black"
            />
            <button
              className="bg-[rgba(25,32,71,1)] text-white rounded-[10px] rounded-[25px] px-4 py-2 min-w-[170px] shadow-sm shadow-black flex flex-row justify-center items-center">
              <img src='./../../../public/Action.png' alt="" className="pr-4" />Cargar imagenes
            </button>
            <button type="submit" className="h-10 bg-orange-500 text-white text-lg rounded-[25px] shadow-sm shadow-black" style={{
              background: "linear-gradient(to right, rgba(237, 60, 22, 1), rgba(243, 64, 24, 1), rgba(241, 74, 37, 1), rgba(255, 99, 65, 1))",
            }}>
              Crear cuenta
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
        </div>
      </form>
      <div className="flex justify-end">
        <p className="text-gray-300 text-xs inline-flex items-center pt-10 space-x-1 ml-auto">
          <span>Copyright ©</span>
          <img src="../../../public/image 39.png" alt="Logo PicadosYA" className="w-62 h-17 pt-1" />
          <span>2024. All rights reserved.</span>
        </p>
      </div>
    </div>
  );
}
