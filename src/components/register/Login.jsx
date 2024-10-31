// import React from 'react';

export function Login() {
  return (
    <div className="w-[396px] h-[431.84px] bg-blue-700 rounded-[25px] flex flex-col items-center p-6">
      <div className="flex w-full items-center justify-between mb-6 ">
        <img src='./../../../public/Logo_SB-pro.png' alt="Logo" className="w-1/2 h-[96px] mt-[-10px] mb-[-20px]" />
      </div>      
      <h2 className="text-white text-2xl mb-5 text-center">¿Estas listo para picarla?</h2>
      <form className="flex flex-col w-full max-w-md mb-5 space-y-4">
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
        <button type="submit" className="h-12 bg-orange-500 text-white text-lg rounded-[25px] mt-4 shadow-sm shadow-black">
          Iniciar sesión
        </button>
      </form>
      <div className="flex flex-col items-center gap-2 text-white text-base">
      <p className="flex gap-5 text-white text-base">
        <span className="text-white-200 cursor-pointer underline">Olvidé mi contraseña</span>
        <span className="text-white-200 cursor-pointer underline">¿No tienes una cuenta? Crear cuenta</span>
      </p>
      </div>
      <p className="text-white text-xs mt-[15px] text-center">
        Copyright © PicadosYa 2024. All rights reserved.
      </p>
    </div>
  );
}
