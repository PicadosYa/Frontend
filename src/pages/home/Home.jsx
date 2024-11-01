// import React from "react";
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { useFields } from "../../services/FieldsService";
import ReactPaginate from "react-paginate";
import { motion } from "framer-motion";
import { Register } from "../../components/register/Register";
import { Login } from "../../components/register/Login";
import { RecoveryCode } from "../../components/register/RecoveryCode";
import { ConfirmCode } from "../../components/register/ConfirmCode";
import { RegisterOwner } from "../../components/register/RegisterOwner";
import { MyProfile  } from "../../components/register/MyProfile";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(0); // React Paginate usa 0 como primera página
  
  // Calculamos el offset basado en la página actual
  const itemsPerPage = 12;
  const offset = (currentPage * itemsPerPage)+3;
  
  const {data, isLoading, error} = useFields({
    limit: itemsPerPage,
    offset: offset // Este offset cambiará automáticamente cuando cambie la página
  });
  // Calculamos el total de páginas
  const pageCount = Math.ceil(83 / itemsPerPage); // 86/12 ≈ 8 páginas
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const [filters, setFilters] = useState({
    location: "",
    date: "",
    time: "",
    type: "",
    radius: 5, // Default radius in km
  });

  const [fields, setFields] = useState([]);
  const [userLocation, setUserLocation] = useState({ lat: null, lng: null });

  useEffect(() => {
    // Obtener localizacion del usuario con el navegador
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error obtaining location:", error);
      }
    );
  }, []);

  useEffect(() => {
    // Fetch inicial con el back
    const fetchFields = async () => {
      try {
        const response = await fetch("/api/fields");
        const data = await response.json();
        setFields(data);
      } catch (error) {
        console.error("Error fetching fields:", error);
      }
    };
    fetchFields();
  }, []);

  // const handleFilterChange = (key, value) => {
  //   setFilters({ ...filters, [key]: value });
  // };

  // const applyFilters = async () => {
  //   if (userLocation.lat && userLocation.lng) {
  //     filters.location = {
  //       latitude: userLocation.lat,
  //       longitude: userLocation.lng,
  //       radius: filters.radius,
  //     };
  //   }

    // conexión con el backend para aplicar los filtros
    // y obtener los campos filtrados
    // try {
    //   const response = await fetch("/api/fields/filter", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(filters),
    //   });
    //   const data = await response.json();
    //   setFields(data);
    // } catch (error) {
    //   console.error("Error fetching fields:", error);
    // }


  return (
    <>
    {/* <div>Pagina Inicio</div>
    <div className="home-container">
      <header className="home-header">
        <img src="/logo.png" alt="PicadosYA Logo" className="logo" />
        <div className="auth-buttons">
          <button className="register-button">Registrarme</button>
          <button className="login-button">Iniciar sesión</button>
        </div>
      </header>
      <div className="search-container">
        <select
          className="search-button"
          value={filters.radius}
          onChange={(e) => handleFilterChange("radius", e.target.value)}
        >
          <option value="">Radio (km)</option>
          <option value="3">3 km</option>
          <option value="10">10 km</option>
          <option value="25">25 km</option>
          <option value="50">50 km</option>
        </select>
        <input
          type="date"
          className="search-button"
          value={filters.date}
          onChange={(e) => handleFilterChange("date", e.target.value)}
        />
        <input
          type="time"
          className="search-button"
          value={filters.time}
          step="300" // Step set to 5 minutes
          min="00:00"
          max="23:55"
          onChange={(e) => handleFilterChange("time", e.target.value)}
        />
        <select
          className="search-button"
          value={filters.type}
          onChange={(e) => handleFilterChange("type", e.target.value)}
        >
          <option value="">Tipo</option>
          <option value="5">Fútbol 5</option>
          <option value="7">Fútbol 7</option>
          <option value="11">Fútbol 11</option>
        </select>
        <button className="action-button" onClick={applyFilters}>
          Picarla Ya!
        </button>
      </div>
      <div className="fields-container">
        {fields.map((field) => (
          <div key={field.id} className="field-card">
            <img
              src={field.imageUrl}
              alt={field.name}
              className="field-image"
            />
            <div className="field-info">
              <h3 className="field-name">{field.name}</h3>
              <p className="field-location">Ubicación: {field.location}</p>
              <p className="field-hours">Horarios: {field.hours}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div>Espacio</div>
    <Register />
    <div>Espacio</div>
    <Login />
    <div>Espacio</div>
    <RecoveryCode />
    <div>Espacio</div>
    <ConfirmCode />
    <div>Espacio</div>
    <RegisterOwner />
    <div>Espacio</div>
    <MyProfile />
    <div>Espacio</div> */}

    <div className="w-full min-h-screen bg-cover pt-4 pb-6 bg-center" style={{ backgroundImage: "url('../../../public/imagen 2.png')" }}>
      {/* Header */}
      <header className="w-[calc(100%-40px)] mx-5 mt-5 bg-blue-700 bg-opacity-90 rounded-[25px] p-4 flex justify-between items-center">
        <img src="../../../public/imagen 2.png" alt="Logo" className="w-219 h-16 mb-[-20px] mt-[-20px]" /> 
        <div className="flex space-x-4">
          <button className="bg-orange-500 text-white rounded-[25px] px-6 py-2">Registrarme</button>
          <button className="bg-orange-500 text-white rounded-[25px] px-6 py-2">Iniciar sesión</button>
        </div>
      </header>

      {/* Contenedor principal */}
       <section className="w-[calc(100%-40px)]  pb-14 mx-5 mt-8 grid grid-cols-3 gap-10">
        {isLoading && <p>Cargando...</p>}
        {error && <p>Error al cargar los lugares:</p>}
        {data?.map((field, index) => (
          <FieldCard key={index} field={field} />
        ))}
      </section>
       <ReactPaginate
          previousLabel="Anterior"
        nextLabel="Siguiente"
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName="flex items-center  justify-center space-x-2 p-3 rounded-lg"
        pageLinkClassName=" text-[#eb2a00] text-xl font-semibold rounded-full px-2 hover:bg-orange-500 hover:text-white transition-colors"
        previousLinkClassName=" text-white text-md font-semibold rounded-lg p-2 hover:text-[#eb2a00] transition-colors"
        nextLinkClassName=" text-white text-md font-semibold rounded-lg p-2  hover:text-[#eb2a00] transition-colors"
        activeClassName="bg-gray-300 rounded-full"
    />
    </div>
  </>
  )
};

