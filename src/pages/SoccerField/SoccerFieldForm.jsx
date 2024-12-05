import { useEffect, useRef, useState } from "react";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import marker from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { MdArrowBack, MdArrowLeft, MdArrowRight, MdUpload } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { Field } from "../../services/FieldsService";
import { useAuth } from "../../hooks";
import { toast, ToastContainer } from "react-toastify";
import { set } from "zod";
import PicadosYaLoader from "../../assets/rayo-picados-ya-loader";
//import { ChevronRight, ChevronLeft, MapPin, Upload, X } from 'lucide-react';

// Datos de países latinoamericanos
const LATAM_COUNTRIES = [
  { code: "+54", name: "Argentina", flag: "🇦🇷" },
  { code: "+591", name: "Bolivia", flag: "🇧🇴" },
  { code: "+55", name: "Brasil", flag: "🇧🇷" },
  { code: "+56", name: "Chile", flag: "🇨🇱" },
  { code: "+57", name: "Colombia", flag: "🇨🇴" },
  { code: "+593", name: "Ecuador", flag: "🇪🇨" },
  { code: "+502", name: "Guatemala", flag: "🇬🇹" },
  { code: "+504", name: "Honduras", flag: "🇭🇳" },
  { code: "+52", name: "México", flag: "🇲🇽" },
  { code: "+595", name: "Paraguay", flag: "🇵🇾" },
  { code: "+51", name: "Perú", flag: "🇵🇪" },
  { code: "+598", name: "Uruguay", flag: "🇺🇾" },
  { code: "+58", name: "Venezuela", flag: "🇻🇪" },
];

// Servicios disponibles
const SERVICES = [
  {id:1, name:"Vestuarios"},
  {id:2, name:"Ducha"},
  {id:3, name:"Parking"},
  {id:4, name:"Cocina"},
  {id:5, name:"Iluminación"},
  {id: 6, name: "Piscina" },
  {id: 7, name: "Aire Acondicionado" },
  {id: 11, name: "Wifi" },
  {id: 12, name: "Césped Sintético" },
];

