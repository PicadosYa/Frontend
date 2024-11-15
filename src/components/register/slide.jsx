// Slideshow Component
type SlideshowProps = {
    images: string[];
  };
  
  export const Slideshow: React.FC<SlideshowProps> = ({ images }) => {
    const [currentImage, setCurrentImage] = React.useState(0);
  
    React.useEffect(() => {
      const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }, [images]);
  
    return (
      <div className="slideshow">
        <img src={images[currentImage]} alt={`Slide ${currentImage + 1}`} />
      </div>
    );
  };