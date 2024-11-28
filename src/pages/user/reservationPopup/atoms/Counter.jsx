import PropTypes from 'prop-types';
import styles from './Counter.module.css';

const Counter = ({ count, label }) => {
  return (
    <span className={styles.counter}>
      {label}: {count}
    </span>
  );
};

Counter.propTypes = {
  count: PropTypes.number.isRequired,
  label: PropTypes.string,
};

Counter.defaultProps = {
  label: 'Total',
};

export default Counter;
