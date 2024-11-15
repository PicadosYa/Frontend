// Button Component
type ButtonProps = {
    text: string;
    onClick: () => void;
  };
  
  const Button: React.FC<ButtonProps> = ({ text, onClick }) => (
    <button className="button" onClick={onClick}>
      {text}
    </button>
  );
  
  export default Button;