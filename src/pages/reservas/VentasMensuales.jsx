import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { RangeDatePicker } from '@/components/ui/DatePicker';
import { Global } from '@/helpers/Global';
import { 
  startOfMonth, 
  endOfMonth, 
  subMonths, 
  differenceInMonths, 
  startOfDay, 
  subYears 
} from 'date-fns';

const VentasMensuales = () => {
  // Configuración inicial: 3 meses anteriores al actual
  const [dateRange, setDateRange] = useState({
    from: startOfDay(startOfMonth(subMonths(new Date(), 3))),
    to: endOfMonth(new Date())
  });
  const [monthsAgo, setMonthsAgo] = useState(3);
  const [reservations, setReservations] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  const fetchData = async () => {
    const token = JSON.parse(localStorage.getItem("token"));

    try {
      const response = await fetch(`${Global.endpoints.backend}reservations/reservations-per-owner?MonthsAgo=${monthsAgo}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Error fetching reservations');
      }
      const data = await response.json();
      setReservations(data);
      processMonthlyData(data);
    } catch (error) {
      console.error('Reservation fetch error:', error);
    }
  };

  const validateDateRange = (range) => {
    const { from, to } = range;
    const today = new Date();
    
    // Restringir a máximo 6 meses de rango
    const monthsDifference = Math.abs(differenceInMonths(from, to));
    if (monthsDifference > 6) {
      return {
        from: subMonths(to, 6),
        to: to
      };
    }

    // Restringir a máximo 1 año hacia atrás
    if (from < subYears(today, 1)) {
      return {
        from: subYears(today, 1),
        to: today
      };
    }

    return range;
  };

  const processMonthlyData = (data) => {
    // Group reservations by month and calculate total sales per field
    const monthlyTotals = data.reduce((acc, reservation) => {
      const month = new Date(reservation.date).toLocaleString('default', { month: 'short' });
      const fieldName = reservation.field.name;
      const totalPrice = reservation.field.price * calculateHoursDuration(reservation);

      if (!acc[month]) {
        acc[month] = {};
      }

      if (!acc[month][fieldName]) {
        acc[month][fieldName] = 0;
      }

      acc[month][fieldName] += totalPrice;
      return acc;
    }, {});

    // Transform into chart-friendly format
    const chartData = Object.entries(monthlyTotals).map(([month, fields]) => ({
      month,
      ...fields
    }));

    setMonthlyData(chartData);
  };

  const calculateHoursDuration = (reservation) => {
    const startTime = new Date(`2024-01-01T${reservation.start_time}`);
    const endTime = new Date(`2024-01-01T${reservation.end_time}`);
    return (endTime - startTime) / (1000 * 60 * 60); // Convert to hours
  };

  const handleDateRangeSelect = (range) => {
    const validatedRange = validateDateRange(range);
    setDateRange(validatedRange);

    // Calcular monthsAgo basado en la fecha seleccionada
    const monthsDiff = Math.min(
      Math.abs(differenceInMonths(validatedRange.from, new Date())),
      6
    );
    setMonthsAgo(monthsDiff);
  };

  useEffect(() => {
    fetchData();
  }, [monthsAgo]);

  return (
    <div className="bg-neutral-800 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-bold text-2xl">Ventas Mensuales</h3>
        <RangeDatePicker
          selected={dateRange}
          onSelect={handleDateRangeSelect}
        />
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="month" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip />
          <Legend />
          {Object.keys(monthlyData[0] || {}).filter(key => key !== 'month').map((field, index) => (
            <Bar 
              key={field} 
              dataKey={field} 
              fill={index % 2 === 0 ? "#1A39D2" : "#ED3C16"} 
              name={field} 
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VentasMensuales;