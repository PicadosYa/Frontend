import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCreateReservation } from '../../services/ReservationService';
import { validateReservation } from './validation';

const MercadoPagoReservationHandler = ({ 
  field 
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const createReservation = useCreateReservation();


  useEffect(() => {
    // Extraer query params
    const searchParams = new URLSearchParams(location.search);
    const paymentId = searchParams.get('payment_id');
    const preferenceId = searchParams.get('preference_id');
    const status = searchParams.get('status');

    // Función para manejar la reserva
    const handleReservationConfirmation = () => {
      // 1. Obtener reserva pendiente del localStorage
      const reservaPendiente = JSON.parse(localStorage.getItem('reservaPendiente'));

      // Verificaciones de seguridad
      if (!reservaPendiente) {
        toast.warn('No hay reservas pendientes');
        return;
      }

      // 2. Verificar que los preference_id coincidan
      if (reservaPendiente.preferenceId !== preferenceId) {
        toast.error('El ID de preferencia no coincide');
        return;
      }

      // 3. Validar la reserva
      const validationResult = validateReservation(
        reservaPendiente, 
        field?.reservations
      );

      if (validationResult.error?.errors) {
        toast.error('La reserva no pasó la validación');
        return;
      }

      // 4. Añadir payment_id a la reserva pendiente
      const reservaConPago = {
        ...reservaPendiente,
        payment_id: parseInt(paymentId), // Convertir a entero el paymentId
      };
      
      

      // 5. Crear la reserva
      createReservation.mutate(reservaConPago, {
        onSuccess: () => {
          // 6. Borrar reserva del localStorage si es exitoso
          localStorage.removeItem('reservaPendiente');
          
          toast.success("Reserva creada exitosamente");
          navigate('/mis-reservas');
        },
        onError: (error) => {
          toast.error(`Error al crear la reserva: ${error.message}`);
        }
      });
    };
//preference_id=29578319-af9c4170-a1b3-488b-9590-278f852d8208
    // Verificar si todos los parámetros necesarios están presentes
    if (paymentId && preferenceId && status === 'approved') {
      handleReservationConfirmation();
    }
  }, [location, field]);

  return null; // No renderiza nada, solo maneja la lógica
};

export default MercadoPagoReservationHandler;