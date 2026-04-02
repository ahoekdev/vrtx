CREATE TABLE "lodges" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"country" text NOT NULL,
	"keeper_id" uuid NOT NULL,
	"slug" text NOT NULL,
	CONSTRAINT "lodges_name_unique" UNIQUE("name"),
	CONSTRAINT "lodges_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "lodges" ADD CONSTRAINT "lodges_keeper_id_users_id_fk" FOREIGN KEY ("keeper_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;