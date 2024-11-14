// import React from 'react';

export function ConfirmCode() {
  return (
    <div className="w-[519px] h-[328px] bg-blue-700 rounded-[25px] flex flex-col items-center p-6" style={{ background: "linear-gradient(to bottom, rgba(26, 57, 210, 1), rgba(13, 29, 108, 1))" }}>
      <div className="flex w-full items-center justify-between mb-6 ">
        <img src="../../../public/Logo.png" alt="Logo" className="w-2/5 h-[64px] mt-[-10px] mb-[-6px]" />
      </div>      
      <h2 className="text-white text-xl font-semibold mb-8 text-center" style={{ fontFamily: "Exo, sans-serif", lineHeight: "normal" }}>
        Confirma tu código de acceso a tu cuenta
      </h2>
      <form className="flex flex-col w-3/4 max-w-md mb-4 space-y-8">
        <input
          type="text"
          placeholder="Código secreto"
          className="h-10 px-4 text-lg rounded-lg border border-gray-300 shadow-sm shadow-black"
        />
        <button type="submit" className="h-12 bg-orange-500 text-white text-lg rounded-[25px] shadow-sm shadow-black" style={{
								background: "linear-gradient(to right, rgba(237, 60, 22, 1), rgba(243, 64, 24, 1), rgba(241, 74, 37, 1), rgba(255, 99, 65, 1))",
							}}>
          Confirmar código
        </button>
      </form>
    </div>
  );
}

