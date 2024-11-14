import {useState} from 'react'
import {
  MdLocationPin,
  MdKeyboardArrowDown,
  MdOutlineDateRange,
} from "react-icons/md";
import { FiClock } from "react-icons/fi";
import { TbListDetails } from "react-icons/tb";
import { DayPicker } from "react-day-picker";
import { es } from "react-day-picker/locale";

const SearchBanner = () => {
  const [ubicationDropdown, setUbicationDropdown] = useState(false);
  const [dateDropdown, setDateDropdown] = useState(false);
  const [hourDropdown, setHourDropdown] = useState(false);
  const [fromHourDropdown, setFromHourDropdown] = useState(false);
  const [toHourDropdown, setToHourDropdown] = useState(false);
  const [typeDropdown, setTypeDropdown] = useState(false);

  return (
    <div className="w-full flex flex-col gap-[50px] bg-opacity-50 bg-black px-[90px] pt-6">
          <div className="flex justify-between mb-6 gap-5">
            <div className="w-full h-12 bg-gradient-to-r from-main-blue to-dark-blue text-white font-bold text-xl rounded-lg p-2 shadow-[0px_1px_1px_rgba(0,0,0,0.25)] flex justify-between items-center cursor-pointer relative">
              <div className="flex gap-2 items-center">
                <MdLocationPin />
                Ubicación
              </div>
              <MdKeyboardArrowDown
                onClick={() => setUbicationDropdown(!ubicationDropdown)}
              />

              {ubicationDropdown && (
                <div className="bg-dark-blue-opacity backdrop-blur-sm w-full absolute top-[100%] left-0 text-sm rounded-b-3xl px-[26px] py-[20px] font-normal flex flex-col gap-2 text-white shadow-[0px_2px_2px_rgba(0,0,0,0.95)]">
                  <p>Canchas a 3Km</p>
                  <p>Canchas a 5Km</p>
                  <p>Canchas a 7Km</p>
                </div>
              )}
            </div>

            <div className="w-full h-12 bg-gradient-to-r from-main-blue to-dark-blue text-white font-bold text-xl rounded-lg p-2 shadow-[0px_1px_1px_rgba(0,0,0,0.25)] flex justify-between items-center cursor-pointer relative">
              <div className="flex gap-2 items-center">
                <MdOutlineDateRange />
                Fecha
              </div>
              <MdKeyboardArrowDown
                onClick={() => setDateDropdown(!dateDropdown)}
              />

              {dateDropdown && (
                <div
                  className="bg-dark-blue-opacity  backdrop-blur-sm w-full absolute top-[100%] left-0 text-sm rounded-b-3xl 
             font-normal flex flex-col gap-2 text-white shadow-[0px_2px_2px_rgba(0,0,0,0.95)] p-2 py-4"
                >
                  <DayPicker
                    mode="single"
                    styles={{
                      chevron: {
                        fill: "white",
                      },
                      button_next: {
                        fill: "white",
                      },
                    }}
                    classNames={{
                      root: "text-xs",
                      month_caption:
                        "text-white font-bold w-full flex justify-center pb-4 text-sm",
                      selected: "bg-orange-dark rounded-full ",
                      month_grid: "w-full flex flex-col gap-2",
                      weekdays: "w-full grid grid-cols-7 gap-6 pb-2",
                      weeks: "w-full flex flex-col gap-4",
                      week: "w-full grid grid-cols-7 gap-6",
                      day: "cursor-pointer text-center",
                      day_disabled: "text-gray-400",
                      outside: "text-gray-500",
                      day_outside_range: "text-gray-400",
                      day_selected: "bg-dark-orange rounded-full",
                      nav: "flex justify-between",
                      chevron:
                        "fill-white mb-[-24px] hover:fill-orange-dark transition-colors",
                    }}
                    lang="es"
                    locale={es}
                  />
                </div>
              )}
            </div>

            <div className="w-full h-12 bg-gradient-to-r from-main-blue to-dark-blue text-white font-bold text-xl rounded-lg p-2 shadow-[0px_1px_1px_rgba(0,0,0,0.25)] flex justify-between items-center cursor-pointer relative">
              <div className="flex gap-2 items-center">
                <FiClock />
                Hora
              </div>
              <MdKeyboardArrowDown
                onClick={() => setHourDropdown(!hourDropdown)}
              />

              {hourDropdown && (
                <div
                  className="bg-dark-blue-opacity backdrop-blur-sm w-full absolute top-[100%] left-0 text-sm rounded-b-3xl 
             font-normal flex justify-between gap-10 text-white shadow-[0px_2px_2px_rgba(0,0,0,0.95)] p-2 py-4"
                >
                  <div
                    className="bg-main-blue w-full  top-[100%] left-0 text-sm rounded-[10px] 
              font-normal flex justify-between gap-2 text-white shadow-[0px_2px_2px_rgba(0,0,0,0.95)] p-2 py-2 relative"
                  >
                    <p>Desde</p>
                    <MdKeyboardArrowDown
                      onClick={() => setFromHourDropdown(!fromHourDropdown)}
                    />

                    {fromHourDropdown && (
                      <div
                        className="bg-main-blue backdrop-blur-sm w-full absolute top-[100%] left-0 text-sm rounded-b-3xl 
             font-normal flex flex-col justify-between gap-2 text-white shadow-[0px_2px_2px_rgba(0,0,0,0.95)] p-2 py-4 overflow-scroll h-[200px]"
                      >
                        <p className="hover:font-bold">07:00</p>
                        <p className="hover:font-bold">08:00</p>
                        <p className="hover:font-bold">09:00</p>
                        <p className="hover:font-bold">10:00</p>
                        <p className="hover:font-bold">11:00</p>
                        <p className="hover:font-bold">12:00</p>
                        <p className="hover:font-bold">13:00</p>
                        <p className="hover:font-bold">14:00</p>
                        <p className="hover:font-bold">15:00</p>
                        <p className="hover:font-bold">16:00</p>
                        <p className="hover:font-bold">17:00</p>
                        <p className="hover:font-bold">18:00</p>
                        <p className="hover:font-bold">19:00</p>
                        <p className="hover:font-bold">20:00</p>
                        <p className="hover:font-bold">21:00</p>
                        <p className="hover:font-bold">22:00</p>
                        <p className="hover:font-bold">23:00</p>
                      </div>
                    )}
                  </div>
                  <div
                    className="bg-main-blue w-full top-[100%] left-0 text-sm rounded-[10px] 
              font-normal flex justify-between gap-2 text-white shadow-[0px_2px_2px_rgba(0,0,0,0.95)] p-2 py-2 relative"
                  >
                    <p>Hasta</p>
                    <MdKeyboardArrowDown
                      onClick={() => setToHourDropdown(!toHourDropdown)}
                    />

                    {toHourDropdown && (
                      <div
                        className="bg-main-blue backdrop-blur-sm w-full absolute top-[100%] left-0 text-sm rounded-b-3xl 
             font-normal flex flex-col justify-between gap-2 text-white shadow-[0px_2px_2px_rgba(0,0,0,0.95)] p-2 py-4 overflow-scroll h-[200px]"
                      >
                        <p className="hover:font-bold">07:00</p>
                        <p className="hover:font-bold">08:00</p>
                        <p className="hover:font-bold">09:00</p>
                        <p className="hover:font-bold">10:00</p>
                        <p className="hover:font-bold">11:00</p>
                        <p className="hover:font-bold">12:00</p>
                        <p className="hover:font-bold">13:00</p>
                        <p className="hover:font-bold">14:00</p>
                        <p className="hover:font-bold">15:00</p>
                        <p className="hover:font-bold">16:00</p>
                        <p className="hover:font-bold">17:00</p>
                        <p className="hover:font-bold">18:00</p>
                        <p className="hover:font-bold">19:00</p>
                        <p className="hover:font-bold">20:00</p>
                        <p className="hover:font-bold">21:00</p>
                        <p className="hover:font-bold">22:00</p>
                        <p className="hover:font-bold">23:00</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="w-full h-12 bg-gradient-to-r from-main-blue to-dark-blue text-white font-bold text-xl rounded-lg p-2 shadow-[0px_1px_1px_rgba(0,0,0,0.25)] flex justify-between items-center cursor-pointer relative">
              <div className="flex gap-2 items-center">
                <TbListDetails />
                Tipo
              </div>
              <MdKeyboardArrowDown
                onClick={() => setTypeDropdown(!typeDropdown)}
              />

              {typeDropdown && (
                <div className="bg-dark-blue-opacity backdrop-blur-sm w-full absolute top-[100%] left-0 text-sm rounded-b-3xl px-[26px] py-[20px] font-normal flex flex-col gap-2 text-white shadow-[0px_2px_2px_rgba(0,0,0,0.95)]">
                  <p className="hover:font-bold">Canchas de futbol 7</p>
                  <p className="hover:font-bold">Canchas de futbol 5</p>
                  <p className="hover:font-bold">Canchas de futbol 11</p>
                </div>
              )}
            </div>
          </div>

          {/* Botón central */}
          <div className="flex justify-center mb-8">
            <button className="bg-gradient-to-r from-orange-dark to-orange-light text-white rounded-[25px] px-[170px] border-solid border-[#ffffff35] border-[3px] text-xl font-bold  transition-colors h-[67px] flex items-center">
              <img className="hover:translate-y-[-5px] transition-transform" src="/rayo-picados-ya.png" />
            </button>
          </div>
        </div>
  )
}

export default SearchBanner