import React from 'react';

export function Choice() {
    return (
        <div className="flex flex-col justify-center items-center w-[450px] h-[200px] rounded-[25px]"
            style={{ background: "linear-gradient(to bottom, rgba(26, 57, 210, 1), rgba(13, 29, 108, 1))" }}>
            <img src="../../../public/Logo.png" alt="Logo" className="w-1/2  h-16 " />
            <p className="text-white text-lg font-semibold mb-4" style={{ fontFamily: "Exo, sans-serif", lineHeight: "normal" }}>Quiero registrarme como:</p>
            <div className="flex space-x-4">
                <button className="px-12 py-1 rounded-[25px] text-white shadow-sm shadow-black"
                    style={{ background: "linear-gradient(to right, rgba(237, 60, 22, 1), rgba(243, 64, 24, 1), rgba(241, 74, 37, 1), rgba(255, 99, 65, 1))" }}>
                    Jugador
                </button>
                <button className="px-12 py-1 rounded-[25px] text-white shadow-sm shadow-black"
                    style={{ background: "linear-gradient(to right, rgba(237, 60, 22, 1), rgba(243, 64, 24, 1), rgba(241, 74, 37, 1), rgba(255, 99, 65, 1))" }}>
                    Propietario
                </button>
            </div>
        </div>
    );
}