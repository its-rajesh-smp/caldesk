import axios from "axios";
import type { Appointment } from "../types/appointments";

export const getAppointments = async (): Promise<Appointment[]> => {
  return axios.get("/appointments");
};
