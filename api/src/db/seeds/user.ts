import { env } from "@config/env";
import { hashPassword } from "@utils/bcrypt";
import { createStaticUUID } from "@utils/uuid";
import { Knex } from "knex";
import { UserType } from "../../types/users";

export async function seed(knex: Knex): Promise<void> {
  const hashedPassword = await hashPassword(env.MASTER_PASSWORD);

  await knex("users")
    .insert([
      {
        id: createStaticUUID("user-1"),
        email: "admin@gmail.com",
        password: hashedPassword,
        role: UserType.ADMIN,
      },
      {
        id: createStaticUUID("user-2"),
        email: "bob@example.com",
        password: hashedPassword,
        role: UserType.USER,
      },
      {
        id: createStaticUUID("user-3"),
        email: "carol@example.com",
        password: hashedPassword,
        role: UserType.USER,
      },
      {
        id: createStaticUUID("user-4"),
        email: "doctor@gmail.com",
        password: hashedPassword,
        role: UserType.ADMIN,
      },
    ])
    .onConflict("email")
    .ignore();
}
