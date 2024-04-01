import { sql } from "drizzle-orm";

import { pgTableCreator, serial, text, varchar, integer, boolean, timestamp } from "drizzle-orm/pg-core";

const pgTable = pgTableCreator((name) => `tubeshots_${name}`);

export const baseTable = {
    id: varchar("id", { length: 255 }).default(sql`random_uuid()`).primaryKey(),
    createdAt: timestamp("created_at", { mode: "string" })
        .default(sql`CURRENT_TIMESTAMP(3)`)
        .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" }).default(sql`CURRENT_TIMESTAMP(3)`).notNull(),
    deleted: boolean("deleted").default(sql`DEFAULT 0`).notNull(),

}

const users = pgTable("users", {
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    ...baseTable,
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;


const orgs = pgTable("organisation", {
    name: text("name").notNull(),
    usersId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    ...baseTable,
})

export type InsertOrg = typeof orgs.$inferInsert;
export type SelectOrg = typeof orgs.$inferSelect;

const projects = pgTable("projects", {
    name: text("name").notNull(),
    orgsId: text("org_id").notNull().references(() => orgs.id, { onDelete: "cascade" }),
    ...baseTable,
})

export type InsertProject = typeof projects.$inferInsert;
export type SelectProject = typeof projects.$inferSelect;

const images = pgTable("images", {
    name: text("name").notNull(),
    url: text("url").notNull(),
    projectsId: text("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
    ...baseTable,
})

export type InsertImage = typeof images.$inferInsert;
export type SelectImage = typeof images.$inferSelect;
