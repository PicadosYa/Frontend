import { Routes, Route } from "react-router-dom";
import { Logout } from "../services/Logout";
import { PrivateLayout, PublicLayout } from "../components/layout";
import { Error404, Home, Login, RegisterOwner, Reservas } from "../pages";
import UserLayout from "../components/layout/user/UserLayout";
import { Register } from "../pages/auth/register/Register";
import RecoveryPassword from "../pages/auth/register/RecoveryPassword";
import UpdateUser from "../pages/user/UpdateUser";
import FieldDetails from "../pages/fieldDetails/FieldDetails";
import ReservationPopup from "../pages/user/reservationPopup/organisms/ReservationPopup";
import SoccerFieldForm from "../pages/SoccerField/SoccerFieldForm";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="field/:id" element={<FieldDetails />} />
        <Route path="mis-reservas" element={<ReservationPopup />} />
        <Route path="upload-field" element={<SoccerFieldForm />} />
      </Route>
      <Route path="/" element={<PublicLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="choice/registerOwner" element={<RegisterOwner />} />
        <Route path="choice/register" element={<Register />} />
        <Route path="recovery-password" element={<RecoveryPassword />} />
      </Route>
      <Route path="logout" element={<Logout />} />

      <Route path="perfil" element={<UpdateUser />} />
      <Route path="/canchero" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="logout" element={<Logout />} />
        <Route path="reservas" element={<Reservas />} />
      </Route>

      <Route path="/admin" element={<PrivateLayout />}>
        <Route index element={<Home />} />
        <Route path="logout" element={<Logout />} />
      </Route>

      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default Routing;
