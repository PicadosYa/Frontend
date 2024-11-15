// Icon Component
type IconProps = {
    name: string;
  };
  
  const Icon: React.FC<IconProps> = ({ name }) => (
    <span className={`icon icon-${name}`} />
  );
  
  export default Icon;