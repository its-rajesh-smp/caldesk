import type { Knex } from "knex";
import {
  AppointmentHostType,
  AppointmentHostTypes,
} from "../../types/appointment_hosts";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("appointment_hosts", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));

    table
      .enum("type", AppointmentHostTypes)
      .notNullable()
      .defaultTo(AppointmentHostType.CO_HOST);

    table
      .uuid("appointment_id")
      .notNullable()
      .references("id")
      .inTable("appointments")
      .onDelete("CASCADE");

    table
      .uuid("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("appointment_hosts");
}