function FieldCard({ field }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const photos = field.photos && field.photos.length > 0 ? field.photos : ['https://plus.unsplash.com/premium_photo-1684713510655-e6e31536168d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FuY2hhJTIwZGUlMjBmJUMzJUJBdGJvbHxlbnwwfHwwfHx8MA%3D%3D'];
  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId); // Limpia el intervalo al desmontar
    };
  }, [intervalId]);
  const handleMouseEnter = () => {
    const id = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 2000);
    setIntervalId(id);
  };
  const handleMouseLeave = () => {
    clearInterval(intervalId);
    setIntervalId(null);
    setImageIndex(0); 
  };
  return (
    <div
      className="w-[363px] h-[100%] bg-gray-300 p-1  rounded-md shadow-lg  cursor-pointer hover:translate-y-[-5px] transition-transform duration-300 flex flex-col justify-between"
      
    >
      <div className="w-full h-40 overflow-hidden rounded-xl  shadow-xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      >
        <motion.img
          src={photos[imageIndex]}
          alt="Imagen"
          className="w-full h-full object-cover"
          key={imageIndex} 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          transition={{ duration: 0.5 }} 
        />
      </div>
      <div className="p-4 flex flex-col gap-3">
        <div className="first-info">
          <h3 className="text-2xl font-bold mb-2 text-gray-800">{field.name}</h3>
          <p className="text-sm text-gray-800 overflow-hidden flex items-center gap-1" alt="description">
            <span className="font-semibold"></span> {field.address}
          </p>
        </div>
        <div className="description h-14 overflow-hidden">
          <p className="text-sm text-gray-500">
            <span className="font-semibold">Descripción:</span> {field.description}
          </p>
        </div>
        {/* <div className="price">
          <i><p className="text-3xl font-bold  text-orange-500">
            ${field.price}
          </p></i>
        </div>
        <div className="flex justify-between gap-1">
          <button className="bg-gradient-to-r from-gray-700 to-black text-white rounded-[25px] px-4 py-2 font-semibold transition">
            <p className="flex items-center w-full gap-4 justify-between text-md font-bold  bg-clip-text bg-gradient-to-r from-[#eb2a00] to-[#ff471f] transition-colors text-[#eb2a00] hover:text-white ">
              Reservar Ahora!
            </p>
          </button>
          
        </div> */}
      </div>
    </div>
  );
}
FieldCard.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    phone: PropTypes.string.isRequired,
    photos: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default Home;