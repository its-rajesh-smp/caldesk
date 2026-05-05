import { Model } from "objection";

export class AppointmentSlot extends Model {
  id!: string;
  appointmentId!: string;
  url!: string;
  startAt!: Date;
  endAt!: Date;

  static tableName = "appointment_slots";

  static async create(
    appointmentSlotData: Partial<Omit<AppointmentSlot, "id">>,
  ) {
    return await this.query().insert(appointmentSlotData);
  }
}
