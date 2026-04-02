import { integer, pgTable, text, unique, uuid } from 'drizzle-orm/pg-core';
import { rooms } from './rooms.schema';

export const beds = pgTable(
  'beds',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    order: integer('order').notNull(),
    placement: text('placement').notNull(),
    roomId: uuid('room_id')
      .notNull()
      .references(() => rooms.id, { onDelete: 'restrict' }),
  },
  (table) => [unique('beds_room_order_unique').on(table.roomId, table.order)],
);
