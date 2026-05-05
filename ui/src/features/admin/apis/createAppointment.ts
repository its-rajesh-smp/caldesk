import axios from "axios";

interface CreateAppointmentInput {
  title: string;
  description: string;
}

export const createAppointment = async (payload: CreateAppointmentInput) => {
  return axios.post("/admin/appointments", payload);
};
