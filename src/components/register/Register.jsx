// import React from 'react';

export function Register() {
  return (
    <div className="w-[487px] h-[615.3px] bg-blue-700 rounded-[25px] flex flex-col items-center p-6">
      <div className="flex w-full items-center justify-between mb-6 ">
        <img src='./../../../public/Logo_SB-pro.png' alt="Logo" className="w-1/2 h-[96px] mt-[-10px] mb-[-20px]" />
      </div>      
    <h2 className="text-white text-2xl mb-5 text-center">Bienvenido a nuestro servicio</h2>
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
        <button type="submit" className="h-12 bg-orange-500 text-white text-lg rounded-[25px] mt-4 shadow-sm shadow-black">
          Crear cuenta
        </button>
      </form>
      <p className="text-white mt-14 text-base">
        ¿Ya tienes una cuenta? <span className="text-orange-400 cursor-pointer underline">Iniciar sesión</span>
      </p>
      <p className="text-white text-xs mt-6 text-center">
        Copyright © PicadosYa 2024. All rights reserved.
      </p>
    </div>
  );
}


