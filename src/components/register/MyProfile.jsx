// import React from 'react';

export function MyProfile() {
    return (
      <div className="w-[580px] h-[620px] bg-blue-700 rounded-[25px] p-8">
        {/* Encabezado */}
        <div className="flex items-center justify-end mb-6">
          <img src="logo.png" alt="Logo" className="w-12 h-12" /> {/* Ruta de logo */}
          <h2 className="text-white text-xl font-semibold">Mi Perfil</h2>
        </div>
  
        {/* Bloque de imagen de perfil */}
        <div className="flex items-center mb-6 -mt-8"> {/* Se desplaza hacia arriba con -mt-8 */}
          <div className="flex flex-col items-center mr-6">
            <div className="w-20 h-20 bg-gray-300 rounded-full flex justify-center items-center mb-2">
              <img src="profile-pic.png" alt="Profile" className="w-full h-full rounded-full" /> {/* Ruta de imagen de perfil */}
            </div>
            <button
              className="bg-[rgba(25,32,71,1)] text-white rounded-[10px] px-4 py-2 min-w-[148px] shadow-sm shadow-black">
              Cargar imagen
            </button>
          </div>
          <div className="flex flex-col space-y-4 w-full">
            <div className="flex flex-col w-full">
              <label className="text-white">Nombre</label>
              <input type="text" placeholder="Nombre" className="w-full h-10 px-4 rounded-lg border border-gray-300 shadow-sm shadow-black" />
            </div>
            <div className="flex flex-col w-full">
              <label className="text-white">Apellido</label>
              <input type="text" placeholder="Apellido" className="w-full h-10 px-4 rounded-lg border border-gray-300 shadow-sm shadow-black" />
            </div>
          </div>
        </div>
  
        {/* Bloque de contacto */}
        <div className="flex space-x-4 mb-6">
        <div className="flex flex-col w-2/3">
            <label className="text-white">Correo</label>
            <input type="email" placeholder="Correo" className="w-full h-10 px-4 rounded-lg border border-gray-300 shadow-sm shadow-black" />
        </div>
        <div className="flex flex-col" style={{ maxWidth: '85px' }}>
            <label className="text-white">Código país</label>
            <input type="text" placeholder="País" className="w-full h-10 px-2 rounded-lg border border-gray-300 shadow-sm shadow-black" />
        </div>
        <div className="flex flex-col flex-grow">
            <label className="text-white">Teléfono</label>
            <input type="tel" placeholder="Teléfono" className="w-full h-10 px-4 rounded-[25px] border border-gray-300 shadow-sm shadow-black" />
        </div>
        </div>
  
        {/* Bloque de equipo y posición */}
        <div className="flex space-x-4 mb-6">
          <div className="flex flex-col w-1/2">
            <label className="text-white">Equipo</label>
            <input type="text" placeholder="Equipo" className="h-10 px-4 rounded-lg border border-gray-300 mb-2 shadow-sm shadow-black" />
            <div className="flex justify-center">
              <button
                className="bg-[rgba(25,32,71,1)] text-white rounded-[10px] min-w-[148px] px-4 py-2 shadow-sm shadow-black">
                Cargar escudo
              </button>
            </div>
          </div>
          <div className="flex flex-col w-1/2">
            <label className="text-white">Posición</label>
            <input type="text" placeholder="Posición" className="h-10 px-4 rounded-lg border border-gray-300 mb-2 shadow-sm shadow-black" />
            <button
              className="bg-[rgba(25,32,71,1)] text-white rounded-[25px] min-w-[148px] px-4 py-2 shadow-sm shadow-black">
              Histórico Reservas
            </button>
          </div>
        </div>
  
        {/* Botones de acción */}
        <div className="flex justify-between mb-4 mt-9">
          <button
            className="w-[45%] h-10 bg-[rgba(25,32,71,1)] text-white rounded-[25px] shadow-sm shadow-black">
            Cancelar
          </button>
          <button
            className="w-[45%] h-10 bg-orange-500 text-white rounded-[25px] shadow-sm shadow-black">
            Confirmar
          </button>
        </div>
  
        {/* Eliminar cuenta */}
        <p className="text-center text-white text-500 text-sm mt-8 cursor-pointer underline">
          Eliminar mi cuenta
        </p>
      </div>
    );
}
