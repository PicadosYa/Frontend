import PropTypes from 'prop-types';
import Icon from '../atoms/Icons';
import Counter from '../atoms/Counter';
import Button from '../atoms/Button';
import refreshIcon from './svg/recargar.svg';
import styles from './PopupHeader.module.css';

const PopupHeader = ({ title, count, onRefresh, onClose }) => {
  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <Icon src="/src/components/img/logo-picYasvg-svg_3.png" alt="LogoRayo" className={styles.logo} />
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.headerRight}>
        <Counter count={count} />
        <Button onClick={onRefresh} className={styles.refreshButton}>
          <Icon src={refreshIcon} alt="Refresh" />
        </Button>
        <Button onClick={onClose} className={styles.closeButton}>
          X
        </Button>
      </div>
    </div>
  );
};

PopupHeader.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  onRefresh: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PopupHeader;
