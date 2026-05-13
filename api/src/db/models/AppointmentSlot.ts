import { Model } from "objection";
import { UserAppointment } from "./UserAppointment";

export class AppointmentSlot extends Model {
  id!: string;
  appointmentId!: string;
  url!: string;
  startAt!: Date;
  endAt!: Date;
  isBooked?: boolean;

  static tableName = "appointment_slots";

  static async create(
    appointmentSlotData: Partial<Omit<AppointmentSlot, "id">>,
  ) {
    return await this.query().insert(appointmentSlotData);
  }

  static async createMany(
    appointmentSlotData: Partial<Omit<AppointmentSlot, "id">>[],
    trx?: any,
  ) {
    return await this.query(trx).insert(appointmentSlotData);
  }

  static async findByAppointmentId(appointmentId: string) {
    return await this.query().where({ appointmentId });
  }

  static async findByAppointmentIdWithBooking(appointmentId: string) {
    const slots = await this.query()
      .select("appointment_slots.*", "user_appointments.id as booking_id")
      .leftJoin(
        "user_appointments",
        "appointment_slots.id",
        "user_appointments.appointment_slot_id",
      )
      .where("appointment_slots.appointment_id", appointmentId)
      .orderBy("appointment_slots.start_at", "asc");

    return slots.map((slot: any) => ({
      ...slot,
      isBooked: Boolean(slot.bookingId),
      bookingId: undefined,
    }));
  }

  static async checkAvailability(slotId: string) {
    let isBooked = await UserAppointment.findOne({ appointmentSlotId: slotId });
    return !!isBooked;
  }

  static async findById(id: string) {
    return await this.query().findOne({ id }).throwIfNotFound();
  }
}
