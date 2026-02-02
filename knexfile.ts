import dotenv from "dotenv";
import type { Knex } from "knex";
dotenv.config({ path: ".env.local" });

const base: Knex.Config = {
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: false,
    // ssl: {
    //   rejectUnauthorized: false,
    // },
  },
  migrations: {
    directory: "./src/db/migrations",
    tableName: "knex_migrations",
  },
};

const config: Record<string, Knex.Config> = {
  development: base,
  production: base,
  ci: base,
};

export default config;
