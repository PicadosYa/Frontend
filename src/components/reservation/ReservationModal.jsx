import PropTypes from "prop-types";
import { DayPicker } from "react-day-picker";
import { es } from "react-day-picker/locale";
import {
  MdLocationPin,
  MdKeyboardArrowDown,
  MdOutlineDateRange,
  MdPhone,
} from "react-icons/md";
import { useEffect, useState } from "react";
import { TZDate } from "react-day-picker";
import SVGRayo from "../../../public/rayo-picados-ya";
import { useAuth, useForm } from "../../hooks";
import { validateReservation } from "./validation";
import { parseDate, timeDifferenceInMinutes } from "./utils/utils";
import { useCreateReservation } from "../../services/ReservationService";
import ReservationForm from "./ReservationForm";
import { toast, ToastContainer } from "react-toastify";

const ReservationModal = ({ show, onClose, field }) => {
  const user = useAuth().auth;
  const [selectedDate, setSelectedDate] = useState(new TZDate());
  const [errors, setErrors] = useState([]);
  const createReservation = useCreateReservation();
  const { form, setForm } = useForm({
    field_id: field?.id,
    date: parseDate(selectedDate),
    start_time: "00:00",
    end_time: "00:00",
    user_id: user?.id,
    status: "reserved",
  });

  useEffect(() => {
    setErrors(validateReservation(form, field?.reservations).error?.errors);
  }, [form, field]);

  useEffect(() => {
    form.field_id = field?.id;
    form.user_id = user?.id;
  }, [field, user, form]);

  const handleSubmit = () => {
    if (errors?.length > 0) {
      return;
    }
    console.log(form);

    createReservation.mutate(form, {
      onSuccess: () => {
        toast.success("Reserva creada exitosamente");
        window.location.reload();
      },
      onError: (error) => {
        toast.error(`Error al crear la reserva: ${error.message}`);
      },
    });
  };

  if (!show) return null;

  return (
    <>
    <ToastContainer />
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="bg-gradient-to-b from-[#1a39d2] to-[#0d1d6c] rounded-[25px] shadow border border-black/20">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-transparent outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <img className="w-52 h-[56.80px]" src="/logo-picados-ya.png" />
                <button className="text-white" onClick={() => onClose()}>
                  X
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <div className="container mx-auto p-4 flex flex-col gap-8 ">
                  <div className="bg-white flex flex-col shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-3xl p-6 mb-2">
                    <div className="mt-[-80px] flex justify-center items-center flex-col gap-4">
                      <img
                        src="/Proyecto nuevo 1.png"
                        alt=""
                        className="shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-full relative"
                      />

                      <div className="flex flex-col gap-1 items-center">
                        <h3 className="text-gray-900 font-bold">
                          {user.firstname} {user?.lastname}
                        </h3>
                        <h6 className="text-orange-dark">{user.email}</h6>
                        <div className="bg-main-blue p-2 rounded-3xl text-white flex items-center gap-2">
                          <MdPhone />
                          <h6>{user.phone}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ReservationForm
                    reservations={field?.reservations}
                    form={form}
                    setForm={setForm}
                  />
                  <div className="errors flex justify-center">
                    {errors?.length > 0 && (
                      <p className="text-red-500">{errors[0].message}</p>
                    )}
                  </div>
                  <div className="flex justify-center items-center gap-8">
                    <div className="flex">
                      <SVGRayo className="h-8" uniqueGradientId="picados-ya" />
                      <h4 className="text-white text-2xl font-bold">
                        {field.name}
                      </h4>
                    </div>
                    <div>
                      <h6 className="text-white text-xl font-bold">
                        UYU ${field.price}/h
                      </h6>
                    </div>
                  </div>
                </div>
              </div>

              {/*footer*/}
              <div className="flex flex-col gap-4 items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
                <div>
                  <h4 className="text-xl text-white font-bold">
                    Total a pagar: UYU $
                    {errors?.length > 0
                      ? field.price
                      : (field.price *
                          timeDifferenceInMinutes(
                            form.start_time,
                            form.end_time
                          )) /
                        60}
                  </h4>
                </div>
                <button type="button" onClick={() => handleSubmit()}>
                  <div className="w-[331px] h-[65px] relative bg-gradient-to-r from-[#ed3c16] via-[#ff491c] to-[#ff6341] rounded-[25px] shadow border-2 border-white/0">
                    <img
                      className="w-[19px] h-[37px] left-[30px] top-[14px] absolute rounded-[60px] shadow"
                      src="/rayo-picados-ya.png"
                    />
                    <div className="w-72 h-[65px] p-[15px] left-[25px] top-0 absolute bg-white/0 rounded-[10px] justify-center items-center gap-[15px] inline-flex">
                      <div className="w-[234px] h-[35px] text-white text-2xl font-bold font-['Exo']">
                        Confirmar y pagar
                      </div>
                    </div>
                  </div>
                </button>
                <button className="bg-cyan-500 text-white active:bg-cyan-600 font-bold uppercase text-sm px-6 py-3 rounded-3xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 h-[65px] w-[331px]">
                  Pagar con mercado pago
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

ReservationModal.propTypes = {
  field: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    phone: PropTypes.string.isRequired,
    photos: PropTypes.arrayOf(PropTypes.string),
    reservations: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string,
  }),
  show: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ReservationModal;
