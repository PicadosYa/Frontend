import { useAuth } from "../../hooks/useAuth";

/**************************************************************/
/********************  USER PROFILE COMPONENT *****************/
/**************************************************************/

const UserProfile = () => {
  const { auth } = useAuth();

  const nameModified = (firstname, lastname) => {
    const letters =
      firstname.charAt(0).toUpperCase() + lastname.charAt(0).toUpperCase();
    return letters;
  };

  return (
    <div className="flex items-center justify-center my-12 text-xl text-white">
      <div className="w-11 h-11 border-[2.5px] border-solid border-white rounded-full bg-[#656A84] flex justify-center items-center mr-3 font-semibold">
        <span className="mr-[1px]">
          {nameModified(auth.firstname, auth.lastname)}
        </span>
      </div>
      <div className="font-semibold">
        <span>{`Hola!, ${auth.firstname}`}</span>
      </div>
    </div>
  );
};

export default UserProfile;
