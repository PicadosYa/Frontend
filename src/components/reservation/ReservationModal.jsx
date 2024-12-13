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
import {
  ReservationService,
  useCreateReservation,
} from "../../services/ReservationService";
import ReservationForm from "./ReservationForm";
import { toast, ToastContainer } from "react-toastify";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import PicadosYaLoader from "../../assets/rayo-picados-ya-loader";
import { ProfileIcon } from "../register/HeaderSession";
import PayPalPaymentButton from "./PaypalButtons";

const ReservationModal = ({ show, onClose, field }) => {
  const user = useAuth().auth;
  const [selectedDate, setSelectedDate] = useState(new TZDate());
  const [errors, setErrors] = useState([]);
  const [preferenceId, setPreferenceId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paypalButton, setPaypalButton] = useState(false);
  const createReservation = useCreateReservation();
  const { form, setForm } = useForm({
    field_id: field?.id,
    date: parseDate(selectedDate),
    start_time: "00:00",
    end_time: "00:00",
    user_id: user?.id,
    status: "reserved",
  });

  initMercadoPago("TEST-12466856-e444-43c0-bb7e-98bd98313884", {
    locale: "es-UY",
  });

  useEffect(() => {
    setErrors(validateReservation(form, field?.reservations).error?.errors);
    setPreferenceId(null);
  }, [form, field]);

  useEffect(() => {
    form.field_id = field?.id;
    form.user_id = user?.id;
  }, [field, user, form]);

  useEffect(() => {
    if (!preferenceId) return;
    localStorage.setItem(
      "reservaPendiente",
      JSON.stringify({ ...form, preferenceId })
    );
  }, [preferenceId]);

  const createPreference = () => {
    if (errors?.length > 0) {
      toast.error("Por favor, corrija los errores en el formulario.");

      return;
    }
    setIsLoading(true);
    const totalPrice =
      errors?.length > 0
        ? field?.price
        : (field?.price *
            timeDifferenceInMinutes(form.start_time, form.end_time)) /
          60;
    ReservationService.createPreference(field, user, totalPrice).then((id) =>
      setPreferenceId(id)
    );
  };

  const createPaypalButtons = ()=>{
    if (errors?.length > 0) {
      toast.error("Por favor, corrija los errores en el formulario.");

      return;
    }
    setIsLoading(true);
    setPaypalButton(true)
  }

  if (!show) return null;

  return (
    <>
      <ToastContainer />
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="bg-gradient-to-b from-[#1a39d2] to-[#0d1d6c] rounded-[25px] shadow border border-black/20">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-transparent outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <img className="w-52 h-[56.80px]" src="/logo-picados-ya.png" />
                <button className="text-white" onClick={() => onClose()}>
                  X
                </button>
              </div>
              <div className="relative p-6 flex-auto">
                <div className="container mx-auto p-4 flex flex-col gap-8 ">
                  <div className="bg-white flex flex-col shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-3xl p-6 mb-2">
                    <div className="mt-[-80px] flex justify-center items-center flex-col gap-4">
                      {/* <img
                        src={user.profile_picture_url ? user.profile_picture_url : "/Proyecto nuevo 1.png"}
                        alt=""
                        className="shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-full relative h-[120px] w-[120px]"
                      /> */}
                      <div className="h-[120px] w-[120px]">

                      <ProfileIcon 
                        auth={user}
                        noAction={true}
                      />
                      </div>
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
              <div className="flex flex-col gap-4 items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
                <div>
                  <h4 className="text-xl text-white font-bold">
                    Total a pagar: UYU $
                    {errors?.length > 0
                      ? field?.price
                      : (field?.price *
                          timeDifferenceInMinutes(
                            form.start_time,
                            form.end_time
                          )) /
                        60}
                  </h4>
                </div>
                <button
                  type="button"
                  className="w-[331px] h-[65px] relative bg-gradient-to-r from-[#ed3c16] via-[#ff491c] to-[#ff6341] rounded-[25px] shadow border-2 border-white/0"
                  onClick={createPaypalButtons}
                >
                  <div className="w-72 h-[65px] p-[15px] left-[25px] top-0 absolute bg-white/0 rounded-[10px] justify-center items-center gap-[15px] inline-flex">
                    {isLoading ? (
                      <PicadosYaLoader className="h-[35px]" />
                    ) : (
                      <div className="w-[234px] h-[35px] text-white text-xl font-bold font-['Exo']">
                        Confirmar reserva
                      </div>
                    )}
                  </div>
                </button>
                {preferenceId && (
                  <Wallet
                    customization={{ texts: { valueProp: "smart_option" } }}
                    preferenceId={preferenceId}
                    initialization={{ preferenceId: preferenceId }}
                    onReady={() => setIsLoading(false)}
                  />
                )}
                {paypalButton && (
                  <div className="fixed top-0 left-auto w-2/5 h-[95vh] max-h-[95vh] flex justify-center items-center overflow-scroll bg-white p-4 rounded-[25px] shadow border-2 ">
                    <div className=" relative w-full h-full ">

                  <PayPalPaymentButton amount={((field?.price * timeDifferenceInMinutes(form.start_time, form.end_time)) / 60) / 40} reservation={form} />
                  <div className="absolute top-[-20px] right-[-10px] cursor-pointer text-neutral-900 font-bold hover:text-red-600"
                  onClick={() => setPaypalButton(false)}>X</div>
                    </div>
                  </div>
                )}
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
