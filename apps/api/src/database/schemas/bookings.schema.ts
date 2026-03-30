import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { users } from './users.schema';

export const bookings = pgTable('bookings', {
  id: uuid('id').defaultRandom().primaryKey(),
  comments: text('comments'),
  bookerId: uuid('booker_id')
    .notNull()
    .references(() => users.id, { onDelete: 'restrict' }),
});
