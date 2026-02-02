import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // 1️⃣ Create enum type for user roles
  await knex.raw(`
    CREATE TYPE user_role_enum AS ENUM (
      'STUDENT',
      'SUPER_ADMIN',
      'TEACHER',
      'MANAGER',
      'STAFF'
    )
  `);

  // 2️⃣ Create users table
  await knex.schema.createTable("users", (table) => {
    table.uuid("id").primary();

    table.string("first_name").notNullable();
    table.string("last_name").nullable();

    table.string("email").notNullable().unique();
    table.string("phone_number").notNullable();

    table.string("gender").nullable();
    table.date("date_of_birth").nullable();
    table.string("country_of_citizenship").nullable();

    // PostgreSQL array
    table.specificType("technologies", "text[]").notNullable().defaultTo("{}");

    // Enum
    table
      .specificType("role", "user_role_enum")
      .notNullable()
      .defaultTo("STUDENT");

    table.timestamps(true, true); // created_at, updated_at
  });
}

export async function down(knex: Knex): Promise<void> {
  // Order matters
  await knex.schema.dropTableIfExists("users");
  await knex.raw(`DROP TYPE IF EXISTS user_role_enum`);
}
