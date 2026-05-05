import type { Knex } from "knex";
import { AppointmentStatus } from "../../types/appointments";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("appointments", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));

    table.string("name").notNullable();
    table.text("description").nullable();

    table
      .enum("status", [AppointmentStatus.ACTIVE, AppointmentStatus.INACTIVE])
      .notNullable()
      .defaultTo(AppointmentStatus.INACTIVE);

    table
      .uuid("owner_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("appointments");
}
