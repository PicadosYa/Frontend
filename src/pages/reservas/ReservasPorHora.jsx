import React from "react";
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from "recharts";

const data = [
  { time: '08:00', reservas: 4 },
  { time: '10:00', reservas: 12 },
  { time: '12:00', reservas: 14 },
  { time: '14:00', reservas: 8 },
  { time: '16:00', reservas: 2 },
  { time: '18:00', reservas: 1 },
  { time: '20:00', reservas: 0 },
];

const ReservasPorHora = () => {
  return (
    <div className="bg-neutral-800 p-4 rounded-lg">
      <h3 className="text-white font-bold text-2xl mb-4">Reservas por Hora</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="time" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="reservas" stroke="#4DABF7" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReservasPorHora;