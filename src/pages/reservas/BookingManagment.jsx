import React from "react";
import styles from "./adminscreen.module.css";
import AdminSideBar from "./AdminSideBar";
import DataBar from "./DataBar";
import SVGRayo from "../../../public/rayo-picados-ya";
import { Link } from "react-router-dom";

const BookingManagment = () => {
  const table = [
    { header: "Id" },
    { header: "Cancha" },
    { header: "Nombre" },
    { header: "Fecha" },
    { header: "Desde" },
    { header: "Hasta" },
    { header: "Tipo" },
    { header: "Contacto" },
    { header: "Estado" },
  ];
  const reservas = [
    {
      id: 1,
      cancha: "Cancha 1",
      nombre: "Torneo Local",
      fecha: "12/11/2024",
      desde: "10:00",
      hasta: "12:00",
      tipo: "Fútbol 5",
      contacto: "123-456-789",
      estado: "Confirmado",
    },
    {
      id: 2,
      cancha: "Cancha 2",
      nombre: "Amistoso",
      fecha: "12/11/2024",
      desde: "14:00",
      hasta: "16:00",
      tipo: "Fútbol 5",
      contacto: "987-654-321",
      estado: "Pendiente",
    },
    {
      id: 3,
      cancha: "Cancha 3",
      nombre: "Entrenamiento",
      fecha: "13/11/2024",
      desde: "08:00",
      hasta: "10:00",
      tipo: "Fútbol 5",
      contacto: "555-555-555",
      estado: "Cancelado",
    },
  ];

  return (
    <div className={styles.appContainer}>
      {/*************** SIDE BAR ADMIN PANEL***************/}
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
        <div className={styles.titleLogoContainer}>
          <h1 className={styles.title}>Gestion de Reservas</h1>

          <Link to="/">
            <div className={styles.logoContainer}>
              <img
                src="/logo-picados-ya.png"
                className={styles.logo}
                alt="Manager-Logo"
              />
              <h4 className="mt-[-15px] ml-[100px]">Manager</h4>
            </div>
          </Link>
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.transparentTable}>
            <thead className={styles.headerTable}>
              <tr>
                {table.map((item, index) => {
                  return <th key={index}>{item.header}</th>;
                })}
              </tr>
            </thead>
          </table>
        </div>

        <div className={styles.barsContainer}>
          <div className={styles.dataContainer}>
            {reservas.map((reserva, index) => (
              <DataBar
                key={index}
                id={reserva.id}
                nombre={reserva.nombre}
                cancha={reserva.cancha}
                fecha={reserva.fecha}
                desde={reserva.desde}
                hasta={reserva.hasta}
                tipo={reserva.tipo}
                contacto={reserva.contacto}
                estado={reserva.estado}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="fixed bottom-10 right-10 cursor-pointer">
        <SVGRayo
          className={`h-[40px!important] hover:translate-y-[-3px] transition-transform`}
          uniqueGradientId="abcd"
          fromColor="#ED3C16"
          toColor="#FF6341"
        />
      </div>
    </div>
  );
};

export default BookingManagment;
