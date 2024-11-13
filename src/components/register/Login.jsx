// import React from 'react';

export function Login() {
  return (
    <div className="w-[396px] h-[431.84px] bg-blue-700 rounded-[25px] flex flex-col items-center p-6" style={{ background: "linear-gradient(to bottom, rgba(26, 57, 210, 1), rgba(13, 29, 108, 1))" }}>
      <div className="flex w-full items-center justify-between mb-6 ">
        <img src='./../../../public/Logo.png' alt="Logo" className="w-1/2 h-[62px] mt-[-10px] mb-[-20px]" />
      </div>
      <h2 className="text-white text-[16px] font-extrabold mb-5 text-center" style={{ fontFamily: "Exo, sans-serif", lineHeight: "normal" }}>
  ¿Estás listo para picarla?
</h2>
      <form className="flex flex-col w-full max-w-md mb-5 space-y-8">
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
        <button type="submit" className="h-12 bg-orange-500 text-white text-lg rounded-[25px] mt-4 shadow-sm shadow-black" style={{
          background:
            "linear-gradient(to right, rgba(237, 60, 22, 1), rgba(255, 73, 28, 1), rgba(238, 75, 39, 1), rgba(255, 99, 65, 1))",
        }}>
          Iniciar sesión
        </button>
      </form>
      <div className="flex flex-col items-center mt-3 text-white text-base">
        <p className="flex gap-5 text-white text-base">
          <span
            className="text-white cursor-pointer underline"
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
              textUnderlinePosition: "from-font"
            }}
          >
            Olvidé mi contraseña
          </span>
          <span
            className="text-white cursor-pointer"
            style={{
              fontFamily: "Ubuntu, sans-serif",
              fontSize: "10px",
              fontWeight: 400,
              lineHeight: "normal",
              textDecorationStyle: "solid",
              textDecorationSkipInk: "none",
              textDecorationThickness: "auto",
              textUnderlineOffset: "auto",
              textUnderlinePosition: "from-font"
            }}
          >
            ¿No tienes una cuenta? <strong>Crear cuenta</strong> 
          </span>
        </p>
      </div>
      <p className="text-gray-300 text-xs inline-flex items-center pt-9 ">
          <span>Copyright ©</span>
          <img src="../../../public/image 39.png" alt="Logo PicadosYA" className="w-62 h-17 pt-1" />
          <span>2024. All rights reserved.</span>
        </p>
          </div>
  );
}
