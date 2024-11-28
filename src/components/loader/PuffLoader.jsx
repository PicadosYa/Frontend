
import { PuffLoader } from "react-spinners";

const PuffLoaderComponent = ({ isLoading }) => {
  return (
    <div className="">
      <PuffLoader color={"#dc2626"} loading={isLoading} size={50} />
    </div>
  );
};

export default PuffLoaderComponent;
