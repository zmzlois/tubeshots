
import type { Config } from "drizzle-kit";
import dotenv from "dotenv";
dotenv.config({ path: "./.env.local" });

const connectionString = process.env.SUPABASE_DATABASE_URL;

if (!connectionString) {
    throw new Error("No connection string provided");
}

const host = process.env.SUPA_HOST;
const user = process.env.SUPA_USER;
const password = process.env.SUPA_PASSWORD;
const port = process.env.SUPA_PORT as unknown as number;
const database = process.env.SUPA_DATABASE;

const requirement = !host || !user || !password || !port || !database;

if (requirement) {
    throw new Error("Missing required environment variables");
}


export default {
    schema: "./src/db/schema/index.ts",
    out: "./src/db/migrations",
    driver: "pg",
    dbCredentials: {
        user: user,
        password: password,
        host: host,
        port: port,
        database: database,
    }
    // connectionString: process.env.SUPABASE_DATABASE_URL,    
} satisfies Config;
