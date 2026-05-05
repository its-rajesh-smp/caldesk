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
}
