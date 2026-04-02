import { sql } from 'drizzle-orm';
import {
  check,
  numeric,
  pgTable,
  text,
  unique,
  uuid,
} from 'drizzle-orm/pg-core';
import { lodges } from './lodges.schema';

export const rooms = pgTable(
  'rooms',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    price: numeric('price').notNull(),
    lodgeId: uuid('lodge_id')
      .notNull()
      .references(() => lodges.id, { onDelete: 'restrict' }),
  },
  (table) => [
    unique('rooms_lodge_name_unique').on(table.lodgeId, table.name),
    check('rooms_price_nonnegative', sql`${table.price} >= 0`),
  ],
);
