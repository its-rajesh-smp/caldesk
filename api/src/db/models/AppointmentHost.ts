import { Model } from "objection";
import { AppointmentHostType } from "../../types/appointment_hosts";

export class AppointmentHost extends Model {
  id!: string;
  userId!: string;
  appointmentId!: string;
  type!: AppointmentHostType;

  static tableName = "appointment_hosts";

  static async create(
    appointmentHostData: Partial<Omit<AppointmentHost, "id">>,
  ) {
    return await this.query().insert(appointmentHostData);
  }
}
