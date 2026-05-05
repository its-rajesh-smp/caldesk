import { Model } from "objection";
import { UserAppointment } from "./UserAppointment";

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

  static async findByAppointmentId(appointmentId: string) {
    return await this.query().where({ appointmentId });
  }

  static async checkAvailability(slotId: string) {
    let isBooked = await UserAppointment.findOne({ appointmentSlotId: slotId });
    return !!isBooked;
  }

  static async findById(id: string) {
    return await this.query().findOne({ id }).throwIfNotFound();
  }
}
