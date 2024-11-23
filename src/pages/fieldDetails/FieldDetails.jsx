import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FieldsService, useField } from "../../services/FieldsService";
import ReservationModal from "../../components/reservation/ReservationModal";
import { Rating, Star } from "@smastrom/react-rating";
import { useAuth } from "../../hooks";

const FieldDetails = () => {
  const [showReservationModal, setShowReservationModal] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { auth } = useAuth();
  const [data, setData] = useState(null);

  console.log(id);
  //const { data, error } = useField(id);

  async function fetchData() {
    try {
      const data = await FieldsService.getField(id);
      setData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    fetchData();

  }, []);

  return (
    <>
      <ReservationModal
        show={showReservationModal}
        onClose={setShowReservationModal}
        field={data}
        user={auth}
      />
      <div className="fixed  bg-dark-blue-opacity inset-0 flex justify-center items-center z-10">
        <div
          className="fixed z-[-1] top-0 left-0 h-screen w-screen"
          onClick={(e) => {
            e.stopPropagation();
            navigate("/");
          }}
        ></div>
        <div
          className="flex w-[70%] max-h-[95%]  items-center justify-center bg-white rounded-[25px] shadow-lg p-6"
          style={{
            background:
              "linear-gradient(to bottom, rgba(26, 57, 210, 1), rgba(13, 29, 108, 1))",
          }}
        >
          <div className="flex flex-col gap-6 w-full h-full">
            <div className="max-h-[300px]">
              <DynamicGrid images={data?.photos} />
            </div>

            {/* Sección inferior */}
            <div className="flex justify-between">
              {/* Contenedor izquierdo */}
              <div className="flex flex-col gap-4">
                {/* Contenedor de título, subtítulo y dirección */}
                <div
                  className="w-[534px]  bg-gray-200 p-4 rounded-[25px] flex justify-between items-center"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(26, 57, 210, 1), rgba(13, 29, 108, 1))",
                    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.42)",
                  }}
                >
                  {/* Título, subtítulo y dirección */}
                  <div className="">
                    <h2
                      className="text-[32px] font-normal text-white leading-normal font-exo"
                      style={{
                        WebkitTextStrokeWidth: "1px",
                        WebkitTextStrokeColor: "rgba(26, 57, 210, 0.35)",
                      }}
                    >
                      {data?.name}
                    </h2>
                    <p className="text-[24px] font-bold text-white leading-normal font-exo">
                      {data?.neighborhood}
                    </p>
                    <p
                      className="text-[16px] font-normal text-white leading-normal font-ubuntu"
                      style={{
                        textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                      }}
                    >
                      {data?.address}
                    </p>
                  </div>

                  {/* Estrellas */}
                  {/* <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src="/path/to/star-icon.png" // Cambiar por el ícono real
                    alt="Estrella"
                    className="w-5 h-5"
                  />
                ))}
              </div>
 */}
                  {/* Imágenes a la derecha */}
                  <div className="flex flex-col items-center space-y-2">
                    <img
                      src="/favicon.ico" // Cambiar por la ruta de la imagen real
                      alt="Imagen 1"
                      className="w-[36px] h-[51px] rounded-lg shadow-md"
                    />
                    <Rating
                      readOnly
                      value={3.5}
                      className="h-10  max-w-16"
                      itemStyles={{
                        itemShapes: Star,
                        activeFillColor: "#ffb700",
                        inactiveFillColor: "#fbf1a9",
                      }}
                    />
                  </div>
                </div>

                {/* Contenedor de texto */}
                <div
                  className="w-[534px]  bg-gray-200 p-4 rounded-[25px] overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(26, 57, 210, 1), rgba(13, 29, 108, 1))",
                    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.42)",
                  }}
                >
                  <p
                    className="text-[16px] font-normal text-white leading-normal font-ubuntu"
                    style={{
                      textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    {data?.description}
                  </p>
                </div>
              </div>

              {/* Contenedor derecho */}
              <div className="flex flex-col items-center space-y-4">
                {/* Botones pequeños */}
                <div
                  className="w-[370px] bg-gray-200 p-4 rounded-[25px] space-x-2 space-y-2"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(26, 57, 210, 1), rgba(13, 29, 108, 1))",
                    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.42)",
                  }}
                >
                  {data?.services?.map(service => (
                    <button
                      key={service.id}
                      className="h-[21px] px-4 ml-2 bg-orange-500 text-white rounded-[25px] text-[10px] font-normal leading-normal font-ubuntu"
                      style={{
                        background:
                          "linear-gradient(to right, rgba(237, 60, 22, 1), rgba(243, 64, 24, 1), rgba(241, 74, 37, 1), rgba(255, 99, 65, 1))",
                        textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.42)",
                      }}
                    >
                      {service?.name}
                    </button>
                  ))}

                  <div className="flex items-center justify-end gap-2">
                    <img src="/WhatsApp 1.png" alt="" />
                    <span className="flex items-center justify-end text-[16px] font-normal text-white leading-normal font-ubuntu">
                      {data?.phone}
                    </span>
                  </div>
                </div>

                {/* Botón grande */}
                <div className="flex items-center justify-center pt-14">
                  <button
                    className="flex justify-evenly w-[331px] h-16 bg-orange-500 items-center  rounded-[25px] text-[24px] font-bold text-white leading-normal font-exo"
                    style={{
                      background:
                        "linear-gradient(to right, rgba(237, 60, 22, 1), rgba(243, 64, 24, 1), rgba(241, 74, 37, 1), rgba(255, 99, 65, 1))",
                      textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    }}
                    onClick={() =>
                      auth?.id ? setShowReservationModal(true) : navigate("/login")
                    }
                  >
                    <img
                      src="/rayo-picados-ya.png"
                      alt="Rayo del logo de picados ya"
                      className="w-[19px] h-[37px]"
                    />
                    ¡Quiero reservar!
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
  // La primera imagen será grande, las demás serán pequeñas
  if (!images) {
    return null;
  }
  const [bigImage, ...smallImages] = images;

  return (
    <div className="grid grid-cols-5 grid-rows-2 gap-2 w-full h-auto">
      {/* Imagen grande a la derecha */}
      {bigImage && (
        <div className="col-span-2 row-span-2">
          <img
            src={bigImage}
            alt="Large"
            className="w-full h-full  object-cover rounded-lg"
            style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.42)" }}
          />
        </div>
      )}

      {/* Imágenes pequeñas */}
      {smallImages.slice(0, 6).map((image, index) => (
        <div
          key={index}
          className="col-span-1 row-span-1"
          style={{ order: index }}
        >
          <img
            src={image}
            alt={`Small ${index}`}
            className="w-full h-full object-cover rounded-lg"
            style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.42)" }}
          />
        </div>
      ))}
    </div>
  );
};

export default FieldDetails;
