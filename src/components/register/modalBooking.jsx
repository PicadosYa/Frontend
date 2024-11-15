import React from 'react';
import './FutbolCard.css';
import { Slideshow } from './Slideshow';
import Button from './Button';
import Icon from './Icon';

const FutbolCard = () => {
  const images = [
    'image1.jpg',
    'image2.jpg',
    'image3.jpg',
    'image4.jpg',
    'image5.jpg'
  ];

  return (
    <div className="futbol-card">
      <div className="futbol-card__header">
        <h3>Bella Vista Fútbol 5</h3>
        <p>Bella Vista</p>
        <span className="futbol-card__rating">⭐⭐⭐⭐⭐</span>
        <address>Agraciada 3100</address>
      </div>
      <Slideshow images={images} />
      <div className="futbol-card__info">
        <p>
          Bella Vista Fútbol 5, cancha techada de Fútbol 5 y hermosa barbacoa para cumpleaños. Contamos con un lugar integral, parrillero con barbacoa para 30 personas adultas, cancha techada, vestuarios con agua caliente, para las fiestas trabajamos con empresas de inflables, alquileres de piezas y calzones, tortas de cumpleaños, proyector y demás.
        </p>
        <div className="futbol-card__amenities">
          <Icon name="parking" />
          <Icon name="wifi" />
          <Icon name="duchas" />
          <Icon name="estacionamiento" />
        </div>
      </div>
      <div className="futbol-card__cta">
        <Button text="¡Quiero reservar!" onClick={() => alert('Reserva solicitada')} />
        <a href="https://wa.me/22082166" className="futbol-card__whatsapp">
          <Icon name="whatsapp" /> 2208 2166
        </a>
      </div>
    </div>
  );
};

export default FutbolCard;






