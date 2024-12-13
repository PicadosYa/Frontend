import React, { useState, useEffect } from 'react';
import { DatePicker } from '@/components/ui/DatePicker';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Global } from '@/helpers/Global';
import { differenceInDays, subDays, startOfDay } from 'date-fns';
import { MdDiamond } from 'react-icons/md';

const ReservasYOcupacion = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reservations, setReservations] = useState([]);
  const [fieldOccupancy, setFieldOccupancy] = useState([]);
  const [monthsAgo, setMonthsAgo] = useState(0);
  const [limitExceeded, setLimitExceeded] = useState(false);

  const validateDate = (date) => {
    const today = new Date();
    const daysDifference = differenceInDays(today, date);

    // Restringir a 30 días hacia atrás
    if (daysDifference > 30) {
      setLimitExceeded(true)
      return subDays(today, 30);
    }
    setLimitExceeded(false)
    return date;
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
      processReservationData(data);
    } catch (error) {
      console.error('Reservation fetch error:', error);
    }
  };

  const processReservationData = (data) => {
    // Filter reservations for selected date
    const dateReservations = data.filter(reservation => 
      new Date(reservation.date + 'T01:00:00').toDateString() === selectedDate.toDateString()
    );

    setReservations(dateReservations);

    // Calculate field occupancy
    const fieldOccupancyData = calculateFieldOccupancy(data);
    setFieldOccupancy(fieldOccupancyData);
  };

  const calculateFieldOccupancy = (data) => {
    // Group reservations by field
    const fieldReservations = data.reduce((acc, reservation) => {
      const fieldName = reservation.field.name;
      if (!acc[fieldName]) {
        acc[fieldName] = {
          totalReservations: 0,
          totalHours: 0
        };
      }

      acc[fieldName].totalReservations++;
      
      // Calculate hours
      const startTime = new Date(`2024-01-01T${reservation.start_time}`);
      const endTime = new Date(`2024-01-01T${reservation.end_time}`);
      if ( isNaN(startTime) || isNaN(endTime) ) return acc
      const hours = (endTime - startTime) / (1000 * 60 * 60);
      acc[fieldName].totalHours += hours;

      return acc;
    }, {});

    // Calculate occupancy percentage (assuming 12-hour day)
    return Object.entries(fieldReservations).map(([name, data]) => ({
      name,
      avatar: `/placeholders/court${Math.floor(Math.random() * 2) + 1}.png`,
      ocupacion: Math.round(((data.totalHours / 60) / 12) * 100),
      cambio: data.totalReservations > 5 ? 10 : -5
    }));
  };

  useEffect(() => {
    // Calcular meses atrás basado en la fecha seleccionada
    const currentDate = new Date();
    const selectedFromDate = selectedDate;
    const monthsDiff = Math.min(
      Math.max(0, Math.floor((currentDate.getFullYear() - selectedFromDate.getFullYear()) * 12 + 
      (currentDate.getMonth() - selectedFromDate.getMonth()))),
       // Límite de 1 mes
    );
    setMonthsAgo(1);
    
    fetchData();
  }, [selectedDate]);

  useEffect(() => {
    fetchData();
  }, [monthsAgo]);

  const handleDateSelect = (date) => {
    const validatedDate = validateDate(date);
    setSelectedDate(startOfDay(validatedDate));
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-3 bg-neutral-800 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white font-bold text-2xl">Reservas del Día</h3>
          <DatePicker
            selected={selectedDate}
            onSelect={handleDateSelect}
            maxDays={30}  // Opcional: configurar límite en el DatePicker
          />
        </div>
        {limitExceeded ? <div className='flex flex-col justify-center items-center'>
        
        <p className="text-red-500">El rango de fechas seleccionado supera los 30 dias. Pasate a PREMIUM para ver mas estadisticas</p> 
        <MdDiamond className='text-9xl text-main-blue animate-pulse cursor-pointer'/>
        </div> : (
        <table className="w-full text-white">
          <thead>
            <tr>
              <th className="text-left">Usuario</th>
              <th>Correo</th>
              <th>Hora Inicio</th>
              <th>Hora Fin</th>
              <th>Cancha</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reserva) => (
              <tr key={reserva.id} className="border-b border-neutral-700">
                <td className="flex items-center py-2">
                  <img 
                    src={reserva.user.profile_picture_url} 
                    alt={`${reserva.user.first_name} ${reserva.user.last_name}`} 
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  {`${reserva.user.first_name} ${reserva.user.last_name}`}
                </td>
                <td className="text-center">{reserva.user.email}</td>
                <td className="text-center">{reserva.start_time}</td>
                <td className="text-center">{reserva.end_time}</td>
                <td className="text-center">{reserva.field.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
      </div>
      
      <div className="col-span-1 bg-neutral-800 p-4 rounded-lg">
        <h3 className="text-white font-bold text-2xl mb-4">Ocupación de Canchas</h3>
        {fieldOccupancy.map((cancha) => (
          <div key={cancha.name} className="flex items-center mb-4">
            <img 
              src={cancha.avatar} 
              alt={cancha.name} 
              className="w-12 h-12 rounded-lg mr-3"
            />
            <div>
              <p className="text-white font-semibold">{cancha.name}</p>
              <div className="flex items-center">
                <p className="text-gray-400 mr-2">{cancha.ocupacion}%</p>
                {cancha.cambio > 0 ? (
                  <ArrowUp className="text-green-500" size={16} />
                ) : (
                  <ArrowDown className="text-red-500" size={16} />
                )}
                <p className={`ml-1 ${cancha.cambio > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {Math.abs(cancha.cambio)}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservasYOcupacion;