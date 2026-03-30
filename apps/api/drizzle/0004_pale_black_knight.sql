CREATE TABLE "stages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"from_lodge_id" uuid NOT NULL,
	"to_lodge_id" uuid NOT NULL,
	"duration" integer NOT NULL,
	"distance" integer NOT NULL,
	CONSTRAINT "stages_from_to_unique" UNIQUE("from_lodge_id","to_lodge_id")
);
--> statement-breakpoint
ALTER TABLE "stages" ADD CONSTRAINT "stages_from_lodge_id_lodges_id_fk" FOREIGN KEY ("from_lodge_id") REFERENCES "public"."lodges"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stages" ADD CONSTRAINT "stages_to_lodge_id_lodges_id_fk" FOREIGN KEY ("to_lodge_id") REFERENCES "public"."lodges"("id") ON DELETE restrict ON UPDATE no action;