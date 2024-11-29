import React from "react";
import AdminSideBar from "./AdminSideBar";

const statusColors = {
  Confirmado: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50",
  Pendiente: "bg-amber-500/20 text-amber-300 border border-amber-500/50",
  Cancelado: "bg-rose-500/20 text-rose-300 border border-rose-500/50",
};

export const Reservas = () => {
  const table = [
    { header: "Id", className: "w-12" },
    { header: "Cancha", className: "w-24" },
    { header: "Nombre", className: "w-32" },
    { header: "Fecha", className: "w-24" },
    { header: "Desde", className: "w-20" },
    { header: "Hasta", className: "w-20" },
    { header: "Tipo", className: "w-24" },
    { header: "Contacto", className: "w-32" },
    { header: "Estado", className: "w-28" },
  ];

  const reservas = [
    {
      id: 1,
      cancha: "Cancha 1",
      nombre: "Torneo Local",
      fecha: "12/11/2024",
      desde: "10:00",
      hasta: "12:00",
      tipo: "Fútbol 5",
      contacto: "123-456-789",
      estado: "Confirmado",
    },
    {
      id: 2,
      cancha: "Cancha 2",
      nombre: "Amistoso",
      fecha: "12/11/2024",
      desde: "14:00",
      hasta: "16:00",
      tipo: "Fútbol 5",
      contacto: "987-654-321",
      estado: "Pendiente",
    },
    {
      id: 3,
      cancha: "Cancha 3",
      nombre: "Entrenamiento",
      fecha: "13/11/2024",
      desde: "08:00",
      hasta: "10:00",
      tipo: "Fútbol 5",
      contacto: "555-555-555",
      estado: "Cancelado",
    },
    {
      id: 4,
      cancha: "Cancha 1",
      nombre: "Torneo Local",
      fecha: "12/11/2024",
      desde: "10:00",
      hasta: "12:00",
      tipo: "Fútbol 5",
      contacto: "123-456-789",
      estado: "Confirmado",
    },
    {
      id: 5,
      cancha: "Cancha 2",
      nombre: "Amistoso",
      fecha: "12/11/2024",
      desde: "14:00",
      hasta: "16:00",
      tipo: "Fútbol 5",
      contacto: "987-654-321",
      estado: "Pendiente",
    },
    {
      id: 6,
      cancha: "Cancha 3",
      nombre: "Entrenamiento",
      fecha: "13/11/2024",
      desde: "08:00",
      hasta: "10:00",
      tipo: "Fútbol 5",
      contacto: "555-555-555",
      estado: "Cancelado",
    },
  ];

  return (
    <div
      className="h-screen flex items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 backdrop-blur-[11px] backdrop-saturate-[200%] bg-[rgba(17,25,40,0.85)] rounded-[12px]"
      style={{
        backgroundImage: "url('/imagen%202.png')",
        backgroundSize: "cover",
      }}
    >
      <AdminSideBar />
      <div className="flex flex-col mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="relative bottom-24 text-4xl text-white">
            Gestion de Reserva
          </h1>
          <div className="relative bottom-[85px]">
            <img src="/Group_741.png" />
          </div>
        </div>
        <div className="w-full max-w-6xl backdrop-blur-md bg-white/10 rounded-2xl overflow-hidden border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#181818] text-gray-200 text-xs sm:text-sm uppercase tracking-wider">
                  {table.map((column, index) => (
                    <th
                      key={index}
                      className={`py-4 px-2 sm:px-4 text-left font-semibold ${column.className}`}
                    >
                      {column.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-gray-300 text-xs sm:text-sm divide-y divide-gray-700/30">
                {reservas.map((reserva) => (
                  <tr
                    key={reserva.id}
                    className="transition duration-300 ease-in-out hover:bg-white/5"
                  >
                    <td className="py-4 px-2 sm:px-4 whitespace-nowrap font-medium">
                      {reserva.id}
                    </td>
                    <td className="py-4 px-2 sm:px-4 whitespace-nowrap">
                      {reserva.cancha}
                    </td>
                    <td className="py-4 px-2 sm:px-4">{reserva.nombre}</td>
                    <td className="py-4 px-2 sm:px-4 whitespace-nowrap">
                      {reserva.fecha}
                    </td>
                    <td className="py-4 px-2 sm:px-4 whitespace-nowrap">
                      {reserva.desde}
                    </td>
                    <td className="py-4 px-2 sm:px-4 whitespace-nowrap">
                      {reserva.hasta}
                    </td>
                    <td className="py-4 px-2 sm:px-4 whitespace-nowrap">
                      {reserva.tipo}
                    </td>
                    <td className="py-4 px-2 sm:px-4 whitespace-nowrap">
                      {reserva.contacto}
                    </td>
                    <td className="py-4 px-2 sm:px-4">
                      <span
                        className={`${
                          statusColors[reserva.estado]
                        } py-1 px-2 rounded-full text-xs font-medium whitespace-nowrap backdrop-blur-sm`}
                      >
                        {reserva.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
