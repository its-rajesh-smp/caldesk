import axios from "axios";

export interface MyAppointment {
  id: string;
  appointmentId: string;
  appointmentSlotId: string;
  bookedAt: Date | string;
  consultation: {
    name: string;
    description?: string;
  };
  doctor: {
    id: string;
    name: string;
    email: string;
  };
  slot: {
    url: string;
    startAt: Date | string;
    endAt: Date | string;
  };
}

export const getMyAppointments = async (): Promise<MyAppointment[]> => {
  return axios.get("/me/appointments");
};
