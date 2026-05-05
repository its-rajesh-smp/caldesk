import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("appointment_slots", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));

    table
      .uuid("appointment_id")
      .notNullable()
      .references("id")
      .inTable("appointments")
      .onDelete("CASCADE");

    table.string("url").notNullable();

    table.dateTime("start_at").notNullable();
    table.dateTime("end_at").notNullable();

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("appointment_slots");
}
