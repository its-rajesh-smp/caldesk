import { Model } from "objection";
import { AppointmentStatus } from "../../types/appointments";
import { UserType } from "../../types/users";
import { AppointmentSlot } from "./AppointmentSlot";

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

  static async createWithSlots({
    appointmentData,
    slots,
  }: {
    appointmentData: Partial<Omit<Appointment, "id">>;
    slots: Array<{
      url: string;
      startAt: Date;
      endAt: Date;
    }>;
  }) {
    return await this.transaction(async (trx) => {
      const appointment = await this.query(trx).insert(appointmentData);

      const appointmentSlots = await AppointmentSlot.createMany(
        slots.map((slot) => ({
          appointmentId: appointment.id,
          ...slot,
        })),
        trx,
      );

      return {
        ...appointment,
        slots: appointmentSlots,
      };
    });
  }

  static async findActiveAppointments() {
    return await this.query().where({ status: AppointmentStatus.ACTIVE });
  }

  static async findActiveDoctorAppointments() {
    const appointments = await this.query()
      .select(
        "appointments.*",
        "users.id as doctor_id",
        "users.name as doctor_name",
        "users.email as doctor_email",
      )
      .join("users", "appointments.owner_id", "users.id")
      .where("appointments.status", AppointmentStatus.ACTIVE)
      .where("users.role", UserType.DOCTOR)
      .orderBy("appointments.created_at", "desc");

    const appointmentsWithSlots = await Promise.all(
      appointments.map(async (appointment: any) => {
        const slots = await AppointmentSlot.findByAppointmentIdWithBooking(
          appointment.id,
        );
        const { doctorId, doctorName, doctorEmail, ...appointmentData } =
          appointment;

        return {
          ...appointmentData,
          doctor: {
            id: doctorId,
            name: doctorName,
            email: doctorEmail,
          },
          slots,
        };
      }),
    );

    return appointmentsWithSlots;
  }
}
