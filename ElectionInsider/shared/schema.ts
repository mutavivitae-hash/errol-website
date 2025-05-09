import { pgTable, text, serial, timestamp, varchar, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  date: timestamp("date").notNull(),
  location: text("location").notNull(),
  description: text("description").notNull(),
});

export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertContactSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true,
}).extend({
  email: z.string().email(),
});

export const insertSubscriberSchema = createInsertSchema(newsletterSubscribers).omit({
  id: true,
  createdAt: true,
}).extend({
  email: z.string().email(),
});

export const insertAdminSchema = createInsertSchema(adminUsers).omit({
  id: true,
  createdAt: true,
  passwordHash: true,
}).extend({
  password: z.string().min(8),
  email: z.string().email(),
});

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = z.infer<typeof insertContactSchema>;

export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type InsertNewsletterSubscriber = z.infer<typeof insertSubscriberSchema>;

export type Event = typeof events.$inferSelect;

export type AdminUser = typeof adminUsers.$inferSelect;
export type InsertAdminUser = z.infer<typeof insertAdminSchema>;