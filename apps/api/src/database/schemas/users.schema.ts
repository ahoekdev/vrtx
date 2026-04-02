import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export type UserRole = 'user' | 'keeper';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull().default(''),
  role: text('role').$type<UserRole>().notNull().default('user'),
  isConfirmed: boolean('is_confirmed').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
