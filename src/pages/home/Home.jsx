// import React from "react";
import { useState, useEffect, useRef } from "react";
import { useFields } from "../../services/FieldsService";

import "@smastrom/react-rating/style.css";
import SearchBanner from "../../components/searchBanner/SearchBanner";
import CardSkeleton from "../../components/FieldCard/CardSkeleton";
import FieldCard from "../../components/FieldCard/FieldCard";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(0); // React Paginate usa 0 como primera página
  const [items, setItems] = useState([]);
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

export default Home;
