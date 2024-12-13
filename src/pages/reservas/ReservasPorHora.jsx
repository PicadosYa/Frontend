import React, { useState } from 'react';
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';
import { DatePicker } from '@/components/ui/DatePicker';

const data = [
  { time: '08:00', cancha1: 4, cancha2: 2 },
  { time: '10:00', cancha1: 12, cancha2: 8 },
  { time: '12:00', cancha1: 14, cancha2: 10 },
  { time: '14:00', cancha1: 8, cancha2: 6 },
  { time: '16:00', cancha1: 2, cancha2: 1 },
  { time: '18:00', cancha1: 1, cancha2: 3 },
  { time: '20:00', cancha1: 0, cancha2: 2 },
];

const ReservasPorHora = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="bg-neutral-800 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-bold text-2xl">Reservas por Hora</h3>
        <DatePicker
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
        />
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="time" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="cancha1" stroke="#4DABF7" name="Cancha 1" />
          <Line type="monotone" dataKey="cancha2" stroke="#FF6384" name="Cancha 2" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReservasPorHora;