import React from "react";
import AdminSideBar from "./AdminSideBar";
import styles from "./adminscreen.module.css";
import DashboardActions from "../../components/Dashboard/DashboardActions";

const FieldPanel = () => {
  return (
    <div className={styles.appContainer}>
      <div className={styles.contentContainer}>
        <AdminSideBar />
      </div>
      <div
        className={styles.background}
        style={{
          backgroundImage: "url('/imagen%202.png')",
          backgroundSize: "cover",
          position: "relative",
          color: "#fff",
          overflow: "hidden",
        }}
      >
        <div className="absolute top-0 left-0  bg-gray-900 opacity-80 min-h-full min-w-[100%]"></div>
        <DashboardActions />
      </div>
    </div>
  );
};

export default FieldPanel;
