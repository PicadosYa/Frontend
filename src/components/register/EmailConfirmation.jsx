import React from "react";

export function EmailConfirmation() {
    return (
        <div className="w-[600px] h-[404] flex flex-col items-center justify-center bg-blue-800"
        >

            {/* Contenedor principal con el fondo dividido */}
            <div className="w-[600px] bg-cover rounded-[15px] shadow-lg overflow-hidden" style={{ backgroundImage: "url('../../../public/image 38.png')", backgroundSize: "cover", backgroundPosition: "center" }}>

                {/* Sección superior con imagen de fondo y opacidad */}
                <div className="relative h-[50%] w-full flex flex-col items-center justify-center bg-blue-900 bg-opacity-60 p-8" style={{ background: "linear-gradient(to top, rgba(26, 57, 210, 0.7), rgba(13, 29, 108, 0.7))" }}>

                    {/* Logo */}
                    <img src="../../../public/Logo.png" alt="Logo" className="w-2/5 h-auto mb-4" />

                    {/* Texto de bienvenida */}
                    <p className="text-white text-lg mb-4">Hola, {'Nombre Apellido'}</p>

                    {/* Texto de confirmación */}
                    <h2 className="text-2xl font-bold text-white mb-4">Confirma tu correo electrónico</h2>

                    {/* Botón de confirmación */}
                    <button className="flex flex-row items-center justify-center gap-4 w-[185px] px-6 py-3 rounded-[25px] bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white font-semibold mt-4 shadow-md"
                    style={{
                        background: "linear-gradient(to right, rgba(237, 60, 22, 1), rgba(243, 64, 24, 1), rgba(241, 74, 37, 1), rgba(255, 99, 65, 1))",
                        textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                    }}>
                        <img src="../../../public/Mail.png" alt="" />Confirmar
                    </button>
                </div>

                <div className="h-[1px] bg-orange-500"></div>

                {/* Sección inferior con fondo azul sólido */}
                <div className="bg-blue-800 p-8 text-white" style={{ background: "linear-gradient(to bottom, rgba(26, 57, 210, 1), rgba(13, 29, 108, 1))" }}> 
                    {/* Mensaje de agradecimiento */}
                    <h3 className="text-xl font-bold text-[15px] leading-normal text-center mb-4">¡Gracias por elegir nuestra App para reservar tu cancha!</h3>

                    {/* Texto de introducción */}
                    <p className="text-center text-[14px] mb-4">
                        Estás a solo un click de comenzar a disfrutar de los mejores <br /> complejos deportivos del país.<br />
                        Confirma tu cuenta ahora y comienza a disfrutar.
                    </p>

                    {/* Mensaje de despedida */}
                    <p className="text-center font-semibold text-[20px] leading-normal"><strong>¡Ahora a Picarla!!!, nos vemos pronto!</strong></p>
                </div>
            </div>
        </div>
    );
}
