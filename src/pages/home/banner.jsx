/* ********************************************************************************************** */
/* ****************************   LOGOS ANIMATE BANNER    *************************************** */
/* ********************************************************************************************** */



export const LogoBanner = () => {
    const [logos, setLogos] = useState([]);

    const logoNames = [
        "logo1.png",
        "logo2.png",
        "logo3.png",
        "logo4.png",
        "logo5.png",
        "logo6.png",
        "logo7.png",
        "logo8.png",
        "logo9.png",
        "logo10.png",
    ];

    useEffect(() => {
        const loadLogos = async () => {
            const loadedLogos = logoNames.map((name, index) => ({
                id: index,
                name: name,
                image: `/public/logos/${name}`,
            }));
            setLogos(loadedLogos);
        };

        loadLogos();
    }, []);

    return (
        <div className="relative w-full overflow-hidden backdrop-blur-md bg-white/10 py-4">
            <div className="relative flex w-max gap-8 px-4">
                <div className="animate-scroll flex items-center gap-8">
                    {logos.map((logo) => (
                        <div
                            key={logo.id}
                            className="relative flex h-full items-center justify-center rounded-lg bg-transparent transition-all duration-300 hover:bg-white/5"
                        >
                            <img
                                src={logo.image}
                                alt={logo.name}
                                className="h-12 w-auto object-contain grayscale transition-all duration-300 hover:grayscale-0"
                            />
                        </div>
                    ))}
                </div>
                <div
                    aria-hidden="true"
                    className="animate-scroll flex items-center gap-8"
                >
                    {logos.map((logo) => (
                        <div
                            key={logo.id}
                            className="relative flex h-full items-center justify-center rounded-lg bg-transparent transition-all duration-300 hover:bg-white/5"
                        >
                            <img
                                src={logo.image}
                                alt={logo.name}
                                className="h-12 w-auto object-contain grayscale transition-all duration-300 hover:grayscale-0"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
