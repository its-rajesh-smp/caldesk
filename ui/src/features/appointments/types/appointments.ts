export interface Appointment {
  id: string;
  name: string;
  title?: string;
  description?: string;
  url?: string;

  startDateTime?: Date | string;
  endDateTime?: Date | string;

  hostId?: string;
  ownerId?: string;
  owner_id?: string;
  status?: "active" | "inactive";
  doctor?: {
    id: string;
    name: string;
    email: string;
  };
  slots?: AppointmentSlot[];

  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface AppointmentSlot {
  id: string;
  appointmentId: string;
  url: string;
  startAt: Date | string;
  endAt: Date | string;
  isBooked?: boolean;
}
