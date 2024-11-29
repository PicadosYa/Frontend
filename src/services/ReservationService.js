import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../config/axios";
/**  const createPreference = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/create_preference", {
        title: field?.name || "Cancha",
        quantity: 1,
        price: field?.price || 500,
      });

      const { id } = response.data;
      return id;
    } catch (error) {
      console.error("Error creating preference:", error);
      toast.error("No se pudo crear la preferencia de pago.");
    }
  };

  const handleBuy = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
  }; */

export const reservationKeys = {
  all: ["reservations"],
  list: () => [...reservationKeys.all, "list"],
  detail: (id) => [...reservationKeys.all, "detail", id],
  create: () => [...reservationKeys.all, "create"],
  update: (id) => [...reservationKeys.all, "update", id],
  delete: (id) => [...reservationKeys.all, "delete", id],
};

export const ReservationService = {
  async createPreference(field, user, totalPrice) {
    const res = await axios.post("/create_preference", {
      id: field?.id.toString(),
      title: field?.name,
      quantity: 1,
      price: totalPrice,
      user_id: user?.id.toString(),
      email: user?.email,
    });

    return res.data.id;
  },

  async getReservations() {
    const { data } = await axios.get("/reservations");
    return data;
  },

  async createReservation(reservationData) {
    console.log(reservationData);
    const { data } = await axios.post("/reservations", reservationData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    return data;
  },
};

export const useCreateReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reservationData) =>
      ReservationService.createReservation(reservationData),
    onSuccess: () => {
      queryClient.invalidateQueries(reservationKeys.list());
    },
  });
};
