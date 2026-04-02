CREATE TABLE "beds" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order" integer NOT NULL,
	"placement" text NOT NULL,
	"room_id" uuid NOT NULL,
	CONSTRAINT "beds_room_order_unique" UNIQUE("room_id","order")
);
--> statement-breakpoint
CREATE TABLE "rooms" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"price" numeric NOT NULL,
	"lodge_id" uuid NOT NULL,
	CONSTRAINT "rooms_lodge_name_unique" UNIQUE("lodge_id","name"),
	CONSTRAINT "rooms_price_nonnegative" CHECK ("rooms"."price" >= 0)
);
--> statement-breakpoint
ALTER TABLE "beds" ADD CONSTRAINT "beds_room_id_rooms_id_fk" FOREIGN KEY ("room_id") REFERENCES "public"."rooms"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_lodge_id_lodges_id_fk" FOREIGN KEY ("lodge_id") REFERENCES "public"."lodges"("id") ON DELETE restrict ON UPDATE no action;