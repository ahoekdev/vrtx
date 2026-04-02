import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { users } from './users.schema';

export const tours = pgTable('tours', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull().unique(),
  createdBy: uuid('created_by')
    .notNull()
    .references(() => users.id, { onDelete: 'restrict' }),
  slug: text('slug').notNull().unique(),
});
