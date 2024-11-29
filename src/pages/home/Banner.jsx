import { useEffect, useState } from "react";

/* ********************************************************************************************** */
/* *************************   BANNER ANIMADO DE LOGOS   **************************************** */
/* ********************************************************************************************** */

export const Banner = () => {
  const [logos, setLogos] = useState([]);

  const logoNames = [
    "semeantojouna.png",
    "puma.png",
    "nike.png",
    "algunDiaVoyATrabajarAca.png", // Mercado Libre
    "globant.png",
    "adidas.png",
    "sonReebokNoSonNike.png",
    "gatorade.png",
    "cocacola.png",
  ];

  useEffect(() => {
    const loadLogos = async () => {
      // Repetir los logos para llenar el espacio
      const repeatedLogos = [...logoNames, ...logoNames, ...logoNames];
      const loadedLogos = repeatedLogos.map((name, index) => ({
        id: index,
        name: name,
        image: `/${name}`,
      }));
      setLogos(loadedLogos);
    };

    loadLogos();
  }, []);

  return (
    <div className="relative w-full overflow-hidden backdrop-blur-md bg-white/10 py-4">
      <div className="relative flex w-max gap-4 px-4">
        <div className="animate-scroll-slow flex items-center gap-4">
          {logos.map((logo) => (
            <div
              key={logo.id}
              className="relative flex h-full items-center justify-center rounded-lg bg-transparent transition-all duration-300 hover:bg-white/5"
            >
              <img
                src={logo.image}
                alt={logo.name}
                className={`${
                  logo.name === "globant.png" ||
                  logo.name === "algunDiaVoyATrabajarAca.png"
                    ? "h-20"
                    : "h-16"
                } w-auto object-contain grayscale transition-all duration-300 hover:grayscale-0`}
              />
            </div>
          ))}
        </div>
        <div
          aria-hidden="true"
          className="animate-scroll-slow flex items-center gap-4"
        >
          {logos.map((logo) => (
            <div
              key={logo.id + logos.length}
              className="relative flex h-full items-center justify-center rounded-lg bg-transparent transition-all duration-300 hover:bg-white/5"
            >
              <img
                src={logo.image}
                alt={logo.name}
                className={`${
                  logo.name === "globant.png" ||
                  logo.name === "algunDiaVoyATrabajarAca.png"
                    ? "h-20"
                    : "h-16"
                } w-auto object-contain grayscale transition-all duration-300 hover:grayscale-0`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
