import { env } from "@config/env";
import { hashPassword } from "@utils/bcrypt";
import { createStaticUUID } from "@utils/uuid";
import { Knex } from "knex";
import { AppointmentStatus } from "../../types/appointments";
import { UserType } from "../../types/users";

const slotDate = (daysFromNow: number, hour: number, minute = 0) => {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + daysFromNow);
  date.setUTCHours(hour, minute, 0, 0);
  return date;
};

export async function seed(knex: Knex): Promise<void> {
  const hashedPassword = await hashPassword(env.MASTER_PASSWORD);

  await knex("users")
    .insert([
      {
        id: createStaticUUID("user-1"),
        name: "CalDesk Admin",
        email: "admin@gmail.com",
        password: hashedPassword,
        role: UserType.ADMIN,
      },
      {
        id: createStaticUUID("user-2"),
        name: "Bob Mehta",
        email: "bob@example.com",
        password: hashedPassword,
        role: UserType.USER,
      },
      {
        id: createStaticUUID("user-3"),
        name: "Carol Fernandes",
        email: "carol@example.com",
        password: hashedPassword,
        role: UserType.USER,
      },
      {
        id: createStaticUUID("user-4"),
        name: "Dr. Aisha Sharma",
        email: "doctor@gmail.com",
        password: hashedPassword,
        role: UserType.DOCTOR,
      },
      {
        id: createStaticUUID("doctor-cardiology"),
        name: "Dr. Kabir Rao",
        email: "cardio@caldesk.health",
        password: hashedPassword,
        role: UserType.DOCTOR,
      },
      {
        id: createStaticUUID("doctor-dermatology"),
        name: "Dr. Meera Iyer",
        email: "derma@caldesk.health",
        password: hashedPassword,
        role: UserType.DOCTOR,
      },
      {
        id: createStaticUUID("doctor-therapy"),
        name: "Dr. Naina Kapoor",
        email: "therapy@caldesk.health",
        password: hashedPassword,
        role: UserType.DOCTOR,
      },
      {
        id: createStaticUUID("patient-showcase"),
        name: "Rohan Patient",
        email: "patient@caldesk.health",
        password: hashedPassword,
        role: UserType.USER,
      },
    ])
    .onConflict("email")
    .ignore();

  await knex("users").where({ email: "doctor@gmail.com" }).update({
    name: "Dr. Aisha Sharma",
    role: UserType.DOCTOR,
  });
  await knex("users")
    .where({ email: "admin@gmail.com" })
    .update({ name: "CalDesk Admin" });
  await knex("users")
    .where({ email: "bob@example.com" })
    .update({ name: "Bob Mehta" });
  await knex("users")
    .where({ email: "carol@example.com" })
    .update({ name: "Carol Fernandes" });
  await knex("users")
    .where({ email: "cardio@caldesk.health" })
    .update({ name: "Dr. Kabir Rao", role: UserType.DOCTOR });
  await knex("users")
    .where({ email: "derma@caldesk.health" })
    .update({ name: "Dr. Meera Iyer", role: UserType.DOCTOR });
  await knex("users")
    .where({ email: "therapy@caldesk.health" })
    .update({ name: "Dr. Naina Kapoor", role: UserType.DOCTOR });
  await knex("users")
    .whereIn("email", [
      "cardio@caldesk.health",
      "derma@caldesk.health",
      "therapy@caldesk.health",
    ])
    .update({ role: UserType.DOCTOR });
  await knex("users")
    .where({ email: "patient@caldesk.health" })
    .update({ name: "Rohan Patient", role: UserType.USER });

  const appointments = [
    {
      id: createStaticUUID("appointment-primary-care"),
      name: "Primary care video consult",
      description:
        "A quick online visit for fever, cough, stomach issues, medications, and next-step guidance.",
      status: AppointmentStatus.ACTIVE,
      ownerId: createStaticUUID("user-4"),
    },
    {
      id: createStaticUUID("appointment-cardiology"),
      name: "Heart health consultation",
      description:
        "Discuss blood pressure, chest discomfort, cholesterol reports, and preventive cardiac care.",
      status: AppointmentStatus.ACTIVE,
      ownerId: createStaticUUID("doctor-cardiology"),
    },
    {
      id: createStaticUUID("appointment-dermatology"),
      name: "Skin and hair clinic",
      description:
        "Book care for rashes, acne, allergies, scalp concerns, and ongoing skin treatment reviews.",
      status: AppointmentStatus.ACTIVE,
      ownerId: createStaticUUID("doctor-dermatology"),
    },
    {
      id: createStaticUUID("appointment-therapy"),
      name: "Mental wellness session",
      description:
        "A private first conversation for anxiety, stress, sleep, burnout, and emotional wellbeing.",
      status: AppointmentStatus.ACTIVE,
      ownerId: createStaticUUID("doctor-therapy"),
    },
  ];

  await knex("appointments").insert(appointments).onConflict("id").merge();

  const slots = [
    {
      id: createStaticUUID("slot-primary-care-1"),
      appointmentId: createStaticUUID("appointment-primary-care"),
      url: "https://meet.google.com/caldesk-primary-care",
      startAt: slotDate(1, 4, 30),
      endAt: slotDate(1, 5, 0),
    },
    {
      id: createStaticUUID("slot-primary-care-2"),
      appointmentId: createStaticUUID("appointment-primary-care"),
      url: "https://meet.google.com/caldesk-primary-care",
      startAt: slotDate(1, 6, 0),
      endAt: slotDate(1, 6, 30),
    },
    {
      id: createStaticUUID("slot-primary-care-3"),
      appointmentId: createStaticUUID("appointment-primary-care"),
      url: "https://meet.google.com/caldesk-primary-care",
      startAt: slotDate(2, 8, 0),
      endAt: slotDate(2, 8, 30),
    },
    {
      id: createStaticUUID("slot-primary-care-next-year-1"),
      appointmentId: createStaticUUID("appointment-primary-care"),
      url: "https://meet.google.com/caldesk-primary-care",
      startAt: slotDate(370, 5, 0),
      endAt: slotDate(370, 5, 30),
    },
    {
      id: createStaticUUID("slot-primary-care-next-year-2"),
      appointmentId: createStaticUUID("appointment-primary-care"),
      url: "https://meet.google.com/caldesk-primary-care",
      startAt: slotDate(390, 7, 0),
      endAt: slotDate(390, 7, 30),
    },
    {
      id: createStaticUUID("slot-cardiology-1"),
      appointmentId: createStaticUUID("appointment-cardiology"),
      url: "https://meet.google.com/caldesk-cardiology",
      startAt: slotDate(1, 9, 0),
      endAt: slotDate(1, 9, 30),
    },
    {
      id: createStaticUUID("slot-cardiology-2"),
      appointmentId: createStaticUUID("appointment-cardiology"),
      url: "https://meet.google.com/caldesk-cardiology",
      startAt: slotDate(3, 10, 0),
      endAt: slotDate(3, 10, 30),
    },
    {
      id: createStaticUUID("slot-cardiology-next-year-1"),
      appointmentId: createStaticUUID("appointment-cardiology"),
      url: "https://meet.google.com/caldesk-cardiology",
      startAt: slotDate(375, 9, 30),
      endAt: slotDate(375, 10, 0),
    },
    {
      id: createStaticUUID("slot-cardiology-next-year-2"),
      appointmentId: createStaticUUID("appointment-cardiology"),
      url: "https://meet.google.com/caldesk-cardiology",
      startAt: slotDate(410, 11, 0),
      endAt: slotDate(410, 11, 30),
    },
    {
      id: createStaticUUID("slot-dermatology-1"),
      appointmentId: createStaticUUID("appointment-dermatology"),
      url: "https://meet.google.com/caldesk-dermatology",
      startAt: slotDate(2, 5, 30),
      endAt: slotDate(2, 6, 0),
    },
    {
      id: createStaticUUID("slot-dermatology-2"),
      appointmentId: createStaticUUID("appointment-dermatology"),
      url: "https://meet.google.com/caldesk-dermatology",
      startAt: slotDate(4, 7, 0),
      endAt: slotDate(4, 7, 30),
    },
    {
      id: createStaticUUID("slot-dermatology-next-year-1"),
      appointmentId: createStaticUUID("appointment-dermatology"),
      url: "https://meet.google.com/caldesk-dermatology",
      startAt: slotDate(385, 6, 0),
      endAt: slotDate(385, 6, 30),
    },
    {
      id: createStaticUUID("slot-dermatology-next-year-2"),
      appointmentId: createStaticUUID("appointment-dermatology"),
      url: "https://meet.google.com/caldesk-dermatology",
      startAt: slotDate(430, 8, 30),
      endAt: slotDate(430, 9, 0),
    },
    {
      id: createStaticUUID("slot-therapy-1"),
      appointmentId: createStaticUUID("appointment-therapy"),
      url: "https://meet.google.com/caldesk-therapy",
      startAt: slotDate(1, 12, 0),
      endAt: slotDate(1, 12, 45),
    },
    {
      id: createStaticUUID("slot-therapy-2"),
      appointmentId: createStaticUUID("appointment-therapy"),
      url: "https://meet.google.com/caldesk-therapy",
      startAt: slotDate(5, 11, 0),
      endAt: slotDate(5, 11, 45),
    },
    {
      id: createStaticUUID("slot-therapy-next-year-1"),
      appointmentId: createStaticUUID("appointment-therapy"),
      url: "https://meet.google.com/caldesk-therapy",
      startAt: slotDate(400, 12, 0),
      endAt: slotDate(400, 12, 45),
    },
    {
      id: createStaticUUID("slot-therapy-next-year-2"),
      appointmentId: createStaticUUID("appointment-therapy"),
      url: "https://meet.google.com/caldesk-therapy",
      startAt: slotDate(450, 10, 0),
      endAt: slotDate(450, 10, 45),
    },
  ];

  await knex("appointment_slots").insert(slots).onConflict("id").merge();

  await knex("user_appointments")
    .insert([
      {
        id: createStaticUUID("booking-showcase-primary-care"),
        userId: createStaticUUID("patient-showcase"),
        appointmentId: createStaticUUID("appointment-primary-care"),
        appointmentSlotId: createStaticUUID("slot-primary-care-1"),
      },
      {
        id: createStaticUUID("booking-showcase-cardiology"),
        userId: createStaticUUID("user-2"),
        appointmentId: createStaticUUID("appointment-cardiology"),
        appointmentSlotId: createStaticUUID("slot-cardiology-1"),
      },
    ])
    .onConflict("id")
    .ignore();
}
