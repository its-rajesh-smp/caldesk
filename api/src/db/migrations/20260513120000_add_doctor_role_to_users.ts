import type { Knex } from "knex";
import { UserType } from "../../types/users";

export async function up(knex: Knex): Promise<void> {
  await knex.raw("alter table users drop constraint if exists users_role_check");
  await knex.raw(
    `alter table users add constraint users_role_check check (role in ('${UserType.ADMIN}', '${UserType.DOCTOR}', '${UserType.USER}'))`,
  );
}

export async function down(knex: Knex): Promise<void> {
  await knex("users")
    .where({ role: UserType.DOCTOR })
    .update({ role: UserType.USER });

  await knex.raw("alter table users drop constraint if exists users_role_check");
  await knex.raw(
    `alter table users add constraint users_role_check check (role in ('${UserType.ADMIN}', '${UserType.USER}'))`,
  );
}
