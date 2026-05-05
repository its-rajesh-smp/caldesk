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

  createdAt: Date | string;
  updatedAt: Date | string;
}
