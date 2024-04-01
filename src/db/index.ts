
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from '@/lib/env'


const connectionString = process.env.SUPABASE_DATABASE_URL

console.log("connectionString", connectionString)

if (!connectionString) {
    throw new Error("No connection string provided")
}

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(connectionString, { prepare: false })
const db = drizzle(client)