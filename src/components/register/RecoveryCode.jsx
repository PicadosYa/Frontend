import { useState } from "react";
import PropTypes from "prop-types";
import { Global } from "../../helpers/Global";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import PicadosYaLoader from "../../assets/rayo-picados-ya-loader";
import { validateSendRecuperationCodeForm } from "../../pages/auth/register/validations/FormValidations";

export function RecoveryCode({ setIsEmailSent, setEmailSent }) {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const errors = validateSendRecuperationCodeForm({ email });
    if (errors?.length > 0) {
      setErrors(errors);
      setIsLoading(false);
      return;
    }
    setErrors([]);
    const response = await fetch(
      `${Global.endpoints.backend}users/password-recovery`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      }
    );
    const data = await response.json();
    console.log(response.status);
    if (response.status === 200) {
      setTimeout(() => {
        toast.success("Se ha enviado un correo de recuperación");
      }, 3000);
      setEmailSent(email);
      setIsEmailSent(true);
    } else {
      toast.error(data.message);
    }
    setIsLoading(false);
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div
      className="w-[519px] h-[328px] bg-blue-700 rounded-[25px] flex flex-col items-center p-6"
      style={{
        background:
          "linear-gradient(to bottom, rgba(26, 57, 210, 1), rgba(13, 29, 108, 1))",
      }}
    >
      <div className="flex w-full items-center justify-between mb-6 ">
        <Link to="/">
          <img
            src="/Logo.png"
            alt="Logo"
            className="h-[64px] mt-[-10px] mb-[-6px]"
          />
        </Link>
      </div>
      <h2
        className="text-white text-xl font-semibold mb-8 text-center"
        style={{ fontFamily: "Exo, sans-serif", lineHeight: "normal" }}
      >
        Enviaremos un código de recuperación
      </h2>
      <form
        className="flex flex-col w-3/4 max-w-md mb-4 gap-6"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Correo asociado a tu cuenta"
          autoComplete="email"
          onChange={(e) => handleChange(e)}
          value={email}
          className="h-10 px-4 text-lg rounded-lg border border-gray-300 shadow-sm shadow-black"
        />

        {errors?.length >0 &&(

          <p className="text-red-500 text-sm mt-[-15px] ">
            {errors[0].message}
          </p>
        )
        }

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
            <PicadosYaLoader className="h-full " />
          ) : (
            "Enviar código"
          )}
        </button>
      </form>
    </div>
  );
}

RecoveryCode.propTypes = {
  setIsEmailSent: PropTypes.func.isRequired,
  setEmailSent: PropTypes.func.isRequired,
};
