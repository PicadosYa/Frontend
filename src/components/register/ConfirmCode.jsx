import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PicadosYaLoader from "../../assets/rayo-picados-ya-loader";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { validateConfirmCodeForm } from "../../pages/auth/register/validations/FormValidations";

export function ConfirmCode({ token, email }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [onlyNewPasswordInput, setOnlyNewPasswordInput] = useState(false);
  const [formData, setFormData] = useState({
    token: token || "",
    email: email,
    new_password: "",
    confirm_password: "",
  });

  useEffect(() => {
    if (token && email) {
      setOnlyNewPasswordInput(true);
    }
  }, [token, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(JSON.stringify(formData));

    const errors = validateConfirmCodeForm(formData);
    if (errors?.length > 0) {
      setErrors(errors);
      setIsLoading(false);
      return;
    }
    setErrors([]);

    const response = await fetch(
      `${Global.endpoints.backend}users/reset-password`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    const data = await response.json();
    if (response.status === 200) {
      setTimeout(() => {
        toast.success("Se ha cambiado la contraseña");
      }, 3000);
      navigate("/login");
    } else {
      toast.error(data.message);
    }
    setIsLoading(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div
      className="w-[519px]  bg-blue-700 rounded-[25px] flex flex-col items-center p-6"
      style={{
        background:
          "linear-gradient(to bottom, rgba(26, 57, 210, 1), rgba(13, 29, 108, 1))",
      }}
    >
      <div className="flex w-full items-center justify-between mb-6 ">
        <Link to="/">
          <img
            src="Logo.png"
            alt="Logo"
            className="h-[64px] mt-[-10px] mb-[-6px]"
          />
        </Link>
      </div>
      <h2
        className="text-white text-xl font-semibold text-center"
        style={{ fontFamily: "Exo, sans-serif", lineHeight: "normal" }}
      >
        Confirma tu nueva contraseña
      </h2>
      {!onlyNewPasswordInput && (
        <p className="text-gray-300 text-xs text-center">
          Nota: Pudes poner el codigo directamente aquí, o clickear sobre el
          botón del mail que fue enviado
        </p>
      )}
      <form
        className="flex flex-col w-3/4 max-w-md mb-4 space-y-8 pt-4"
        onSubmit={handleSubmit}
      >
        {!onlyNewPasswordInput && (
          <input
            type="text"
            name="token"
            placeholder="Código secreto"
            value={formData.token}
            onChange={(e) => handleChange(e)}
            className="h-10 px-4 text-lg rounded-lg border border-gray-300 shadow-sm shadow-black"
          />
        )}
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            name="new_password"
            placeholder="Nueva contraseña"
            value={formData.new_password}
            onChange={(e) => handleChange(e)}
            className="h-10 px-4 text-lg rounded-lg border border-gray-300 shadow-sm shadow-black"
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility()}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            aria-label={
              showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
            }
          >
            {showPassword ? (
              <EyeSlashIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            )}
          </button>
        </div>
        <div className="relative w-full">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirm_password"
            value={formData.confirm_password}
            onChange={(e) => handleChange(e)}
            placeholder="Confirmar nueva contraseña"
            className="h-10 px-4 text-lg rounded-lg border border-gray-300 shadow-sm shadow-black"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            aria-label={
              showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"
            }
          >
            {showConfirmPassword ? (
              <EyeSlashIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            )}
          </button>
        </div>
        {errors.length > 0 && (
          <p className="text-red-500 text-sm">{errors[0].message}</p>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="h-12 flex justify-center items-center bg-orange-500 text-white text-lg rounded-[25px] shadow-sm shadow-black"
          style={{
            background:
              "linear-gradient(to right, rgba(237, 60, 22, 1), rgba(243, 64, 24, 1), rgba(241, 74, 37, 1), rgba(255, 99, 65, 1))",
          }}
        >
          {isLoading ? (
            <PicadosYaLoader className="h-full" />
          ) : (
            "Confirmar nueva contraseña"
          )}
        </button>
      </form>
    </div>
  );
}

ConfirmCode.propTypes = {
  token: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};
