import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import PuffLoaderComponent from "../../loader/PuffLoader";
import { Global } from "../../../helpers/Global";

const UserLayout = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    return <PuffLoaderComponent isLoading={loading} />;
  } else {
    return (
      <>
        {auth.role == Global.rolesTypes.field ? (
          <Outlet />
        ) : (
          <Navigate to="/login" />
        )}
      </>
    );
  }
};

export default UserLayout;
