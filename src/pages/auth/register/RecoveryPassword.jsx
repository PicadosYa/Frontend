import { useState } from "react";
import {
  RecoveryCode,
  ConfirmCode,
} from "../../../components/register/index";
import { useSearchParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const RecoveryPassword = () => {
  const [searchParams] = useSearchParams();
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [emailSent, setEmailSent] = useState("");

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  if (token && email) {
    return (
      <div
        className="flex flex-col items-center justify-center h-screen "
        style={{
          backgroundImage: "url('/imagen%202.png')",
          backgroundSize: "cover",
        }}
      >
        <ToastContainer />
        <ConfirmCode token={token} email={email} />
      </div>
    );
  } else {
    return (
      <div
        className="flex flex-col items-center justify-center h-screen "
        style={{
          backgroundImage: "url('/imagen%202.png')",
          backgroundSize: "cover",
        }}
      >
        <ToastContainer />

        {isEmailSent ? (
          <ConfirmCode email={emailSent} />
        ) : (
          <RecoveryCode
            setIsEmailSent={setIsEmailSent}
            setEmailSent={setEmailSent}
          />
        )}
      </div>
    );
  }
};

export default RecoveryPassword;
