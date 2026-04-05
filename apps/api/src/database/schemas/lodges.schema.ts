import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { users } from './users.schema';

export const lodges = pgTable('lodges', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull().unique(),
  country: text('country').notNull(),
  keeperId: uuid('keeper_id')
    .notNull()
    .references(() => users.id, { onDelete: 'restrict' }),
  slug: text('slug').notNull().unique(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
});
