import { z } from "zod";

const ReservationValidations = z
  .object({
    field_id: z.number().min(1, "El ID del campo es obligatorio"),
    date: z
      .string()
      .min(1, "La fecha es obligatoria")
      .refine(
        (date) => {
          let newDate = new Date();
          let newDateParsed = `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`
          return Date.parse(date) >= Date.parse(newDateParsed)
        },
        { message: "La fecha debe ser mayor a la fecha actual" }
      ),
    start_time: z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "El formato de hora debe ser HH:mm"),
    end_time: z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "El formato de hora debe ser HH:mm"),
    user_id: z.number().min(1, "El ID del usuario es obligatorio"),
    status: z.string().min(1, "El estado es obligatorio"),
  })
  .refine(
    (data) => {
      const [startHour, startMinute] = data.start_time.split(":").map(Number);
      const [endHour, endMinute] = data.end_time.split(":").map(Number);

      const startInMinutes = startHour * 60 + startMinute;
      const endInMinutes = endHour * 60 + endMinute;

      return endInMinutes > startInMinutes;
    },
    { message: "La hora de fin debe ser mayor que la hora de inicio", path: ["end_time"] }
  )
  .refine(
    (data) => {
      const [startHour, startMinute] = data.start_time.split(":").map(Number);
      const [endHour, endMinute] = data.end_time.split(":").map(Number);

      const startInMinutes = startHour * 60 + startMinute;
      const endInMinutes = endHour * 60 + endMinute;

      return endInMinutes - startInMinutes >= 30;
    },
    { message: "Debe haber al menos 30 minutos de diferencia entre las horas", path: ["end_time"] }
  )
  .refine(
    (data) => {
      const isValidTime = (time) => {
        const [, minutes] = time.split(":").map(Number);
        return minutes === 0 || minutes === 30;
      };

      return isValidTime(data.start_time) && isValidTime(data.end_time);
    },
    { message: "Las horas deben ser en punto (:00) o en media (:30)", path: ["start_time", "end_time"] }
  );

// Función auxiliar para convertir hora en formato "HH:mm" a minutos
const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

// Función para validar que dos rangos de tiempo se solapan
const isOverlapping = (start1, end1, start2, end2) => {
  const start1Minutes = timeToMinutes(start1);
  const end1Minutes = timeToMinutes(end1);
  const start2Minutes = timeToMinutes(start2);
  const end2Minutes = timeToMinutes(end2);

  return (
    (start1Minutes >= start2Minutes && start1Minutes < end2Minutes) ||  // Inicio dentro del rango existente
    (end1Minutes > start2Minutes && end1Minutes <= end2Minutes) ||      // Fin dentro del rango existente
    (start1Minutes <= start2Minutes && end1Minutes >= end2Minutes)      // Rango existente dentro del nuevo rango
  );
};

const validateReservation = (data, existingReservations = []) => {
  if (!existingReservations) {
    existingReservations = [];
  }
  // Primero validamos con el esquema base
  const baseValidation = ReservationValidations.safeParse(data);
  
  if (!baseValidation.success) {
    return baseValidation;
  }
  console.log("paso validacion principal");
  
  // Si pasa la validación base, verificamos solapamiento con reservas existentes
  const overlappingReservation = existingReservations.find(
    reservation => 
      reservation.Date === data.date && 
      isOverlapping(
        data.start_time,
        data.end_time,
        reservation.StartTime,
        reservation.EndTime
      )
  );

  if (overlappingReservation) {
    return {
      success: false,
      error: {
        errors: [{
          code: "custom",
          path: ["start_time", "end_time"],
          message: "El horario seleccionado se solapa con una reserva existente"
        }],
        name: "ZodError"
      }
    };
  }

  return { success: true, data };
};

export { validateReservation };