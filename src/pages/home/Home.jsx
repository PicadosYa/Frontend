import React, { useState, useEffect, useRef } from "react";
import { useFields } from "../../services/FieldsService";
import { Outlet, useNavigate } from "react-router-dom";

import "@smastrom/react-rating/style.css";
import SearchBanner from "../../components/searchBanner/SearchBanner";
import CardSkeleton from "../../components/FieldCard/CardSkeleton";
import FieldCard from "../../components/FieldCard/FieldCard";
import Header from "../../components/header/Headerv2";
import Footer from "../../components/footer/Footer";
import { Banner } from "./Banner";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
//import { ChevronDown, ChevronUp } from "lucide-react";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [items, setItems] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const [viewMode, setViewMode] = useState('slide'); // 'slide' or 'scroll'
  const navigate = useNavigate();

  const itemsPerPage = 12;
  const offset = currentPage * itemsPerPage + 3;

  const { data, isLoading, error } = useFields({
    limit: itemsPerPage,
    offset: offset,
  });

  // Slide Auto-Rotation Logic
  useEffect(() => {
    if (viewMode === 'slide' && items.length > 0) {
      const slideTimer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % Math.min(3, items.length));
      }, 3000); // Change slide every 3 seconds

      return () => clearInterval(slideTimer);
    }
  }, [viewMode, items]);

  useEffect(() => {
    if (data && !isLoading) {
      setItems((prevItems) => [...prevItems, ...data]);
    }
  }, [data, isLoading]);

  const toggleFavorite = (fieldId) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [fieldId]: !prevFavorites[fieldId],
    }));
  };

  const handleScrollDown = () => {
    setViewMode('scroll');
  };

  const handleScrollUp = () => {
    setViewMode('slide');
  };

  // Infinite Scroll Logic
  const infiniteScrollTrigger = useRef(null);
  useEffect(() => {
    if (viewMode !== 'scroll') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1 }
    );

    if (infiniteScrollTrigger.current) {
      observer.observe(infiniteScrollTrigger.current);
    }

    return () => {
      if (infiniteScrollTrigger.current) {
        observer.unobserve(infiniteScrollTrigger.current);
      }
    };
  }, [isLoading, viewMode]);

  return (
    <>
      <Header />
      <div className="w-full font-exo min-h-screen  bg-cover pt-[150px] pb-6 bg-center">
        <div 
          className={`z-[-2] w-full min-h-screen fixed mt-[-157px]`} 
          style={{
            background: "linear-gradient(180deg, rgba(1, 5, 33) 7.54%, rgba(1, 12, 84) 68.08%, rgba(2, 16, 109) 76.86%, rgba(2, 20, 135) 99.96%)",
          }}
        />
        <div
          className={`z-[-1] w-full min-h-screen  fixed mt-[-157px] opacity-50`}
          style={{
            backgroundImage: "url('/imagen%202.png')",
            backgroundSize: "cover",
          }}
        />

        <SearchBanner />
        <Outlet />

        {viewMode === 'slide' && (
          <div className="w-full flex justify-center items-center mb-8">
            {items.slice(0, 3).map((field, index) => (
              <div 
                key={field.id} 
                className={`transition-all duration-500 ${
                  index === currentSlide ? 'scale-100 opacity-100' : 'scale-75 opacity-50'
                }`}
              >
                <FieldCard
                  field={field}
                  isFavorite={favorites[field.id] || false}
                  onToggleFavorite={() => toggleFavorite(field.id)}
                  onCardClick={() => navigate(`/field/${field.id}`)}
                />
              </div>
            ))}
          </div>
        )}

        {viewMode === 'slide' && (
        <div 
          className="w-full flex justify-center cursor-pointer hover:scale-110 transition-transform"
          onClick={handleScrollDown}
        >
          <MdArrowDropDown size={48} className="text-white rounded-full bg-orange-dark" />
        </div>
        )}
        {viewMode === 'scroll' && (
          <>
            

            <section className="w-full pb-14 mt-8 grid grid-cols-3 gap-10 justify-items-center">
              {error && (
                <div className="col-span-3">
                  <p className="text-red-500 font-bold text-2xl p-2 bg-red-200 rounded-md shadow-md">
                    Ups! Error al cargar los lugares
                  </p>
                </div>
              )}
              {items.map((field) => (
                <FieldCard
                  key={field.id}
                  field={field}
                  isFavorite={favorites[field.id] || false}
                  onToggleFavorite={() => toggleFavorite(field.id)}
                  onCardClick={() => navigate(`/field/${field.id}`)}
                />
              ))}
              {isLoading &&
                Array.from({ length: 9 }).map((_, i) => <CardSkeleton key={i} />)}
            </section>
            {!error && <div ref={infiniteScrollTrigger}></div>}
          </>
        )}
      </div>

      {/* Wrap Banner and Footer with refs */}
     
        {viewMode === 'scroll' ? (
          <div className="fixed bottom-0 w-full z-5">
            <div 
              className="w-full fixed bottom-20 z-[7] flex justify-center cursor-pointer hover:scale-110 transition-transform "
              onClick={handleScrollUp}
            >
              <MdArrowDropUp size={48} className="text-white rounded-full bg-orange-dark" />
            </div>
            <Banner />
          </div>
        ) : (
          <Banner />
        )}
      

      
        {viewMode !== 'scroll' && <Footer />}
      
    </>
  );
};

export default Home;