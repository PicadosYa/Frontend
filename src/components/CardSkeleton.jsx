import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CardSkeleton = () => {
  return (
    <div className="w-[363px] h-[100%] bg-gray-200 rounded-md shadow-lg">
      <Skeleton height={160} />
      <div className="p-4">
        <Skeleton height={20} width={`80%`} />
        <Skeleton height={20} width={`40%`} />
      </div>
    </div>
  )
}

export default CardSkeleton