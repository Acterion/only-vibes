import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";

export const users = sqliteTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  isAdmin: integer("is_admin", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const challenges = sqliteTable("challenges", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text("title").notNull(),
  description: text("description").notNull(),
  difficulty: text("difficulty", {
    enum: ["easy", "medium", "hard"],
  }).notNull(),
  category: text("category").notNull(),
  expectedOutput: text("expected_output").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const submissions = sqliteTable("submissions", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  challengeId: text("challenge_id")
    .notNull()
    .references(() => challenges.id),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  prompt: text("prompt").notNull(),
  aiResponse: text("ai_response").notNull(),
  score: integer("score").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});
