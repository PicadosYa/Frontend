import { useNavigate } from 'react-router-dom';
import PopupHeader from '../molecules/PopupHeader';
import ReservationTable from '../molecules/ReservationTable';
import styles from './ReservationPopup.module.css';
import PropTypes from 'prop-types';
import { ReservationService, useGetReservationsPerUser } from '../../../../services/ReservationService';
import { useEffect, useState } from 'react';

const ReservationPopup = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const {data} = useGetReservationsPerUser();
  useEffect(() => {
    console.log(data);
    
    setReservations(data);
  }, [data])

  const onRefresh = () => {
    console.log('Refreshing reservations');
  };

  const onClose = () => {
    navigate('/');
  };

  const onEdit = (reservation) => {
    console.log('Editing reservation:', reservation);
  };

  const onDelete = (reservation) => {
    console.log('Deleting reservation:', reservation);
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <PopupHeader
          title="Histórico de reservas"
          count={reservations?.length}
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

