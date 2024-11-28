import PopupHeader from '../molecules/PopupHeader';
import ReservationTable from '../molecules/ReservationTable';
import styles from './ReservationPopup.module.css';
import PropTypes from 'prop-types';

const ReservationPopup = ({ open, reservations, onClose, onRefresh, onEdit, onDelete }) => {
  if (!open) return null;

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <PopupHeader
          title="Histórico de reservas"
          count={reservations.length}
          onRefresh={onRefresh}
          onClose={onClose}
        />
        <ReservationTable reservations={reservations} onEdit={onEdit} onDelete={onDelete} />
      </div>
    </div>
  );
};
ReservationPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  reservations: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ReservationPopup;

