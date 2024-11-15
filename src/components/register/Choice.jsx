import React from "react";
import { Link } from "react-router-dom";

export function ChoiceModal({ onClose }) {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50 transition-opacity duration-300"
        onClick={onClose}
      ></div>
      <div
        className="flex flex-col justify-center items-center w-[450px] h-[200px] rounded-[25px] z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(26, 57, 210, 1), rgba(13, 29, 108, 1))",
        }}
      >
        <img src="../../../public/Logo.png" alt="Logo" className="w-1/2 h-16" />
        <p
          className="text-white text-lg font-semibold mb-4"
          style={{ fontFamily: "Exo, sans-serif", lineHeight: "normal" }}
        >
          Quiero registrarme como:
        </p>
        <div className="flex space-x-4">
          <Link
            onClick={onClose}
            to="/choice/register"
            className="px-12 py-1 rounded-[25px] text-white shadow-sm shadow-black"
            style={{
              background:
                "linear-gradient(to right, rgba(237, 60, 22, 1), rgba(243, 64, 24, 1), rgba(241, 74, 37, 1), rgba(255, 99, 65, 1))",
            }}
          >
            Jugador
          </Link>
          <Link
            onClick={onClose}
            to="/choice/registerOwner"
            className="px-12 py-1 rounded-[25px] text-white shadow-sm shadow-black"
            style={{
              background:
                "linear-gradient(to right, rgba(237, 60, 22, 1), rgba(243, 64, 24, 1), rgba(241, 74, 37, 1), rgba(255, 99, 65, 1))",
            }}
          >
            Propietario
          </Link>
        </div>
        <button className="absolute top-2 right-2 text-white" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
}

export default ChoiceModal;
