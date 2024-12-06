import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FieldsService } from "../../services/FieldsService";
import ReservationModal from "../../components/reservation/ReservationModal";
import { Rating, Star } from "@smastrom/react-rating";
import { useAuth } from "../../hooks";
import { ToastContainer } from "react-toastify";
import MercadoPagoReservationHandler from "../../components/reservation/ReservationHandler";
import { MdPhone } from "react-icons/md";

const FieldDetails = () => {
  const [showReservationModal, setShowReservationModal] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { auth } = useAuth();
  const [data, setData] = useState(null);

  async function fetchData() {
    try {
      const data = await FieldsService.getField(id);
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <>
      <ToastContainer />
      <MercadoPagoReservationHandler />
      <ReservationModal
        show={showReservationModal}
        onClose={setShowReservationModal}
        field={data}
        user={auth}
      />
      
      <div className="fixed inset-0 bg-dark-blue-opacity flex items-center justify-center z-10 p-4">
        <div
          className="fixed z-[-1] top-0 left-0 h-screen w-screen"
          onClick={(e) => {
            e.stopPropagation();
            navigate("/");
          }}
        ></div>
        
        <div className="w-full max-w-6xl bg-gradient-to-b from-blue-800 to-blue-900 rounded-2xl shadow-lg overflow-auto max-h-[95vh]"
         style={{
            background:
              "linear-gradient(to bottom, rgba(26, 57, 210, 1), rgba(13, 29, 108, 1))",
          }}>
          <div className="p-6 space-y-6">
            {/* Image Gallery */}
            <div className="h-[300px] max-h-[300px]">
              <DynamicGrid images={data?.photos} />
            </div>

            {/* Content Container */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left Column */}
              <div className="flex flex-col space-y-6 w-full md:w-1/2">
                {/* Field Details Card */}
                <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-2xl p-6 text-white space-y-4">
                  <div>
                    <h2 className="text-3xl font-bold text-white drop-shadow-md">
                      {data?.name}
                    </h2>
                    <p className="text-xl font-semibold">{data?.neighborhood}</p>
                    <p className="text-sm opacity-90">{data?.address}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <Rating
                        readOnly
                        value={3.5}
                        className="h-10 max-w-16"
                        itemStyles={{
                          itemShapes: Star,
                          activeFillColor: "#ffb700",
                          inactiveFillColor: "#fbf1a9",
                        }}
                      />
                    </div>
                    <img
                      src="/favicon.ico"
                      alt="Field Icon"
                      className=" h-12 rounded-lg shadow-md object-cover"
                    />
                  </div>
                </div>

                {/* Description Card */}
                <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-2xl p-6 text-white">
                  <p className="text-sm leading-relaxed">{data?.description}</p>
                </div>
              </div>

              {/* Right Column */}
              <div className="flex flex-col space-y-6 w-full md:w-1/2">
                {/* Services and Contact Card */}
                <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-2xl p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {data?.services?.map(service => (
                      <button
                        key={service.id}
                        className="px-3 py-1 bg-gradient-to-r from-orange-dark to-orange-light text-white rounded-full text-xs"
                      >
                        {service.name}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center space-x-2 text-white">
                    <MdPhone alt="WhatsApp" className="w-6 h-6" />
                    <span className="text-sm">{data?.phone}</span>
                  </div>
                </div>

                {/* Reservation Button */}
                <div className="flex justify-center mt-auto">
                  <button
                    className="w-full max-w-xs py-4 bg-gradient-to-r from-orange-dark to-orange-light text-white rounded-2xl text-xl font-bold flex items-center justify-center space-x-2"
                    onClick={() => auth?.id ? setShowReservationModal(true) : navigate("/login")}
                  >
                    <img
                      src="/rayo-picados-ya.png"
                      alt="Rayo icon"
                      className="w-6 h-12"
                    />
                    <span>¡Quiero reservar!</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const DynamicGrid = ({ images }) => {
  if (!images?.length) return null;

  const [bigImage, ...smallImages] = images;

  return (
    <div className="grid grid-cols-3 md:grid-cols-5 grid-rows-2 gap-2 h-full">
      {bigImage && (
        <div className="col-span-2 row-span-2">
          <img
            src={bigImage}
            alt="Large view"
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>
      )}

      {smallImages.slice(0, 6).map((image, index) => (
        <div key={index} className="col-span-1 row-span-1">
          <img
            src={image}
            alt={`Gallery image ${index + 1}`}
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>
      ))}
    </div>
  );
};

export default FieldDetails;