import AdminSideBar from "./AdminSideBar";
import styles from "./adminscreen.module.css";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className={styles.appContainer}>
      <div className={styles.contentContainer}>
        <AdminSideBar />
      </div>
      <Outlet />
    </div>
  );
};

export default Dashboard;
