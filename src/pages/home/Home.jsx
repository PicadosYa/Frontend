// import React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useFields } from "../../services/FieldsService";
import { Register } from "../../components/register/Register";
import { Login } from "../../components/register/Login";
import { RecoveryCode } from "../../components/register/RecoveryCode";
import { ConfirmCode } from "../../components/register/ConfirmCode";
import { RegisterOwner } from "../../components/register/RegisterOwner";
import { MyProfile } from "../../components/register/MyProfile";
import { Choice } from "../../components/register/Choice";
import { HeaderSession } from "../../components/register/HeaderSession";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Footer from "../../components/footer/Footer";
import { Confirmation } from "../../components/register/Confirmation";
import { EmailConfirmation } from "../../components/register/EmailConfirmation";

const Home = () => {
	const [showDatepicker, setShowDatepicker] = useState(true);
	const [selectedDate, setSelectedDate] = useState(null);
	const [locationOptions, setLocationOptions] = useState([
		{ value: null, label: "Ubicacion" },
		{ value: "3km", label: "3 KM" },
		{ value: "7km", label: "7 KM" },
		{ value: "15km", label: "15 KM" },
		{ value: "25km", label: "25 KM" }
	]);
	const [dateOptions, setDateOptions] = useState([]);
	const [timeOptions, setTimeOptions] = useState([]);
	const [typeOptions, setTypeOptions] = useState([
		{ value: null, label: "Tipo" },
		{ value: "5v5", label: "Fútbol 5" },
		{ value: "7v7", label: "Fútbol 7" },
		{ value: "9v9", label: "Fútbol 9" },
		{ value: "11v11", label: "Fútbol 11" }
	]);
	const [currentPage, setCurrentPage] = useState(0); // React Paginate usa 0 como primera página
	const [showTimeDropdown, setShowTimeDropdown] = useState(false);
	const [selectedHour, setSelectedHour] = useState("");
	const [selectedMinute, setSelectedMinute] = useState("");

	const hours = Array.from({ length: 24 }, (_, i) => i); // Horas de 0 a 23
	const minutes = Array.from({ length: 60 }, (_, i) => i); // Minutos de 0 a 59


	// Calculamos el offset basado en la página actual
	const itemsPerPage = 12;
	const offset = currentPage * itemsPerPage + 3;

	const { data, isLoading, error } = useFields({
		limit: itemsPerPage,
		offset: offset,
	});

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
		console.log("Data:", data);
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
			console.error("Error fetching fields:", error);
		}
	};

	useEffect(() => {
		// Fetch para cargar las opciones
		const fetchOptions = async () => {
			try {
				const locationResponse = await fetch("/api/locations");
				const dateResponse = await fetch("/api/dates");
				const timeResponse = await fetch("/api/times");
				const typeResponse = await fetch("/api/types");

				setLocationOptions(await locationResponse.json());
				setDateOptions(await dateResponse.json());
				setTimeOptions(await timeResponse.json());
				setTypeOptions(await typeResponse.json());
			} catch (error) {
				console.error("Error fetching dropdown options:", error);
			}
		};
		fetchOptions();
	}, []);
	// Cambiar la opción del calendario

	return (
		<>
			<div>Espacio</div>
			<EmailConfirmation />
			<div>Espacio</div>
			<Confirmation />
			<div>Espacio</div>
			<HeaderSession />
			{/* <HeaderSession /> */}
			<div>Espacio</div>
			<Choice />
			<div>Espacio</div>
			<Login />
			<div>Espacio</div>
			<MyProfile />
			<div>Espacio</div>
			<Register />
			<div>Espacio</div>
			<RegisterOwner />
			<div>Espacio</div>
			<ConfirmCode />
			<div>Espacio</div>
			<RecoveryCode />
			<div>Espacio</div>
			<div
				className="w-full min-h-screen bg-cover pt-4 pb-6 bg-center"
				style={{ backgroundImage: "url('../../../public/imagen 2.png')" }}
			>
				{/* Header */}
				<header className="w-[calc(100%-40px)] mx-5 mt-5 bg-blue-700 bg-opacity-90 rounded-[25px] p-4 flex justify-between items-center" style={{ background: "linear-gradient(to right, rgba(26, 57, 210, 1), rgba(13, 29, 108, 1))" }}>
					<img
						src="../../../public/Logo.png"
						alt="Logo"
						className="w-219 h-16 mb-[-20px] mt-[-10px]"
					/>
					<div className="flex space-x-4">
						<button
							className="bg-orange-500 text-white rounded-[10px] px-6 py-2 shadow"
							style={{
								background: "linear-gradient(to right,rgba(237, 60, 22, 1), rgba(243, 64, 24, 1), rgba(241, 74, 37, 1), rgba(255, 99, 65, 1))",
								boxShadow: "0px 4px 3px 0px rgba(0, 0, 0, 0.69)",
								textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
							}}
						>
							Registrarme
						</button>
						<button
							className="bg-orange-500 text-white rounded-[10px] px-6 py-2 shadow"
							style={{
								background: "linear-gradient(to right,rgba(237, 60, 22, 1), rgba(243, 64, 24, 1), rgba(241, 74, 37, 1), rgba(255, 99, 65, 1))",
								boxShadow: "0px 4px 3px 0px rgba(0, 0, 0, 0.69)",
								textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
							}}
						>
							Iniciar sesión
						</button>
					</div>

				</header>

				{/* Contenedor principal */}
				<form className="flex flex-col space-y-6 w-[calc(100%-40px)] mx-5 mt-10 bg-gray-900 bg-opacity-70 rounded-[25px] p-6">
					<div className="flex flex-row justify-evenly pb-4">
						<select className="w-1/4 h-12 bg-blue-700 text-white rounded-lg p-2" style={{ background: "linear-gradient(to right, rgba(26, 57, 210, 1), rgba(13, 29, 108, 1))" }}>
							{locationOptions.map((location, index) => (
								<option key={index} value={location.value}><img src="../../../public/localizador.png" alt="" />
									{location.label}
								</option>
							))}
						</select>
						{showDatepicker && (
							<DatePicker
								placeholderText="Fecha"
								selected={selectedDate}
								onChange={(date) => setSelectedDate(date)}
								dateFormat="dd-MM-yyyy"
								className="w-full h-12 bg-blue-700 text-white rounded-lg p-2"
							/>
						)}
						<div className="w-1/4 h-12">
							<button
								type="button"
								onClick={() => {
									setShowTimeDropdown(!showTimeDropdown);
								}}
								className="w-full h-12 bg-blue-700 text-white rounded-lg p-2 flex items-center" style={{ background: "linear-gradient(to right, rgba(26, 57, 210, 1), rgba(13, 29, 108, 1))" }}
							><img src="../../../public/Clock.png" alt="" />
								{selectedHour !== "" && selectedMinute !== ""
									? `${selectedHour}:${selectedMinute}`
									: "Hora"}
							</button>

							{showTimeDropdown && (
								<div className="flex space-x-2 bg-blue-400 bg-opacity-30 justify-center space-x-8">
									{/* Dropdown de Horas */}
									<select
										value={selectedHour}
										onChange={(e) => setSelectedHour(
											e.target.value)}
										className="w-20 h-10 bg-blue-400 bg-opacity-30 text-white rounded-lg p-2"
									>
										<option value="" disabled>Hora</option>
										{hours.map((hour) => (
											<option key={hour} value={hour}>
												{hour.toString().padStart(2, "0")}
											</option>
										))}
									</select>

									{/* Dropdown de Minutos */}
									<select
										value={selectedMinute}
										onChange={(e) => setSelectedMinute(e.target.value)}
										className="w-20 h-10 bg-blue-700 bg-opacity-30 text-white rounded-lg p-2"
									>
										<option value="" disabled>Minutos</option>
										{minutes.map((minute) => (
											<option key={minute} value={minute}>
												{minute.toString().padStart(2, "0")}
											</option>
										))}
									</select>
								</div>
							)}
						</div>

						<select className="w-1/4 h-12 bg-blue-700 text-white rounded-lg p-2" style={{ background: "linear-gradient(to right, rgba(26, 57, 210, 1), rgba(13, 29, 108, 1))" }}>
							{typeOptions.map((type, index) => (
								<option key={index} value={type.value}>
									{type.label}
								</option>
							))}
						</select>

					</div>
					<div className="flex justify-center mb-8">
						<button
							className="relative bg-orange-500 text-white rounded-[25px] px-40 py-7 text-lg font-semibold border border-white"
							style={{
								background:
									"linear-gradient(to right, rgba(237, 60, 22, 1), rgba(255, 73, 28, 1), rgba(238, 75, 39, 1), rgba(255, 99, 65, 1))",
							}}
						>
							<img
								src="../../../public/image 37.png"
								alt=""
								className="absolute inset-0 m-auto"
								style={{ transform: "scale(0.9)" }} // Ajusta este valor para que la imagen sobresalga más o menos
							/>
						</button>
					</div>
				</form>

				<section className="w-[calc(100%-40px)]  pb-14 mx-5 mt-8 grid grid-cols-3 gap-10">
					{isLoading && <p>Cargando...</p>}
					{error && <p>Error al cargar los lugares:</p>}
					{data?.map((field, index) => (
						<FieldCard key={index} field={field} />
					))}
				</section>
			</div>
			<Footer />
		</>
	);
};

