import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaMousePointer, FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="bg-gradient-to-r from-blue-700 to-black py-2"
      style={{
        background: "linear-gradient(to right, rgba(26, 57, 210, 1), rgba(13, 29, 108, 1))",
      }}
    >
      <div className="max-w-7xl mx-auto flex justify-around items-start text-white">
        
        {/* Izquierda: Columnas 1 y 2 */}
        <div className="flex space-x-20 py-8">
          {/* Columna 1: Logo y Redes Sociales */}
          <div className="flex flex-col items-start gap-4">
            <img src="../../../public/Logo.png" alt="Logo PicadosYA" className="w-219 mb-4" />
            <div className="flex space-x-6 text-2xl ml-2">
              <FaFacebook />
              <FaTwitter />
              <FaInstagram />
              <FaLinkedin />
              <FaYoutube />
            </div>
          </div>
          
          {/* Columna 2: Links */}
          <div className="flex flex-col items-start space-y-3">
            <a href="/nosotros" className="hover:underline">Nosotros</a>
            <a href="/contacto" className="hover:underline">Contacto</a>
            <a href="/soporte" className="hover:underline">Soporte</a>
            <a href="/faqs" className="hover:underline">FAQ's</a>
          </div>
        </div>

              {/* Centro: Columna 3 */}
      <div className="flex justify-center ">
        <img src="../../../public/image 44.png" alt="Imagen adicional" className="w-24 h-auto" />
      </div>


        {/* Derecha: Columna 4 */}
        <div className="flex flex-col items-center space-y-16 py-8">
          <button className="bg-[#eb2a00] w-60 text-white rounded-[25px] border border-white px-4 py-2" style={{
        background: "linear-gradient(to right, rgba(237, 60, 22, 1), rgba(255, 73, 28, 1), rgba(238, 75, 39, 1), rgba(255, 99, 65, 1))",
      }}>
            <strong>Picarla Ya!</strong>
          </button>
          <p className="text-gray-300 text-xs flex items-center">
            Copyright ©
            <img src="../../../public/image 39.png" alt="Logo PicadosYA" className="w-62 h-17 pt-1" />
            2024. All rights reserved.
          </p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
