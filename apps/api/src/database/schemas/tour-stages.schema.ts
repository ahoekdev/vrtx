import { integer, pgTable, unique, uuid } from 'drizzle-orm/pg-core';
import { stages } from './stages.schema';
import { tours } from './tours.schema';

export const tourStages = pgTable(
  'tour_stages',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    order: integer('order').notNull(),
    tourId: uuid('tour_id')
      .notNull()
      .references(() => tours.id, { onDelete: 'restrict' }),
    stageId: uuid('stage_id')
      .notNull()
      .references(() => stages.id, { onDelete: 'restrict' }),
  },
  (table) => [
    unique('tour_stages_tour_order_unique').on(table.tourId, table.order),
  ],
);
