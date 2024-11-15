import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function Confirmation() {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [isStartTimeOpen, setIsStartTimeOpen] = useState(false);
  const [isEndTimeOpen, setIsEndTimeOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState("10:00 AM");
  const [endTime, setEndTime] = useState("11:00 AM");
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+1");

  const hours = [
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
    "09:00 PM",
  ];

  const countries = [
    { code: "+1", flag: "🇺🇸", name: "United States" },
    { code: "+52", flag: "🇲🇽", name: "Mexico" },
    { code: "+34", flag: "🇪🇸", name: "Spain" },
    { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
    { code: "+49", flag: "🇩🇪", name: "Germany" },
  ];

  const handleStartTimeSelect = (time) => {
    setStartTime(time);
    setIsStartTimeOpen(false);
  };

  const handleEndTimeSelect = (time) => {
    setEndTime(time);
    setIsEndTimeOpen(false);
  };

  const handleCountrySelect = (code) => {
    setSelectedCountryCode(code);
    setIsCountryDropdownOpen(false);
  };

  return (
    <div
      className="flex flex-col w-[644px] h-[486px] flex-shrink-0 rounded-[25px] p-10"
      style={{
        background:
          "linear-gradient(to bottom, rgba(26, 57, 210, 1), rgba(13, 29, 108, 1))",
      }}
    >
      {/* Logo en la esquina superior izquierda */}
      <img
        src="../../../public/Logo.png"
        alt="Logo"
        className="w-1/3 h-16 mb-4"
      />

      {/* Contenedor de las dos columnas */}
      <div className="flex space-x-10 mb-4 ml-6 mr-6">
        {/* Columna Izquierda */}
        <div className="flex flex-col space-y-4">
          <div>
            <label className="text-white">Nombre</label>
            <input
              type="text"
              className="w-full h-8 px-2 rounded-lg border border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label className="text-white">Cuenta de correo</label>
            <input
              type="email"
              className="w-full h-8 px-2 rounded-lg border border-gray-300 shadow-sm"
            />
          </div>
          <div className="relative">
            <button
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
              className="w-full h-10 rounded-lg text-white mt-2 shadow-sm"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(26, 57, 210, 1), rgba(13, 29, 108, 1))",
              }}
            >
              Fecha {selectedDate ? selectedDate.toLocaleDateString() : ""}
            </button>
            {isDatePickerOpen && (
              <div className="absolute z-10 mt-2">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => {
                    setSelectedDate(date);
                    setIsDatePickerOpen(false);
                  }}
                  inline

                  // calendarContainer={({ children }) => (
                  //     <div style={{ backgroundColor: 'rgba(21, 35, 93, 0.77)'}}>
                  //         {children}
                  //     </div>
                  // )}
                />
              </div>
            )}
          </div>
        </div>

        {/* Columna Derecha */}
        <div className="flex flex-col space-y-4">
          <div>
            <label className="text-white">Apellido</label>
            <input
              type="text"
              className="w-full h-8 px-2 rounded-lg border border-gray-300 shadow-sm"
            />
          </div>

          <div>
            <label className="text-white">Teléfono</label>
            <div className="flex space-x-2 relative">
              {/* Dropdown de país */}
              <button
                onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                className="w-16 h-8 px-2 rounded-lg border border-gray-300 shadow-sm bg-white flex items-center justify-center"
              >
                {selectedCountryCode}
              </button>
              {isCountryDropdownOpen && (
                <div className="absolute top-10 left-0 w-32 bg-white rounded-lg shadow-lg z-10 overflow-y-auto max-h-40">
                  {countries.map((country) => (
                    <div
                      key={country.code}
                      onClick={() => handleCountrySelect(country.code)}
                      className="flex items-center space-x-2 p-2 cursor-pointer hover:bg-gray-200"
                    >
                      <span>{country.flag}</span>
                      <span className="text-sm text-gray-700">
                        {country.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {country.code}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              <input
                type="tel"
                placeholder="Número"
                className="flex-grow h-8 px-2 rounded-lg border border-gray-300 shadow-sm"
              />
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setIsTimePickerOpen(!isTimePickerOpen)}
              className="w-full h-10 rounded-lg text-white mt-2 shadow-sm"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(26, 57, 210, 1), rgba(13, 29, 108, 1))",
              }}
            >
              Hora: {startTime} - {endTime}
            </button>
            {isTimePickerOpen && (
              <div
                className="absolute z-10 w-full rounded-lg p-4"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(26, 57, 210, 1), rgba(13, 29, 108, 1))",
                }}
              >
                <div className="flex space-x-4">
                  {/* Hora de inicio */}
                  <div className="relative w-1/2">
                    <button
                      onClick={() => setIsStartTimeOpen(!isStartTimeOpen)}
                      className="w-full h-8 text-white rounded-[25px] shadow-sm"
                      style={{
                        background:
                          "linear-gradient(to right, rgba(237, 60, 22, 1), rgba(243, 64, 24, 1), rgba(241, 74, 37, 1), rgba(255, 99, 65, 1))",
                      }}
                    >
                      {startTime}
                    </button>
                    {isStartTimeOpen && (
                      <div className="absolute mt-2 bg-white w-full rounded-lg shadow-lg p-2">
                        {hours.map((hour) => (
                          <div
                            key={hour}
                            onClick={() => handleStartTimeSelect(hour)}
                            className="cursor-pointer px-2 py-1 text-center text-orange-500 hover:bg-gray-200 rounded"
                          >
                            {hour}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Hora de finalización */}
                  <div className="relative w-1/2">
                    <button
                      onClick={() => setIsEndTimeOpen(!isEndTimeOpen)}
                      className="w-full h-8 text-white rounded-[25px] shadow-sm"
                      style={{
                        background:
                          "linear-gradient(to right, rgba(237, 60, 22, 1), rgba(243, 64, 24, 1), rgba(241, 74, 37, 1), rgba(255, 99, 65, 1))",
                      }}
                    >
                      {endTime}
                    </button>
                    {isEndTimeOpen && (
                      <div className="absolute mt-2 bg-white w-full rounded-lg shadow-lg p-2">
                        {hours.map((hour) => (
                          <div
                            key={hour}
                            onClick={() => handleEndTimeSelect(hour)}
                            className="cursor-pointer px-2 py-1 text-center text-orange-500 hover:bg-gray-200 rounded"
                          >
                            {hour}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Botón Confirmar y Pagar */}
      <div className="flex justify-center pt-12">
        <button
          className="w-1/2 h-12 rounded-[25px] text-white shadow-sm mt-4 flex items-center justify-center space-x-4"
          style={{
            background:
              "linear-gradient(to right, rgba(237, 60, 22, 1), rgba(243, 64, 24, 1), rgba(241, 74, 37, 1), rgba(255, 99, 65, 1))",
          }}
        >
          <img src="../../../public/image 37.png" alt="" className="w-4 h-8" />
          <span>Confirmar y pagar</span>
        </button>
      </div>
    </div>
  );
}
