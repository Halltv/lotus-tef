import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Contacts table for storing form submissions from the landing page
 */
export const contacts = mysqlTable('contacts', {
  id: int('id').autoincrement().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 320 }).notNull(),
  company: varchar('company', { length: 255 }),
  phone: varchar('phone', { length: 20 }),
  message: text('message'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
});

export type Contact = typeof contacts.$inferSelect;
export type InsertContact = typeof contacts.$inferInsert;

/**
 * Files table for storing uploaded files metadata
 */
export const files = mysqlTable('files', {
  id: int('id').autoincrement().primaryKey(),
  fileName: varchar('fileName', { length: 255 }).notNull(),
  fileKey: varchar('fileKey', { length: 512 }).notNull().unique(),
  fileUrl: text('fileUrl').notNull(),
  fileSize: int('fileSize').notNull(),
  mimeType: varchar('mimeType', { length: 100 }).notNull(),
  uploadedBy: int('uploadedBy').notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow().notNull(),
});

export type File = typeof files.$inferSelect;
export type InsertFile = typeof files.$inferInsert;

/**
 * News table for storing news/articles with images and captions
 */
export const news = mysqlTable('news', {
  id: int('id').autoincrement().primaryKey(),
  imageUrl: text('imageUrl').notNull(),
  imageHash: varchar('imageHash', { length: 64 }).notNull().unique(), // SHA-256 hash for duplicate detection
  caption: text('caption').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  published: timestamp('published').defaultNow().notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow().notNull(),
});

export type News = typeof news.$inferSelect;
export type InsertNews = typeof news.$inferInsert;