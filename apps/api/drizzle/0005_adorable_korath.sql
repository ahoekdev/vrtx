CREATE TABLE "tour_stages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order" integer NOT NULL,
	"tour_id" uuid NOT NULL,
	"stage_id" uuid NOT NULL,
	CONSTRAINT "tour_stages_tour_order_unique" UNIQUE("tour_id","order")
);
--> statement-breakpoint
ALTER TABLE "tour_stages" ADD CONSTRAINT "tour_stages_tour_id_tours_id_fk" FOREIGN KEY ("tour_id") REFERENCES "public"."tours"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tour_stages" ADD CONSTRAINT "tour_stages_stage_id_stages_id_fk" FOREIGN KEY ("stage_id") REFERENCES "public"."stages"("id") ON DELETE restrict ON UPDATE no action;