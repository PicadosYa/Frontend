import { ProfileIcon } from "@/components/register";
import { useAuth } from "../../hooks/useAuth";

/**************************************************************/
/********************  USER PROFILE COMPONENT *****************/
/**************************************************************/

const UserProfile = () => {
  const { auth } = useAuth();


  return (
    <div className="flex items-center justify-center mb-12 text-xl text-white">
      <div className="w-11 h-11  rounded-full bg-[#656A84] flex justify-center items-center mr-3 font-semibold">
        <span className="mr-[1px]">
          <ProfileIcon auth={auth} noAction={true} />
        </span>
      </div>
      <div className="font-semibold">
        <span>{`Hola, ${auth.firstname}`}</span>
      </div>
    </div>
  );
};

export default UserProfile;