function FieldCard({ field }) {
	const [imageIndex, setImageIndex] = useState(0);
	const [intervalId, setIntervalId] = useState(null);
	const photos =
		field.photos && field.photos.length > 0
			? field.photos
			: [
				"https://plus.unsplash.com/premium_photo-1684713510655-e6e31536168d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FuY2hhJTIwZGUlMjBmJUMzJUJBdGJvbHxlbnwwfHwwfHx8MA%3D%3D",
			];
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
		<div className="w-[363px] h-[100%] bg-white opacity-90  rounded-md shadow-lg  cursor-pointer hover:translate-y-[-5px] transition-transform duration-300 flex flex-col justify-between">
			<div
				className="w-full h-40 overflow-hidden "
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				<img
					src={photos[imageIndex]}
					alt=""
					className="w-full h-full object-cover"
				/>
			</div>
			<div className="p-4 flex flex-col gap-3">
				<div className="first-info">
					<h3 className="text-2xl font-bold mb-2 text-gray-800">
						{field.name}
					</h3>
					<p
						className="text-sm text-gray-800 overflow-hidden flex items-center gap-1"
						alt="description"
					>
						<span className="font-semibold"></span> {field.address}
					</p>
				</div>
				<div className="description h-14 overflow-hidden">
					<p className="text-sm text-gray-500">
						<span className="font-semibold">Horarios:</span> 8:00 AM - 10:00 PM
					</p>
				</div>
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
