import { drizzle } from "drizzle-orm/libsql/http";

import { env } from "../env.mjs";
import * as schema from "./schema";

export const db = env.DATABASE_URL ? drizzle({
  connection: {
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN || undefined,
  },
  schema,
}) : null;
