import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../config/axios";

export const reservationKeys = {
  all: ['reservations'],
  list: () => [...reservationKeys.all, 'list'],
  detail: (id) => [...reservationKeys.all, 'detail', id],
  create: () => [...reservationKeys.all, 'create'],
  update: (id) => [...reservationKeys.all, 'update', id],
  delete: (id) => [...reservationKeys.all, 'delete', id],
};

export const ReservationService = {

  async getReservations() {
    const { data } = await axios.get('/reservations');
    return data;
  },

  async createReservation(reservationData) {
    console.log(reservationData);
    const { data } = await axios.post('/reservations', reservationData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return data;
  },
};

export const useCreateReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reservationData) => ReservationService.createReservation(reservationData),
    onSuccess: () => {
      queryClient.invalidateQueries(reservationKeys.list());
    },
  });
};