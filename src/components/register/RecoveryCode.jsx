// import React from 'react';

export function RecoveryCode() {
  return (
    <div className="w-[519px] h-[328px] bg-blue-700 rounded-[25px] flex flex-col items-center p-6">
      <div className="flex w-full items-center justify-between mb-6 ">
        <img src='./../../../public/Logo_SB-pro.png' alt="Logo" className="w-1/3 h-[96px] mt-[-10px] mb-[-20px]" />
      </div>      
      <h2 className="text-white text-xl font-semibold mb-4 text-center">
        Enviaremos un código de recuperación
      </h2>
      <form className="flex flex-col w-full max-w-md mb-4 space-y-4">
        <input
          type="email"
          placeholder="Correo asociado a tu cuenta"
          className="h-10 px-4 text-lg rounded-lg border border-gray-300 shadow-sm shadow-black"
        />
        <button type="submit" className="h-12 bg-orange-500 text-white text-lg rounded-[25px] shadow-sm shadow-black">
          Enviar código
        </button>
      </form>
      <p className="text-white text-xs mt-6 text-center">
        Copyright © PicadosYa 2024. All rights reserved.
      </p>
    </div>
  );
}

