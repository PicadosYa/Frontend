import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MyProfile } from "./MyProfile";
import { FaCalendarCheck, FaStar, FaUserEdit } from "react-icons/fa";
import { MdAddBox, MdDiamond } from "react-icons/md";
import { AiFillDashboard } from "react-icons/ai";
import FavoritesModal from "./FavsModal";
import PropTypes from "prop-types";

export function HeaderSession({ auth }) {
  const [firstName, setFirstName] = useState("");
  const [isOpenFavModal, setIsOpenFavModal] = useState(false);
  useEffect(() => {
    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile) {
      const userProfileNoParsed = JSON.parse(storedProfile);
      setFirstName(userProfileNoParsed.first_name);
    } else if (auth.firstname) {
      setFirstName(auth.firstname);
    }
  }, []);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);

  return (
    <div className="mx-5 bg-transparent rounded-[25px] p-4 flex justify-end items-center">
      {isUserModalOpen && (
        <div className="absolute top-[100%]  right-[-13px] z-10 bg-white rounded-md rounded-t-xl flex flex-col gap-2 ">
          <div className="flex w-full items-center gap-2 justify-between p-6 py-10 bg-dark-blue rounded-xl relative overflow-hidden">
            <div className="absolute z-10 top-[-60px] right-[-60px] rounded-full w-44 h-44 bg-blue-800"></div>
            <div className="absolute top-[-85px] right-[-60px] rounded-full w-60 h-60 bg-blue-900"></div>
            <div className="w-24 z-20">
              <ProfileIcon
                auth={auth}
                setIsUserModalOpen={setIsUserModalOpen}
                isUserModalOpen={isUserModalOpen}
              />
            </div>
            <div className="flex flex-col gap-1 w-full text-white z-20">
              <p className="font-bold">
                {firstName ? `${firstName}` : `${auth.firstname}`}
              </p>
              <p className="text-xs">{auth.email}</p>
            </div>
          </div>
          <div className="p-4 flex flex-col gap-4 text-gray-500 font-semibold">
            {auth.role === "field" ? (
              <>
                <Link
                  to="canchero"
                  className="hover:text-gray-700 flex gap-2 items-center justify-center"
                >
                  <AiFillDashboard className="text-xl " />
                  Dashboard
                </Link>
                <span className="h-[1px] bg-gray-300 w-full my-4"></span>
              </>
            ) : null}

            <button
              className="hover:text-gray-700 flex gap-2 items-center"
              onClick={() => setIsUserProfileOpen(!isUserProfileOpen)}
            >
              <FaUserEdit className="text-xl " />
              Actualizar perfil
            </button>
            <button
              className="hover:text-gray-700 flex gap-2 items-center"
              onClick={() => setIsOpenFavModal(!isOpenFavModal)}
            >
              <FaStar className="text-xl " />
              Mis Favoritos
            </button>

            <Link
              to="mis-reservas"
              className="hover:text-gray-700 flex gap-2 items-center"
            >
              <FaCalendarCheck className="text-xl " />
              Mis Reservas
            </Link>

            <span className="h-[1px] bg-gray-300 w-full my-4"></span>

            <Link
              to="upload-field"
              className="hover:text-gray-700 flex gap-2 items-center"
            >
              <MdAddBox className="text-xl " />
              Subir Cancha
            </Link>

            <span className="h-[1px] bg-gray-300 w-full my-4"></span>

            <Link
              to="pricing"
              className="text-main-blue flex gap-2 items-center hover:text-orange-dark animate-bounce transition-colors"
            >
              <MdDiamond className="text-xl " />
              Precios
            </Link>

            <Link
              to="/logout"
              className="px-4 py-2 bg-gradient-to-r from-orange-dark to-orange-light rounded-md text-white hover:shadow-xl transition-shadow"
            >
              Cerrar Sesion
            </Link>
          </div>
        </div>
      )}
      <div
        className="flex space-x-6 items-center text-white relative"
        style={{ fontFamily: "Exo, sans-serif", lineHeight: "normal" }}
      >
        {firstName ? (
          <p className="font-semibold">Hola, {firstName}!</p>
        ) : (
          <p className="font-semibold">Hola, {auth.firstname}!</p>
        )}
        <div className="w-11 h-11 bg-gray-300 rounded-full flex justify-center items-center relative">
          <ProfileIcon
            auth={auth}
            setIsUserModalOpen={setIsUserModalOpen}
            isUserModalOpen={isUserModalOpen}
          />
        </div>
      </div>
      {isUserProfileOpen && (
        <div className="fixed top-0 left-0 z-10 flex justify-center items-center min-w-full bg-dark-blue-opacity ">
          <MyProfile setIsUserProfileOpen={setIsUserProfileOpen} />
        </div>
      )}
      {isOpenFavModal && <FavoritesModal onClose={setIsOpenFavModal} />}
    </div>
  );
}

export function ProfileIcon({ auth, setIsUserModalOpen, isUserModalOpen, noAction = false }) {
  const nameModified = (firstname, lastname) => {
    const letters =
      firstname.charAt(0).toUpperCase() + lastname.charAt(0).toUpperCase();
    return letters;
  };

  return auth.profile_picture_url !== "default" ? (
    <img
      src={auth.profile_picture_url}
      alt="Profile"
      className="w-full h-full rounded-full cursor-pointer border-[2.5px] border-solid border-white object-cover"
      onClick={() => noAction ? null : setIsUserModalOpen(!isUserModalOpen) }
      
    />
  ) : (
    <div
      className="w-full h-full border-[2.5px] border-solid border-white rounded-full bg-[#656A84] flex justify-center items-center font-semibold cursor-pointer"
      onClick={() => noAction ? null :  setIsUserModalOpen(!isUserModalOpen)}
    >
      <span className="">{nameModified(auth.firstname, auth.lastname)}</span>
    </div>
  );
}

HeaderSession.propTypes = {
  auth: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string,
    profile_picture_url: PropTypes.string,
    role: PropTypes.string.isRequired,
  }).isRequired,
};

ProfileIcon.propTypes = {
  auth: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string,
    profile_picture_url: PropTypes.string,
    role: PropTypes.string.isRequired,
  }).isRequired,
  setIsUserModalOpen: PropTypes.func.isRequired,
  isUserModalOpen: PropTypes.bool.isRequired,
};
