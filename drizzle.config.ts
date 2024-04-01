
import type { Config } from "drizzle-kit";
import dotenv from "dotenv";
dotenv.config({ path: './.env.local' });



export default {
    schema: "./src/db/schema/index.ts",
    out: "./src/db/migrations",
    driver: "turso",
    verbose: true,
    dbCredentials: {
        url: "libsql://tubeshots-db-zmzlois.turso.io",
        authToken: process.env.TURSO_AUTH_TOKEN,
    },
} satisfies Config;