const SoccerFieldForm = () => {
  const [step, setStep] = useState(1);
  const user = useAuth().auth;
  const refreshToken = useAuth().authUser;
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    neighborhood: "",
    phoneCode: "+54",
    phoneNumber: "",
    fieldType: "",
    pricePerHour: "",
    services: [],
    description: "",
    location: null,
    images: [],
  });

  const [selectedServices, setSelectedServices] = useState([]);
  const [currentService, setCurrentService] = useState("");
  const [mapLocation, setMapLocation] = useState(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  // Coordenadas iniciales (por ejemplo, centro de Buenos Aires)
  const [mapCenter, setMapCenter] = useState({
    lat: -34.6037,
    lng: -58.3816,
  });

useEffect(() => {
    if (step === 3) {
      // Inicializar mapa solo en el step 2
      const map = L.map('map-container').setView([mapCenter.lat, mapCenter.lng], 13);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      // Configurar ícono de marcador personalizado
      const DefaultIcon = L.icon({
        iconUrl: marker,
        shadowUrl: markerShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41]
      });
      L.Marker.prototype.options.icon = DefaultIcon;

      // Evento de click en el mapa
      map.on('click', (e) => {
        const { lat, lng } = e.latlng;
        
        // Remover marcador anterior si existe
        if (markerRef.current) {
          map.removeLayer(markerRef.current);
        }

        // Agregar nuevo marcador
        const newMarker = L.marker([lat, lng]).addTo(map);
        markerRef.current = newMarker;

        // Actualizar estado
        setMapLocation({ lat, lng });
        setFormData(prev => ({
          ...prev,
          location: { lat, lng }
        }));
      });

      mapRef.current = map;

      // Limpiar mapa al desmontar
      return () => {
        map.remove();
      };
    }
  }, [step]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addService = () => {
    if (currentService && !selectedServices.includes(currentService)) {
      setSelectedServices([...selectedServices, currentService]);
      setCurrentService("");
      setFormData((prev) => ({
        ...prev,
        services: [...selectedServices, currentService],
      }));
    }
  };

  const removeService = (serviceToRemove) => {
    const updatedServices = selectedServices.filter(
      (service) => service !== serviceToRemove
    );
    setSelectedServices(updatedServices);
    setFormData((prev) => ({
      ...prev,
      services: updatedServices,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const removeImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex justify-center space-x-2 mb-4">
        {[1, 2, 3, 4].map((num) => (
          <div
            key={num}
            className={`h-2 w-16 rounded-full ${
              step === num ? "bg-dark-blue" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && mapRef.current) {
      const address = e.target.value;
      
      // Usar servicio de geocodificación de OpenStreetMap
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
        .then(response => response.json())
        .then(data => {
          if (data.length > 0) {
            const { lat, lon } = data[0];
            const newLocation = { lat: parseFloat(lat), lng: parseFloat(lon) };
            
            // Centrar mapa en nueva ubicación
            mapRef.current.setView([newLocation.lat, newLocation.lng], 13);
            
            // Remover marcador anterior
            if (markerRef.current) {
              mapRef.current.removeLayer(markerRef.current);
            }

            // Agregar nuevo marcador
            const newMarker = L.marker([newLocation.lat, newLocation.lng]).addTo(mapRef.current);
            markerRef.current = newMarker;

            // Actualizar estados
            setMapCenter(newLocation);
            setMapLocation(newLocation);
            setFormData(prev => ({
              ...prev,
              location: newLocation
            }));
          }
        })
        .catch(error => {
          console.error('Error en búsqueda:', error);
        });
    }
  };

  const handleGeolocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newLocation = { lat: latitude, lng: longitude };

          // Centrar mapa
          mapRef.current.setView([newLocation.lat, newLocation.lng], 13);
          
          // Remover marcador anterior
          if (markerRef.current) {
            mapRef.current.removeLayer(markerRef.current);
          }

          // Agregar nuevo marcador
          const newMarker = L.marker([newLocation.lat, newLocation.lng]).addTo(mapRef.current);
          markerRef.current = newMarker;

          // Actualizar estados
          setMapCenter(newLocation);
          setMapLocation(newLocation);
          setFormData(prev => ({
            ...prev,
            location: newLocation
          }));
        },
        (error) => {
          console.error("Error obteniendo ubicación", error);
        }
      );
    }
  };
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Nombre de la Cancha</label>
              <input
                className="w-full px-3 py-2 border rounded-md"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Nombre de la cancha"
              />
            </div>

            <div>
              <label className="block mb-2">Dirección</label>
              <input
                className="w-full px-3 py-2 border rounded-md"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Dirección completa"
              />
            </div>

            <div>
              <label className="block mb-2">Barrio</label>
              <input
                className="w-full px-3 py-2 border rounded-md"
                name="neighborhood"
                value={formData.neighborhood}
                onChange={handleInputChange}
                placeholder="Barrio"
              />
            </div>
            <div>
              <label className="block mb-2">Servicios</label>
              <div className="flex space-x-2 mb-2">
                <select
                  className="w-2/3 px-3 py-2 border rounded-md"
                  value={currentService}
                  onChange={(e) => setCurrentService(e.target.value)}
                >
                  <option value="">Seleccione un servicio</option>
                  {SERVICES.filter(
                    (service) => !selectedServices.includes(service)
                  ).map((service) => (
                    <option key={service.name} value={service.name}>
                      {service.name}
                    </option>
                  ))}
                </select>
                <button
                  className="w-1/3 px-3 py-2 bg-dark-blue text-white rounded-md"
                  onClick={addService}
                  disabled={!currentService}
                >
                  Agregar
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedServices.map((service) => (
                  <div
                    key={service}
                    className="bg-blue-100 px-2 py-1 rounded-full flex items-center space-x-1"
                  >
                    <span>{service}</span>
                    <button
                      onClick={() => removeService(service)}
                      className="text-red-500"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Número de Teléfono</label>
              <div className="flex space-x-2">
                <select
                  className="w-1/3 px-2 py-2 border rounded-md"
                  value={formData.phoneCode}
                  onChange={(e) => handleInputChange(e)}
                  name="phoneCode"
                >
                  {LATAM_COUNTRIES.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.code}
                    </option>
                  ))}
                </select>
                <input
                  className="w-2/3 px-3 py-2 border rounded-md"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Número"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2">Tipo de Cancha</label>
              <select
                className="w-full px-3 py-2 border rounded-md"
                value={formData.fieldType}
                onChange={handleInputChange}
                name="fieldType"
              >
                <option value="">Seleccione</option>
                {["5", "7", "11"].map((type) => (
                  <option key={type} value={type}>
                    {type} jugadores
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2">Precio por Hora</label>
              <input
                className="w-full px-3 py-2 border rounded-md"
                name="pricePerHour"
                value={formData.pricePerHour}
                onChange={handleInputChange}
                placeholder="Precio"
                type="number"
              />
            </div>

            <div>
              <label className="block mb-2">Descripción</label>
              <textarea
                className="w-full px-3 py-2 border rounded-md"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Descripción de la cancha"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div id="map-container" className="h-[400px] w-full"></div>
            <div className="mt-4">
              <label className="block mb-2">Buscar Ubicación</label>
              <div className="flex space-x-2">
                <input 
                  type="text" 
                  placeholder="Ingrese dirección" 
                  className="w-3/4 px-3 py-2 border rounded-md"
                  onKeyDown={handleSearch}
                />
                <button 
                  className="w-1/4 px-3 py-2 bg-blue-500 text-white rounded-md"
                  onClick={handleGeolocation}
                >
                  Mi Ubicación
                </button>
              </div>
            </div>
            {mapLocation && (
              <div className="mt-2 text-sm text-gray-600">
                Lat: {mapLocation.lat.toFixed(4)}, Lng: {mapLocation.lng.toFixed(4)}
              </div>
            )}
          </div>
        );
      case 4:
        return (
          <div>
            <label className="block mb-2">Subir Imágenes</label>
            <div
              className="border-2 border-dashed border-gray-300 
              rounded-lg p-8 text-center cursor-pointer hover:border-blue-500"
            >
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <MdUpload className="mx-auto mb-4 h-32 w-32 text-dark-blue hover:translate-y-[-5px] transition-transform"/>
                <p>Arrastra y suelta o haz clic para subir</p>
              </label>
            </div>

            <div className="grid grid-cols-4 gap-4 mt-4">
              {formData.images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`preview-${index}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                    onClick={() => removeImage(index)}
                  >
                    {/* <X size={16}/> */}
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const handleSubmit = () => {
    setLoading(true)
    // Transform form data to match the Field constructor
    const newField = new Field({
      name: formData.name,
      user_id: user.id,
      address: formData.address,
      neighborhood: formData.neighborhood,
      phone: `${formData.phoneCode}${formData.phoneNumber}`,
      type: formData.fieldType,
      price: parseFloat(formData.pricePerHour),
      description: formData.description,
      latitude: formData.location?.lat,
      longitude: formData.location?.lng,
      services: selectedServices.map(serviceName => {
        const service = SERVICES.find(s => s.name === serviceName);
        return { id: service.id };
      }),
      creation_date: new Date().toISOString().split('T')[0],
      available_days: ['1', '2'],
      fieldImages: formData.images
    });

    // Save the field
    newField.save({
      onSuccess: (data) => {
        console.log('Field saved successfully:', data);
        refreshToken();
        setLoading(false);
        setTimeout(()=>{
          toast.success('Se ha guardado la cancha');
        }, 2000)
        navigate("/canchero/reservas")
        // Additional success handling (e.g., navigate to another page)
      },
      onError: (error) => {
        setLoading(false);
        if (error.status === 401) {
          navigate("/login");
        }
        console.error('Error saving field:', error);
        toast.error('Error al guardar la cancha');
      }
    });
  };

  return (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center  z-50">
    <ToastContainer />
    <div className="w-full max-w-4xl h-screen bg-white shadow-lg rounded-lg relative p-6 overflow-y-auto">
      {renderStepIndicator()}
      <Link to="/">
        <MdArrowBack className="absolute top-4 left-6 text-2xl cursor-pointer hover:text-orange-dark transition-colors"/>
      
      </Link>
      <div className="mb-6">{renderStepContent()}</div>

      <div className="flex justify-between">
        {step > 1 && (
          <button
            onClick={prevStep}
            className="px-4 py-2 border rounded-md flex items-center"
          >
            <MdArrowLeft />

            Anterior
          </button>
        )}

        {step < 4 && (
          <button
            onClick={nextStep}
            className="ml-auto px-4 py-2 bg-dark-blue text-white rounded-md flex items-center"
          >
            Siguiente
            <MdArrowRight className="ml-2"/>
          </button>
        )}

        {step === 4 && (
          <button
            onClick={handleSubmit}
            className="ml-auto px-4 py-2 bg-orange-dark text-white rounded-md"
          >
            {loading ? <PicadosYaLoader className="h-10" /> : 'Enviar'}
            
          </button>
        )}
      </div>
    </div>
  </div>
);

};

export default SoccerFieldForm;
