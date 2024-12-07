import { Routes, Route } from "react-router-dom";
import { Logout } from "../services/Logout";
import { PrivateLayout } from "../components/layout";
import { Error404, Home, Login, Reservas } from "../pages";
import UserLayout from "../components/layout/user/UserLayout";
import { Register } from "../pages/auth/register/Register";
import RecoveryPassword from "../pages/auth/register/RecoveryPassword";
import UpdateUser from "../pages/user/UpdateUser";
import FieldDetails from "../pages/fieldDetails/FieldDetails";
import ReservationPopup from "../pages/user/reservationPopup/organisms/ReservationPopup";
import SoccerFieldForm from "../pages/SoccerField/SoccerFieldForm";
import FieldPanel from "../pages/reservas/FieldPanel";
import Dashboard from "@/pages/reservas/Dashboard";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="field/:id" element={<FieldDetails />} />
        <Route path="mis-reservas" element={<ReservationPopup />} />
        <Route path="upload-field" element={<SoccerFieldForm />} />
      </Route>

      <Route path="login" element={<Login />} />
      <Route path="choice/register" element={<Register />} />
      <Route path="recovery-password" element={<RecoveryPassword />} />
      <Route path="logout" element={<Logout />} />
      <Route path="perfil" element={<UpdateUser />} />

      <Route path="/canchero" element={<UserLayout />}>
        <Route path="" element={<Dashboard />} >
          <Route index element={<FieldPanel />} />
          <Route path="reservas" element={<Reservas />} />
          <Route path="ventas" element={<FieldPanel />} />
          <Route path="canchas" element={<FieldPanel />} />
        </Route>

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
