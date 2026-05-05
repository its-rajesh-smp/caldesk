import type { Knex } from "knex";
import { UserType } from "../../types/users";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
    table
      .enum("role", [UserType.ADMIN, UserType.USER])
      .notNullable()
      .defaultTo(UserType.USER);

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("users");
}
