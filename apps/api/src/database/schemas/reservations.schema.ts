import { boolean, date, pgTable, unique, uuid } from 'drizzle-orm/pg-core';
import { beds } from './beds.schema';
import { bookings } from './bookings.schema';

export const reservations = pgTable(
  'reservations',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    date: date('date').notNull(),
    halfBoard: boolean('half_board').notNull(),
    bedId: uuid('bed_id')
      .notNull()
      .references(() => beds.id, { onDelete: 'restrict' }),
    bookingId: uuid('booking_id')
      .notNull()
      .references(() => bookings.id, { onDelete: 'cascade' }),
  },
  (table) => [
    unique('reservations_bed_date_unique').on(table.bedId, table.date),
  ],
);
