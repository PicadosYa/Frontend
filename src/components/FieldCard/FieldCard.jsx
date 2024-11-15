
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Rating, Star } from "@smastrom/react-rating";
import SVGRayo from "../../../public/rayo-picados-ya";


import "@smastrom/react-rating/style.css";
const FieldCard = ({field, onCardClick}) => {
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
  const handleClicked = () => {
    onCardClick();
  }
  return (
    <div className="w-[363px] bg-gradient-to-b from-main-blue to-dark-blue  rounded-xl shadow-lg  cursor-pointer hover:translate-y-[-5px] transition-transform duration-300 flex flex-col justify-between">
      <div
        className="w-full h-40 overflow-hidden relative "
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClicked}
      >
        <img
          src={photos[imageIndex]}
          alt=""
          className="w-full h-full object-cover rounded-t-xl"
        />
        <div
          className="absolute top-5 right-0 px-6"
          onClick={(e) => {
            e.stopPropagation(); 
            setIsFavorite(!isFavorite)
          }}
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
    </div>)
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
  onCardClick: PropTypes.func.isRequired,
};

export default FieldCard