import React from "react";
import { FaMousePointer, FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-700 to-black py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
        <div className="flex items-center mb-4">
          <FaMousePointer className="text-[#eb2a00] h-6 w-6 mr-2" />
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#eb2a00] to-[#ff471f]">
            PicadosYA
          </span>
        </div>
        {/* kakajjjjjjjjjjja */}
        {/* <p className="text-gray-400 text-sm mb-4 text-center">
          Brindando soluciones tecnológicas de excelencia
        </p> */}
        <div className="w-24 h-1 bg-gradient-to-r from-[#eb2a00] to-[#ff471f] rounded mb-4"></div>
        <p className="text-gray-300 text-sm mb-2">
          © 2024 PicadosYA. All rights reserved.
        </p>
        <p className="text-gray-400 text-xs flex items-center">
          Crafted with <FaHeart className="text-[#ff471f] mx-1" /> the best
          developers
        </p>
      </div>
    </footer>
  );
};

export default Footer;
