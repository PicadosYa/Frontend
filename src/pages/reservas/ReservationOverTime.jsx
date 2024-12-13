import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { RangeDatePicker } from '@/components/ui/DatePicker';
import { Global } from '@/helpers/Global';
import { addDays, differenceInDays, startOfDay, subMonths } from 'date-fns';
import { MdDiamond } from 'react-icons/md';
import { date } from 'zod';

const ReservationsOverTime = () => {
  const [dateRange, setDateRange] = useState({
    from: startOfDay(addDays(new Date(), -7)),
    to: startOfDay(new Date())
  });

  const [reservations, setReservations] = useState([]);
  const [processedData, setProcessedData] = useState([]);
  const [monthsAgo, setMonthsAgo] = useState(1);
  const [limitExceeded, setLimitExceeded] = useState(false);

  const validateDateRange = (range) => {
    const { from, to } = range;
    const daysDifference = differenceInDays(to, from);

    if (daysDifference > 7 || daysDifference < 0) {
      // Si el rango es mayor a 7 días, ajustar al último rango de 7 días desde la fecha 'to'
      return {
        from: addDays(to, -7),
        to: to
      };
    }

    return range;
  };

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
      processReservationsData(data);
    } catch (error) {
      console.error('Reservation fetch error:', error);
    }
  };

  const processReservationsData = (data) => {
    // Filtrar datos por rango de fechas
    const filteredData = data.filter(reservation => {
      const reservationDate = new Date(reservation.date + 'T01:00:00');
      return reservationDate >= dateRange.from && reservationDate <= dateRange.to;
    });

    // Agrupar reservaciones por fecha y campo
    const groupedReservations = filteredData.reduce((acc, reservation) => {
      const date = reservation.date;
      const fieldName = reservation.field.name;

      if (!acc[date]) {
        acc[date] = {
          date: date,
          fields: {}
        };
      }

      if (!acc[date].fields[fieldName]) {
        acc[date].fields[fieldName] = 0;
      }

      acc[date].fields[fieldName]++;
      return acc;
    }, {});

    // Transformar datos para el gráfico
    let chartData = Object.values(groupedReservations).map(item => ({
      date: item.date,
      ...item.fields
    }));

    // ordenar fechas


    setProcessedData(chartData);
  };

  useEffect(() => {
    // Calcular meses atrás basado en la fecha seleccionada
    const currentDate = new Date();
    const selectedFromDate = dateRange.from;
    const monthsDiff = Math.min(
      Math.max(0, Math.floor((currentDate.getFullYear() - selectedFromDate.getFullYear()) * 12 + 
      (currentDate.getMonth() - selectedFromDate.getMonth()))),
        // Límite de 6 meses
    );
    if (monthsDiff === 0) {
      setLimitExceeded(false);
         setMonthsAgo(1); 
    } else if(monthsDiff > 6){
      setLimitExceeded(true);
    }else {
      setLimitExceeded(false);
      setMonthsAgo(monthsDiff + 1);
    }
    
    fetchData();
  }, [dateRange]);

  useEffect(() => {
    fetchData();
  }, [monthsAgo]);

  const handleDateRangeSelect = (range) => {
    const validatedRange = validateDateRange(range);
    setDateRange(validatedRange);
  };

  // Calcular totales de reservaciones por campo
  const fieldTotals = processedData.reduce((totals, day) => {
    Object.keys(day).forEach(key => {
      if (key !== 'date') {
        totals[key] = (totals[key] || 0) + day[key];
      }
    });
    return totals;
  }, {});

  return (
    <div className="bg-neutral-800 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-white font-bold text-2xl">Reservas Totales</h3>
          <p className="text-gray-400">
            {Object.entries(fieldTotals).map(([field, total]) => 
              `${field}: ${total}`
            ).join(' | ')}
          </p>
        </div>
        <RangeDatePicker
          selected={dateRange}
          onSelect={handleDateRangeSelect}
          maxDays={7}  // Opcional: configurar límite en el DatePicker
        />
      </div>
      {limitExceeded ? <div className='flex flex-col justify-center items-center'>
        
        <p className="text-red-500">El rango de fechas seleccionado supera los seis meses. Pasate a PREMIUM para ver mas estadisticas</p> 
        <MdDiamond className='text-9xl text-main-blue animate-pulse cursor-pointer'/>
        </div>
        : (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={processedData}>
          <XAxis 
            dataKey="date" 
            stroke="#fff" 
            angle={-45} 
            textAnchor="end" 
            interval="preserveStartEnd"
          />
          <YAxis stroke="#fff" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(0,0,0,0.8)', 
              border: '1px solid rgba(255,255,255,0.1)' 
            }}
          />
          <Legend />
          {Object.keys(fieldTotals).map((field, index) => (
            <Bar 
              key={field} 
              dataKey={field} 
              fill={index % 2 === 0 ? "#ef4444" : "#FF6384"} 
              name={field} 
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
      )}
    </div>
  );
};

export default ReservationsOverTime;