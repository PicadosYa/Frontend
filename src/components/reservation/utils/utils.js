/**
 * Calcula la diferencia en minutos entre dos horas en formato "HH:mm".
 *
 * @param {string} startTime Hora de inicio en formato "HH:mm".
 * @param {string} endTime Hora de fin en formato "HH:mm".
 * @returns {number} Diferencia en minutos entre las dos horas.
 */
function timeDifferenceInMinutes(startTime, endTime) {
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  // Convertir horas y minutos a minutos totales desde la medianoche
  const startInMinutes = startHour * 60 + startMinute;
  const endInMinutes = endHour * 60 + endMinute;

  // Calcular la diferencia
  return endInMinutes - startInMinutes;
}

/**
 * Convierte una fecha en formato ISO "AAAA-MM-DD"
 * @param {Date} date La fecha a convertir
 * @returns {string} La fecha en formato ISO "AAAA-MM-DD"
 * @throws {Error} Si el argumento no es una instancia de Date
 */
function parseDate(date) {
  if (!typeof date == Date) {
    console.log(date);
    
    throw new Error("El argumento debe ser una fecha");
  }
  console.log(date);
  
  return `${date.getFullYear()}-${String(
              date.getMonth() + 1
            ).padStart(2, "0")}-${String(date.getDate()).padStart(
              2,
              "0"
            )}`
}

export { timeDifferenceInMinutes, parseDate };