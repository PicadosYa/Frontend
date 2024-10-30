// import React from 'react';

export function RegisterOwner() {
  return (
    <div className="w-[859px] h-[615px] bg-blue-700 rounded-[25px] p-8 flex flex-col items-center">
      <div className="flex items-center justify-between w-full mt-[-30px] mb-[-10px]">
        <img src='./../../../public/Logo_SB-pro.png' alt="Logo" className="w-120 h-32" />
        <h2 className="text-white text-2x2 font-semibold">
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
          </div>
        </div>
        
        {/* Contenedor inferior con el texto y el botón */}
        <div className="flex justify-between w-full mt-4 items-center">
          <div className="w-1/2 flex justify-center">
            <span className="text-white text-sm underline cursor-pointer">
              ¿Ya tienes una cuenta? Iniciar sesión
            </span>
          </div>
          <button type="submit" className="w-1/2 h-10 bg-orange-500 text-white text-lg rounded-[25px] shadow-sm shadow-black">
            Crear cuenta
          </button>
        </div>
      </form>
      <p className="text-white text-xs mt-8 text-center">
        Copyright © PicadosYa 2024. All rights reserved.
      </p>
    </div>
  );
}
