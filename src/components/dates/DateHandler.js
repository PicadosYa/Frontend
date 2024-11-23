class DateHandler {
  constructor(disabledDates, selectedDate, interval) {
    this.disabledDates = disabledDates;
    this.selectedDate = selectedDate;
    this.interval = interval;
    
    // Validar el formato de los parámetros
    this.validateParams();
  }

  validateParams() {
    // Validar que disabledDates sea un array con el formato correcto
    if (!Array.isArray(this.disabledDates)) {
      throw new Error('disabledDates debe ser un array');
    }

    // Validar el formato de cada objeto en disabledDates
    this.disabledDates.forEach(date => {
      if (!date.Date || !date.StartTime || !date.EndTime) {
        throw new Error('Cada objeto en disabledDates debe tener Date, StartTime y EndTime');
      }
    });

    // Validar que selectedDate sea una fecha válida
    if (!this.isValidDate(this.selectedDate)) {
      throw new Error('selectedDate debe ser una fecha válida en formato YYYY-MM-DD');
    }

    // Validar que interval sea un número positivo
    if (typeof this.interval !== 'number' || this.interval <= 0) {
      throw new Error('interval debe ser un número positivo');
    }
  }

  isValidDate(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
  }

  // Convertir hora en formato "HH:mm" a minutos
  timeToMinutes(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  // Convertir minutos a formato "HH:mm"
  minutesToTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  }

  getDays() {
    const result = [];
    const totalMinutesInDay = 24 * 60;
    
    // Encontrar las restricciones para el día seleccionado
    const restrictions = this.disabledDates.filter(date => date.Date === this.selectedDate);
    
    // Generar todas las horas del día con el intervalo especificado
    for (let minutes = 0; minutes < totalMinutesInDay; minutes += this.interval) {
      const currentTime = this.minutesToTime(minutes);
      let enabled = true;

      // Verificar si la hora actual está dentro de algún rango deshabilitado
      for (const restriction of restrictions) {
        const startMinutes = this.timeToMinutes(restriction.StartTime);
        const endMinutes = this.timeToMinutes(restriction.EndTime);
        
        if (minutes >= startMinutes && minutes <= endMinutes) {
          enabled = false;
          break;
        }
      }

      result.push({
        hour: currentTime,
        enabled: enabled
      });
    }

    return result;
  }
}

export default DateHandler;