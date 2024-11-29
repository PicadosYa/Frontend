import React, { useState, useEffect } from "react";
import { FieldsService} from "../../services/FieldsService";

const FavoritesModal = ({ onClose }) => {
  const [favorites, setFavorites] = useState([]);
  const favoritesFull = favorites || []; 
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/users/favourites-per-user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) {
          console.error(`Error: ${res.status} - ${res.statusText}`);
          return;
        }

        const data = await res.json();
        setFavorites(data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, []); // Ejecutar solo al montar el componente

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={() => onClose(false)}
      ></div>

      {/* Modal */}
      <div
        className="relative flex flex-col items-center p-10"
        style={{
          width: "979px",
          height: "737px",
          borderRadius: "25px",
          background: "linear-gradient(180deg, #1A39D2 0%, #0D1D6C 100%)",
          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        {/* Header */}
        <div className="w-full flex justify-between items-center mb-6 mt-6 pr-8">
          <img
            src="../../../public/favicon.ico"
            alt="Logo"
            className="w-16 h-16"
          />
          <h1 className="text-4xl font-bold text-white">Mis Favoritos</h1>
        </div>

        {/* Lista de favoritos */}
        <div className="w-full h-[calc(100%-100px)] overflow-y-auto">
          {favorites == null ? (
            <p className="text-center text-white text-xl font-bold">
            No tienes favoritos seleccionados.
          </p>
            
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {favorites.map((favorite, index) => (
                <li
                  key={favorite.id}
                  className="bg-gradient-to-b from-blue-600 to-blue-800 text-white rounded-lg shadow-lg overflow-hidden"
                >
                  <img
                    src={favorite.field_logo_url}
                    alt={favorite.field_name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2">
                      #{index + 1} - {favorite.field_name}
                    </h3>
                    <p className="text-sm text-gray-300">
                      <strong>Dirección:</strong> {favorite.field_address}
                    </p>
                    <p className="text-sm text-gray-300">
                      <strong>Tel:</strong> {favorite.field_phone}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Botón de cerrar */}
        <button
          className="absolute top-4 right-4 text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full focus:outline-none"
          onClick={() => onClose(false)}
        >
          x
        </button>
      </div>
    </div>
  );
};

export default FavoritesModal;
