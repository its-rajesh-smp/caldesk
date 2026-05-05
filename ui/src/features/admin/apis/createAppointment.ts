import axios from "axios";

export const createAppointment = async () => {
  return axios.post("/admin/appointments");
};
