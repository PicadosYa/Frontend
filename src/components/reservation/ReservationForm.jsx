import { useState } from "react";
import { DayPicker, TZDate } from "react-day-picker";
import PropTypes from "prop-types";
import { MdKeyboardArrowDown, MdOutlineDateRange } from "react-icons/md";
import { es } from "react-day-picker/locale";
import HourInput from "../dates/HourInput";
import { parseDate } from "./utils/utils";


const ReservationForm = ({ reservations, form, setForm }) => {
  const [dateDropdown, setDateDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new TZDate());
  const [disabledDays, setDisabledDays] = useState([{ before: new TZDate() }]);
  const [fromHourDropdown, setFromHourDropdown] = useState(false);
  const [toHourDropdown, setToHourDropdown] = useState(false);

  
  

  return (
    <form className="flex justify-between gap-4 min-w-[500px]">
      

      <div className="w-full flex flex-col">
        <label htmlFor="date" className="text-white text-sm">
          Fecha
        </label>
        <div
          className="w-full h-full bg-white text-black  rounded-3xl p-2 shadow-[0px_1px_1px_rgba(0,0,0,0.25)] flex justify-between items-center cursor-pointer relative"
          id="date"
        >
          <div className="flex gap-2 items-center text-sm">
            <MdOutlineDateRange />
            {form.date}
          </div>
          <MdKeyboardArrowDown onClick={() => setDateDropdown(!dateDropdown)} />

          {dateDropdown && (
            <div
              className="bg-dark-blue-opacity z-10 backdrop-blur-sm w-full absolute top-[100%] left-0 text-sm rounded-b-3xl 
                font-normal flex flex-col gap-2 text-white shadow-[0px_2px_2px_rgba(0,0,0,0.95)] p-2 py-4"
            >
              <DayPicker
                mode="single"
                selected={new Date(`${form.date}T00:00:00`)}
                onSelect={(day) => {
                  setForm((prev) => ({
                    ...prev,
                    date: parseDate(day),
                  }))
                }}
                disabled={disabledDays}
                startMonth={new TZDate()}
                endMonth={
                  new TZDate(
                    new Date().setFullYear(new TZDate().getFullYear() + 1)
                  )
                }
                styles={{
                  chevron: {
                    fill: "white",
                    hover: {},
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
                  button_previous:
                    "fill-white hover:fill-orange-dark disabled:fill-gray-700",
                  button_next:
                    "fill-white hover:fill-orange-dark disabled:fill-gray-700",
                  weekdays: "w-full grid grid-cols-7 gap-6 pb-2",
                  weeks: "w-full flex flex-col gap-4",
                  week: "w-full grid grid-cols-7 gap-6",
                  day: "cursor-pointer text-center",
                  disabled: "text-gray-500",
                  day_disabled: "text-gray-500",
                  outside: "text-gray-500",
                  day_outside_range: "text-gray-500",
                  day_selected: "bg-dark-orange rounded-full",
                  nav: "flex justify-between",
                  chevron: "mb-[-24px] transition-colors ",
                }}
                lang="es"
                locale={es}
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex w-full">
        <div className="mr-2 flex flex-col w-full">
          <label
            htmlFor="startHour"
            className="block text-sm font-medium text-white"
          >
            Hora de inicio
          </label>
          <HourInput
            selectedDate={form.date}
            disabledDates={reservations}
            setHourDropdown={setFromHourDropdown}
            hourDropdown={fromHourDropdown}
            interval={30}
            type={1}
            selectedHour={form.start_time}
            onHourSelect={(e) => setForm({ ...form, start_time: e })}
            className="w-full bg-white rounded-3xl text-black"
          />
        </div>
        <div className="flex flex-col w-full">
          <label
            htmlFor="endHour"
            className="block text-sm font-medium text-white"
          >
            Hora de fin
          </label>
          <HourInput
            selectedDate={form.date}
            disabledDates={reservations}
            setHourDropdown={setToHourDropdown}
            hourDropdown={toHourDropdown}
            interval={30}
            type={2}
            selectedHour={form.end_time}
            onHourSelect={(e) => setForm({ ...form, end_time: e })}
            className="w-full bg-white rounded-3xl text-black"
          />
        </div>
      </div>
    </form>
  );
};

ReservationForm.propTypes = {
  reservations: PropTypes.arrayOf(PropTypes.object).isRequired,
  form: PropTypes.shape({
    date: PropTypes.string.isRequired,
    start_time: PropTypes.string.isRequired,
    end_time: PropTypes.string.isRequired,
  }).isRequired,
  setForm: PropTypes.func.isRequired,
};
export default ReservationForm;
