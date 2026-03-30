import { integer, pgTable, unique, uuid } from 'drizzle-orm/pg-core';
import { lodges } from './lodges.schema';

export const stages = pgTable(
  'stages',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    fromLodgeId: uuid('from_lodge_id')
      .notNull()
      .references(() => lodges.id, { onDelete: 'restrict' }),
    toLodgeId: uuid('to_lodge_id')
      .notNull()
      .references(() => lodges.id, { onDelete: 'restrict' }),
    duration: integer('duration').notNull(),
    distance: integer('distance').notNull(),
  },
  (table) => [
    unique('stages_from_to_unique').on(table.fromLodgeId, table.toLodgeId),
  ],
);
