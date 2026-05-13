import { Model } from "objection";

export class UserAppointment extends Model {
  id!: string;
  userId!: string;
  appointmentId!: string;
  appointmentSlotId!: string;

  static tableName = "user_appointments";

  static async create(
    userAppointmentData: Partial<Omit<UserAppointment, "id">>,
  ) {
    return await this.query().insert(userAppointmentData);
  }

  static async findOne(filter: Partial<UserAppointment>) {
    const query = this.query();

    if (filter.id) {
      query.where({ id: filter.id });
    }

    if (filter.appointmentId) {
      query.where({ appointmentId: filter.appointmentId });
    }

    if (filter.appointmentSlotId) {
      query.where({ appointmentSlotId: filter.appointmentSlotId });
    }

    return query.first();
  }

  static async findByUserIdWithDetails(userId: string) {
    return await this.query()
      .select(
        "user_appointments.*",
        "appointments.name as appointment_name",
        "appointments.description as appointment_description",
        "appointment_slots.url as slot_url",
        "appointment_slots.start_at as slot_start_at",
        "appointment_slots.end_at as slot_end_at",
        "doctors.id as doctor_id",
        "doctors.name as doctor_name",
        "doctors.email as doctor_email",
      )
      .join("appointments", "user_appointments.appointment_id", "appointments.id")
      .join(
        "appointment_slots",
        "user_appointments.appointment_slot_id",
        "appointment_slots.id",
      )
      .join("users as doctors", "appointments.owner_id", "doctors.id")
      .where("user_appointments.user_id", userId)
      .orderBy("appointment_slots.start_at", "asc");
  }
}
