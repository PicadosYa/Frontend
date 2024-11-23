import { MdKeyboardArrowDown } from "react-icons/md";
import DateHandler from "./DateHandler";
import PropTypes from "prop-types";

const HourInput = ({
  selectedDate,
  disabledDates,
  interval,
  hourDropdown,
  setHourDropdown,
  type = 1,
  selectedHour,
  onHourSelect,
  className = "",
}) => {
  const dateHandler = new DateHandler(disabledDates || [], selectedDate || '', interval || 30);
  const hours = dateHandler.getDays();

  return (
    <div className={`${className} bg-main-blue w-full left-0 text-sm  font-normal flex justify-between gap-2  shadow-[0px_2px_2px_rgba(0,0,0,0.95)] p-2 py-2 relative  `}>
      <p className="flex w-full">
        {type === 1 ? "Desde" : "Hasta"}: {selectedHour || "Seleccionar"}
      </p>
      <MdKeyboardArrowDown
        className="cursor-pointer"
        onClick={() => setHourDropdown(!hourDropdown)}
      />
      
      {hourDropdown && (
        <div className="bg-main-blue backdrop-blur-sm w-full absolute top-[100%] left-0 text-sm rounded-b-3xl font-normal flex flex-col justify-between gap-2 text-white shadow-[0px_2px_2px_rgba(0,0,0,0.95)] p-2 py-4 overflow-scroll h-[200px] z-10">
          {hours.map((timeSlot, index) => (
            <div
              key={index}
              className={`p-2 hover:bg-opacity-20 hover:bg-white cursor-pointer rounded transition-colors ${
                !timeSlot.enabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={() => {
                if (timeSlot.enabled && onHourSelect) {
                  onHourSelect(timeSlot.hour);
                  setHourDropdown(false);
                }
              }}
            >
              {timeSlot.hour}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

HourInput.propTypes = {
  selectedDate: PropTypes.string,
  disabledDates: PropTypes.array,
  interval: PropTypes.number,
  hourDropdown: PropTypes.bool,
  setHourDropdown: PropTypes.func,
  type: PropTypes.number,
  selectedHour: PropTypes.string,
  onHourSelect: PropTypes.func,
  className: PropTypes.string,
};

export default HourInput;
