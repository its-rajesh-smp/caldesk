export interface Appointment {
  id: string;
  title: string;
  description: string;

  hostId: string;

  createdAt: Date;
  updatedAt: Date;
}
