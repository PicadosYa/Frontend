// import React from "react";
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useFields } from "../../services/FieldsService";
import { Rating, Star } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
import SearchBanner from "../../components/SearchBanner";
import SVGRayo from "../../../public/rayo-picados-ya";
import CardSkeleton from "../../components/CardSkeleton";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(0); // React Paginate usa 0 como primera página
  const [items, setItems] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (fieldId) => {
    console.log("HOLA");
    console.log(favorites);

    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [fieldId]: !prevFavorites[fieldId],
    }));
  };

  // Calculamos el offset basado en la página actual
  const itemsPerPage = 12;
  const offset = currentPage * itemsPerPage + 3;

  const { data, isLoading, error } = useFields({
    limit: itemsPerPage,
    offset: offset,
  });

  useEffect(() => {
    if (data && !isLoading) {
      setItems((prevItems) => [...prevItems, ...data]);
    }
  }, [data, isLoading]);

  // Referencia para el trigger de scroll infinito
  const infiniteScrollTrigger = useRef(null);

  // useEffect para observar el trigger y cargar más datos al hacer scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setCurrentPage((prevPage) => prevPage + 1); // Cambia la página actual
        }
      },
      { threshold: 1 }
    );

    // Observar el trigger cuando esté presente
    if (infiniteScrollTrigger.current) {
      observer.observe(infiniteScrollTrigger.current);
    }

    // Limpiar el observer al desmontar
    return () => {
      if (infiniteScrollTrigger.current) {
        observer.unobserve(infiniteScrollTrigger.current);
      }
    };
  }, [isLoading]);

  return (
    <div className="w-full font-exo min-h-screen bg-cover pt-[150px] pb-6 bg-center ">
      <div
        className=" z-[-1] w-full min-h-[100vh] fixed mt-[-157px]"
        style={{
          backgroundImage: "url('/imagen%202.png')",
          backgroundSize: "cover",
        }}
      ></div>

      <SearchBanner />

      <section className="w-full pb-14  mt-8 grid grid-cols-3 gap-10 justify-items-center">
        {error && (
          <div className="col-span-3">

          <p className="text-red-500 font-bold text-2xl p-2 bg-red-200 rounded-md shadow-md">
            Ups! Error al cargar los lugares :({" "}
          </p>
          </div>
        )}
        {items.map((field) => (
          <FieldCard
            key={field.id}
            field={field}
            isFavorite={favorites[field.id] || false}
            onToggleFavorite={() => toggleFavorite(field.id)}
          />
        ))}
        {isLoading &&
          Array.from({ length: 9 }).map((_, i) => <CardSkeleton key={i} />)}

      </section>
      {!error && (

        <div ref={infiniteScrollTrigger}></div>
      )}
    </div>
  );
};

function FieldCard({ field }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  console.log(field.id + ": " + isFavorite);

  const photos =
    field.photos && field.photos.length > 0
      ? field.photos
      : [
          "https://plus.unsplash.com/premium_photo-1684713510655-e6e31536168d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FuY2hhJTIwZGUlMjBmJUMzJUJBdGJvbHxlbnwwfHwwfHx8MA%3D%3D",
        ];
  const uniqueGradientId = `gradient-${field.id}`;

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
    <div className="w-[363px] bg-gradient-to-b from-main-blue to-dark-blue  rounded-xl shadow-lg  cursor-pointer hover:translate-y-[-5px] transition-transform duration-300 flex flex-col justify-between">
      <div
        className="w-full h-40 overflow-hidden relative "
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={photos[imageIndex]}
          alt=""
          className="w-full h-full object-cover rounded-t-xl"
        />
        <div
          className="absolute top-5 right-0 px-6"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <SVGRayo
            className={`h-[40px!important] hover:translate-y-[-3px] transition-transform`}
            uniqueGradientId={uniqueGradientId}
            fromColor={isFavorite ? "#ED3C16" : null}
            toColor={isFavorite ? "#FF6341" : null}
          />
        </div>
        <div className="rating absolute bottom-0 right-0 flex gap-1 items-center px-3">
          <Rating
            readOnly
            value={3.5}
            className="h-10  max-w-16"
            itemStyles={{
              itemShapes: Star,
              activeFillColor: "#ffb700",
              inactiveFillColor: "#fbf1a9",
            }}
          />
          <p className="text-white text-xs">(1987 reviews)</p>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-3">
        <div className="first-info">
          <h3 className="text-2xl font-bold mb-2 text-white">{field.name}</h3>
          <p
            className="text-sm text-white overflow-hidden flex items-center gap-1"
            alt="description"
          >
            <span className="font-semibold text-gray-400">Ubicación:</span>{" "}
            {field.address}
          </p>
        </div>
        <div className="description h-14 overflow-hidden">
          <p className="text-sm text-white">
            <span className="font-semibold text-gray-400">Horarios:</span> 8:00
            AM - 10:00 PM
          </p>
        </div>
      </div>
    </div>
  );
}
FieldCard.propTypes = {
  field: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    phone: PropTypes.string.isRequired,
    photos: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default Home;
