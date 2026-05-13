import axios from "axios";

interface DoctorSlotInput {
  startAt: string;
  endAt: string;
}

interface CreateDoctorAppointmentInput {
  name: string;
  description?: string;
  url: string;
  slots: DoctorSlotInput[];
}

export const createDoctorAppointment = async (
  payload: CreateDoctorAppointmentInput,
) => {
  return axios.post("/doctor/appointments", payload);
};
