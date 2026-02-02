import "server-only";

import knex from "knex";
import config from "knexfile";

const env = process.env.NODE_ENV || "development";

// const parseTimestamp = (value: string) => new Date(value);
// pg.types.setTypeParser(pg.types.builtins.TIMESTAMPTZ, parseTimestamp);
// pg.types.setTypeParser(pg.types.builtins.TIMESTAMP, parseTimestamp);

declare global {
  var knexGlobal: ReturnType<typeof knex> | undefined;
}

export const knexInstance = global.knexGlobal ?? knex(config[env]);

if (process.env.NODE_ENV !== "production") {
  global.knexGlobal = knexInstance;
}

export default knexInstance;
