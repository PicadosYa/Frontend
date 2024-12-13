import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "../../config/axios";
import { useNavigate } from "react-router-dom";
import { useCreateReservation } from "@/services/ReservationService";
import { toast } from "react-toastify";

const PayPalPaymentButton = ({ amount, reservation }) => {
  const [orderID, setOrderID] = useState(null);
  const createReservation = useCreateReservation();
  const navigate = useNavigate();

  const createOrder = async () => {
    try {
      const response = await axios.post("/create-paypal-order", {
        id: "6",
        name: "Dos cabezas",
        amount: amount,
        currency: "UYU",
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      
        return response.data.orderID;
      
    } catch (error) {
      console.error("Error creating PayPal order", error);
      if (error.status === 401) {
        toast.error("No estas logueado");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
        
      } else if (error.status === 404) {
        toast.error("No se pudo crear la reserva");
        setTimeout(() => {
          navigate("/register");
        }, 2000);
      }
    }
  };

  const onApprove = async (data) => {
    try {
      const response = await axios.get(`/capture-paypal-order/${data.orderID}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      if (response.data.status === "Payment successful") {
        // Logica adicional post-pago (guardar en base de datos, etc.)
        //const reservation = {...reservation, payment_id: data.orderID};
        createReservation.mutate(reservation, {
          onSuccess: () => {
            

            toast.success("Reserva creada exitosamente");
            setTimeout(() => {
              navigate("/mis-reservas");
              
            }, 2000)
          },
          onError: (error) => {
            toast.error(`Error al crear la reserva: ${error.message}`);
          },
        });
      }
    } catch (error) {
      console.error("Error capturing PayPal order", error);
      if (error.status === 401) {
        toast.error("No estas logueado");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
        
      } else if (error.status === 404) {
        toast.error("No se pudo crear la reserva");
        setTimeout(() => {
          navigate("/register");
        }, 2000);
      }
    }
  };

  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AXfAPVc0QxERFDnIueXH2y75yiVCA7jhDWDSn0KhTHhuMEV9_rBflAWWv0awcAy58cku8YukLhoGQmMH",
        currency: "USD",
      }}
    >
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </PayPalScriptProvider>
  );
};

export default PayPalPaymentButton;
