import axios from "axios";

export const bookAppointment = async ({
  appointmentId,
  slotId,
}: {
  appointmentId: string;
  slotId: string;
}) => {
  return axios.post(`/me/appointments/${appointmentId}/slots/${slotId}`);
};
