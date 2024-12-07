import { SalesChart } from "@/components/Dashboard/salesChart";
import React from "react";
import { Bar ,BarChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: 'Ene', value: 3728 },
  { name: 'Feb', value: 2548 },
  { name: 'Mar', value: 2218 },
  { name: 'Abr', value: 2786 },
  { name: 'May', value: 1982 },
  { name: 'Jun', value: 2192 },
];

const VentasMensuales = () => {
  return (
    <div className="bg-neutral-800 p-4 rounded-lg">
      <h3 className="text-white font-bold text-2xl mb-4">Ventas Mensuales</h3>
      <SalesChart />
    </div>
  );
};

export default VentasMensuales;