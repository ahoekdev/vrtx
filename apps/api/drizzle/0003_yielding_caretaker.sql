CREATE TABLE "tours" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_by" uuid NOT NULL,
	"slug" text NOT NULL,
	CONSTRAINT "tours_name_unique" UNIQUE("name"),
	CONSTRAINT "tours_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "tours" ADD CONSTRAINT "tours_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;