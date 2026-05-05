import { Knex } from "knex";
import { knexSnakeCaseMappers } from "objection";
import path from "path";

const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      host: process.env.POSTGRES_HOST,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    },
    migrations: {
      directory: path.join(__dirname, "migrations"),
      extension: "ts",
    },
    seeds: {
      directory: path.join(__dirname, "seeds"),
      extension: "ts",
    },
    ...knexSnakeCaseMappers(),
  },
};

export default knexConfig;
