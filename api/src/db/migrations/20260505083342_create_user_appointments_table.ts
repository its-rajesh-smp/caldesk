import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("user_appointments", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));

    table
      .uuid("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table
      .uuid("appointment_id")
      .notNullable()
      .references("id")
      .inTable("appointments")
      .onDelete("CASCADE");

    table
      .uuid("appointment_slot_id")
      .notNullable()
      .references("id")
      .inTable("appointment_slots")
      .onDelete("CASCADE");

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("user_appointments");
}
