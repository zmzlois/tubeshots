import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { env } from "../lib/env";

const turso = createClient({
    url: env.db_url,
    authToken: env.db_token,
});

export const db = drizzle(turso);
