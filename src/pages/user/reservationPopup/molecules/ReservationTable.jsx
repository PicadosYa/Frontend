import PropTypes from 'prop-types';
import styles from './ReservationTable.module.css';
import editIcon from './svg/edit.svg'; 
import deleteIcon from './svg/delete.svg'; 

const ReservationTable = ({ reservations, onEdit, onDelete }) => {
return (
    <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
            <div>Fecha</div>
            <div>Hora Inicio</div>
            <div>Hora Fin</div>
            <div>Cancha</div>
            <div>Estado</div>
            <div>Acciones</div>
        </div>
        {reservations.map((reservation, index) => (
            <div key={index} className={styles.tableRow}>
                <div>{reservation.reservationDate.toLocaleDateString()}</div>
                <div>{reservation.startTime}</div>
                <div>{reservation.endTime}</div>
                <div>{reservation.fieldName}</div>
                <div>{reservation.statusReservation === 'cancelled' ? 'Cancelada' : reservation.statusReservation}</div>
                <div className={styles.actionButtons}>
                    <img
                        src={editIcon}
                        alt="Editar"
                        className={styles.icon}
                        onClick={() => onEdit(reservation)}
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
