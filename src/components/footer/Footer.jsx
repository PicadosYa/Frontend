import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black py-[21px] px-4 ">
      {/* <img
        src="/logo-picYasvg-svg_3.png"
        className="absolute bottom-11 left-[1300px]"
      /> */}
      <div className="flex items-center justify-center">
        <p className="text-gray-300 text-sm flex">
          Copyright ©
          <img
            src="../../../public/image 39.png"
            alt="Logo PicadosYA"
            className="w-62 h-17"
          />
          2024. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
