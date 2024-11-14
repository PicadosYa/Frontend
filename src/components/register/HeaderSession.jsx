import React from 'react';

export function HeaderSession() {
    return (
        <div className="w-[calc(100%-40px)] mx-5 mt-5 bg-blue-700 bg-opacity-90 rounded-[25px] p-4 flex justify-between items-center" style={{ background: "linear-gradient(to right, rgba(26, 57, 210, 1), rgba(13, 29, 108, 1))" }}>
            <img
                src="../../../public/Logo.png"
                alt="Logo"
                className="w-219 h-16 mb-[-20px] mt-[-10px]"
            />
            <div className="flex space-x-6 items-center text-white" style={{ fontFamily: "Exo, sans-serif", lineHeight: "normal" }}>
                <span>Hola! , Ana</span>
                <div className="w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center">
                    <img src="./../../../public/Proyecto nuevo 1.png" alt="Profile" className="w-full h-full rounded-full" />
                </div>

                <img src="../../../public/Hamburguer Menu.png" alt="" />
            </div>
        </div>
    );
}