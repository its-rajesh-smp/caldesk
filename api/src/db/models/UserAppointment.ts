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
}
