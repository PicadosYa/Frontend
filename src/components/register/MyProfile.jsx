// import React from 'react';

export function MyProfile() {
  return (
    <div
      className="flex flex-col w-[600px] h-[720px] rounded-[25px] p-10"
      style={{
        background:
          "linear-gradient(to bottom, rgba(26, 57, 210, 1), rgba(13, 29, 108, 1))",
      }}
    >
      {/* Encabezado */}
      <div className="flex items-center justify-end ">
        <img
          src="./../../../public/logo-picYasvg-svg 4.png"
          alt="Logo"
          className="w-12 h-12"
        />{" "}
        {/* Ruta de logo */}
        <h2 className="text-white text-xl font-semibold">Mi Perfil</h2>
      </div>

      {/* Bloque de imagen de perfil */}
      <div className="flex items-center mb-6 -mt-8">
        <div className="flex flex-col items-center mr-6">
          <div className="w-40 h-40 bg-gray-300 rounded-full flex justify-center items-center">
            <img
              src="./../../../public/Proyecto nuevo 1.png"
              alt="Profile"
              className="w-full h-full rounded-full"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-white">Edad</label>
            <div className="flex flex-row w-full gap-4">
              <input
                type="text"
                placeholder="Edad"
                className="min-w-[70px] h-10 px-4 rounded-lg border border-gray-300 shadow-sm shadow-black"
              />
              <button className="bg-[rgba(25,32,71,1)] text-white rounded-[25px] px-4 py-2 min-w-[170px] shadow-sm shadow-black flex flex-row justify-center items-center">
                <img
                  src="./../../../public/Action.png"
                  alt=""
                  className="pr-4"
                />
                Cargar imagen
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-8 mt-16 w-full">
          <div className="flex flex-col w-full">
            <label className="text-white">Nombre</label>
            <input
              type="text"
              placeholder="Nombre"
              className="w-full h-10 px-4 rounded-lg border border-gray-300 shadow-sm shadow-black"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-white">Apellido</label>
            <input
              type="text"
              placeholder="Apellido"
              className="w-full h-10 px-4 rounded-lg border border-gray-300 shadow-sm shadow-black"
            />
          </div>
        </div>
      </div>

      {/* Bloque de contacto */}
      <div className="flex space-x-4 mb-6">
        <div className="flex flex-col w-2/3">
          <label className="text-white">Correo</label>
          <input
            type="email"
            placeholder="Correo"
            className="w-full h-10 px-4 rounded-lg border border-gray-300 shadow-sm shadow-black"
          />
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col" style={{ maxWidth: "85px" }}>
            <label className="text-white">País</label>
            <input
              type="text"
              placeholder="País"
              className="w-full h-10 px-2 rounded-lg border border-gray-300 shadow-sm shadow-black"
            />
          </div>
          <div className="flex flex-col flex-grow">
            <label className="text-white">Teléfono</label>
            <input
              type="tel"
              placeholder="Teléfono"
              className="w-full h-10 px-4 rounded-[25px] border border-gray-300 shadow-sm shadow-black"
            />
          </div>
        </div>
      </div>

      {/* Bloque de equipo y posición */}
      <div className="flex space-x-6 mb-6">
        <div className="flex flex-col w-1/2">
          <label className="text-white">Equipo</label>
          <input
            type="text"
            placeholder="Equipo"
            className="h-10 px-4 rounded-lg border border-gray-300 mb-6 shadow-sm shadow-black"
          />
          <button className="bg-[rgba(25,32,71,1)] text-white rounded-[25px] min-w-[148px] px-4 py-2 shadow-sm shadow-black flex flex-row justify-center items-center">
            <img src="./../../../public/Action.png" alt="" className="pr-4" />
            Cargar escudo
          </button>
        </div>
        <div className="flex flex-col w-1/2">
          <label className="text-white">Posición</label>
          <input
            type="text"
            placeholder="Posición"
            className="h-10 px-4 rounded-lg border border-gray-300 mb-6 shadow-sm shadow-black"
          />
          <button className="bg-[rgba(25,32,71,1)] text-white rounded-[25px] min-w-[148px] px-4 py-2 shadow-sm shadow-black">
            Histórico Reservas
          </button>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex justify-between mb-4 mt-10">
        <button className="w-[45%] h-10 bg-[rgba(25,32,71,1)] text-white rounded-[25px] border-orange-600 shadow-sm shadow-black">
          Cancelar
        </button>
        <button
          className="w-[45%] h-10 bg-orange-500 text-white rounded-[25px] shadow-sm shadow-black"
          style={{
            background:
              "linear-gradient(to right, rgba(237, 60, 22, 1), rgba(255, 73, 28, 1), rgba(238, 75, 39, 1), rgba(255, 99, 65, 1))",
          }}
        >
          Confirmar
        </button>
      </div>

      {/* Eliminar cuenta */}
      <p className="text-center text-white text-500 text-sm mt-6 cursor-pointer underline flex flex-row justify-center items-center gap-2">
        <img src="./../../../public/Trash.png" alt="Trash" />
        Eliminar mi cuenta
      </p>
    </div>
  );
}
