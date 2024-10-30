// import React from "react";
import { useState, useEffect } from "react";
import { Register } from "../../components/register/Register";
import { Login } from "../../components/register/Login";
import { RecoveryCode } from "../../components/register/RecoveryCode";
import { ConfirmCode } from "../../components/register/ConfirmCode";
import { RegisterOwner } from "../../components/register/RegisterOwner";
import { MyProfile  } from "../../components/register/MyProfile";

const Home = () => {
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

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const applyFilters = async () => {
    if (userLocation.lat && userLocation.lng) {
      filters.location = {
        latitude: userLocation.lat,
        longitude: userLocation.lng,
        radius: filters.radius,
      };
    }

    // conexión con el backend para aplicar los filtros
    // y obtener los campos filtrados
    try {
      const response = await fetch("/api/fields/filter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filters),
      });
      const data = await response.json();
      setFields(data);
    } catch (error) {
      console.error("Error al aplicar filtros:", error);
    }
  };

  return (
    <>
    <div>Pagina Inicio</div>
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
    <div>Espacio</div>

    <div className="w-full h-screen bg-cover bg-center" style={{ backgroundImage: "url('../../../public/DSC_0196.JPG')" }}>
      {/* Header */}
      <header className="w-[calc(100%-20px)] mx-5 mt-5 bg-blue-700 bg-opacity-90 rounded-[25px] p-4 flex justify-between items-center">
        <img src="../../../public/Logo_SB-pro.png" alt="Logo" className="w-219 h-16 mb-[-20px] mt-[-20px]" /> {/* Ruta del logo */}
        <div className="flex space-x-4">
          <button className="bg-orange-500 text-white rounded-[25px] px-6 py-2">Registrarme</button>
          <button className="bg-orange-500 text-white rounded-[25px] px-6 py-2">Iniciar sesión</button>
        </div>
      </header>

      {/* Contenedor principal */}
      <main className="w-[calc(100%-40px)] mx-5 mt-10 bg-blue-900 bg-opacity-70 rounded-[25px] p-6">
        {/* Fila de dropdowns */}
        <div className="flex justify-between mb-6 space-x-4">
          <select className="w-1/4 h-12 bg-blue-700 text-white rounded-lg p-2">
            <option>Ubicación</option>
          </select>
          <select className="w-1/4 h-12 bg-blue-700 text-white rounded-lg p-2">
            <option>Fecha</option>
          </select>
          <select className="w-1/4 h-12 bg-blue-700 text-white rounded-lg p-2">
            <option>Hora</option>
          </select>
          <select className="w-1/4 h-12 bg-blue-700 text-white rounded-lg p-2">
            <option>Tipo</option>
          </select>
        </div>
        
        {/* Botón central */}
        <div className="flex justify-center mb-8">
          <button className="bg-orange-500 text-white rounded-[25px] px-8 py-3 text-lg font-semibold border border-white">
            Picarla Ya!
          </button>
        </div>
      </main>

      {/* Cards de información */}
      <section className="w-[calc(100%-40px)] mx-5 mt-8 grid grid-cols-3 gap-6">
        {[1, 2, 3].map((_, index) => (
          <div key={index} className="w-[363px] h-[312px] bg-white bg-opacity-80 rounded-lg shadow-lg overflow-hidden">
            <img src={`ruta-a-tu-imagen-${index + 1}.jpg`} alt="Imagen" className="w-full h-1/2 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">Nombre del Lugar</h3>
              <p className="text-sm">
                <span className="font-semibold">Ubicación:</span> Dirección detallada
              </p>
              <p className="text-sm">
                <span className="font-semibold">Horarios:</span> 8:00 AM - 10:00 PM
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  </>
  )
};

export default Home;
