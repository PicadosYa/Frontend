import PropTypes from "prop-types";
import styles from "./ReservationTable.module.css";
import editIcon from "./svg/edit.svg";
import deleteIcon from "./svg/delete.svg";
import { initMercadoPago, StatusScreen } from "@mercadopago/sdk-react";
import { useState } from "react";

const ReservationTable = ({ reservations, onEdit, onDelete }) => {
  const [actualPaymentId, setActualPaymentId] = useState(null);
  const [showPaymentStatus, setShowPaymentStatus] = useState(false);

    initMercadoPago("TEST-12466856-e444-43c0-bb7e-98bd98313884", {
    locale: "es-UY",
  });
  return (
    <>
      {showPaymentStatus && (
        <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full">
            <div className="p-2 rounded-xl bg-green-600 relative">
                <StatusScreen initialization={{ paymentId: actualPaymentId }} />
                <p className="text-white text-xl font-bold absolute top-4 right-4 cursor-pointer hover:text-red-500"
                onClick={() => setShowPaymentStatus(false)}>X</p>
            </div>

        </div>
      )}
      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <div>Fecha</div>
          <div>Hora Inicio</div>
          <div>Hora Fin</div>
          <div>Cancha</div>
          <div>Estado</div>
          <div>Acciones</div>
        </div>
        {reservations?.map((reservation, index) => (
          <div key={index} className={styles.tableRow}>
            <div>
              {new Date(reservation?.ReservationDate)?.toLocaleDateString()}
            </div>
            <div>{reservation.StartTime}</div>
            <div>{reservation.EndTime}</div>
            <div>{reservation?.FieldName}</div>
            <div>
              {reservation?.StatusReservation === "cancelled"
                ? "Cancelada"
                : reservation.StatusReservation}
            </div>
            <div className={styles.actionButtons}>
              <img
                src={editIcon}
                alt="Editar"
                className={styles.icon}
                onClick={() => {
                    setShowPaymentStatus(true)
                    console.log(reservation?.PaymentID);
                    
                    setActualPaymentId(reservation?.PaymentID)
                }}
              />
              <img
                src={deleteIcon}
                alt="Eliminar"
                className={styles.icon}
                onClick={() => onDelete(reservation)}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

ReservationTable.propTypes = {
  reservations: PropTypes.arrayOf(
    PropTypes.shape({
      reservationDate: PropTypes.instanceOf(Date).isRequired,
      startTime: PropTypes.string.isRequired,
      endTime: PropTypes.string.isRequired,
      fieldName: PropTypes.string.isRequired,
      statusReservation: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ReservationTable;
