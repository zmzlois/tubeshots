import { sql } from "drizzle-orm";
import { text, sqliteTableCreator, integer, type SQLiteTableWithColumns, type SQLiteTable } from "drizzle-orm/sqlite-core";

const sqliteTable = sqliteTableCreator((name) => `tubeshots_${name}`);

export const baseTable = {
    id: text("id", { length: 255 }).default(sql`random_uuid()`).primaryKey(),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
        .default(sql`CURRENT_TIMESTAMP(3)`)
        .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" }).default(sql`CURRENT_TIMESTAMP(3)`).notNull(),
    deleted: integer("deleted", { mode: "boolean" }).default(sql`DEFAULT 0`).notNull(),

}

const users = sqliteTable("users", {
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    ...baseTable,
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;


const orgs = sqliteTable("organisation", {
    name: text("name").notNull(),
    usersId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    ...baseTable,
})

export type InsertOrg = typeof orgs.$inferInsert;
export type SelectOrg = typeof orgs.$inferSelect;

const projects = sqliteTable("projects", {
    name: text("name").notNull(),
    orgsId: text("org_id").notNull().references(() => orgs.id, { onDelete: "cascade" }),
    ...baseTable,
})

export type InsertProject = typeof projects.$inferInsert;
export type SelectProject = typeof projects.$inferSelect;

const images = sqliteTable("images", {
    name: text("name").notNull(),
    url: text("url").notNull(),
    projectsId: text("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
    ...baseTable,
})

export type InsertImage = typeof images.$inferInsert;
export type SelectImage = typeof images.$inferSelect;
