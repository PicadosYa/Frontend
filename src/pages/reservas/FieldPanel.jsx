import styles from "./adminscreen.module.css";
import DashboardActions from "../../components/Dashboard/DashboardActions";
import ReservasConfirmadas from "./ReservasConfirmadas";
import VentasMensuales from "./VentasMensuales";
import ReservasYOcupacion from "./ReservasYOcupacion";
import ReservationsOverTime from "./ReservationOverTime";

const FieldPanel = () => {
  return (
    <div
      className={styles.background}
      style={{
        backgroundImage: "url('/imagen%202.png')",
        backgroundSize: "cover",
        position: "relative",
        color: "#fff",
      }}
    >
      <div className="fixed top-0 left-0 z-[-1] bg-gray-900 opacity-80 min-h-full min-w-[100%]">l</div>

      <div className="max-w-screen-xl flex flex-col w-full">
        <div className="flex justify-end space-x-4 mr-4 mt-4">
          {/* <ReservasConfirmadas />
          <div className="bg-neutral-800 p-4 rounded-lg">
            <h3 className="text-white font-bold text-2xl">23</h3>
            <p className="text-gray-400">Reservas Canceladas</p>
          </div>
          <div className="bg-neutral-800 p-4 rounded-lg">
            <h3 className="text-white font-bold text-2xl">12</h3>
            <p className="text-gray-400">En Proceso</p>
          </div> */}
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <VentasMensuales />
          <ReservationsOverTime />
        </div>
        
        <div className="grid grid-cols-1 gap-4 mt-4">
          <ReservasYOcupacion />
        </div>
        
        <DashboardActions />
      </div>
    </div>
  );
};

export default FieldPanel;