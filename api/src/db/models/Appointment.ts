import { Model } from "objection";
import { AppointmentStatus } from "../../types/appointments";

export class Appointment extends Model {
  id!: string;
  name!: string;
  description!: string;
  status!: AppointmentStatus;
  ownerId!: string;

  static tableName = "appointments";

  static async create(appointmentData: Partial<Omit<Appointment, "id">>) {
    return await this.query().insert(appointmentData);
  }
}
