import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ onClick, children, className, ...props }) => {
  return (
    <button onClick={onClick} className={`${styles.button} ${className}`} {...props}>
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Button;
