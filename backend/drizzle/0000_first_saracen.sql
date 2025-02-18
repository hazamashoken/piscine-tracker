CREATE TABLE "location_stat" (
	"id" varchar PRIMARY KEY NOT NULL,
	"user" integer,
	"date" timestamp,
	"duration" numeric,
	"created" timestamp,
	"updated" timestamp
);
--> statement-breakpoint
CREATE TABLE "locations" (
	"id" integer PRIMARY KEY NOT NULL,
	"user" integer,
	"begin_at" timestamp,
	"end_at" timestamp,
	"host" varchar
);
--> statement-breakpoint
CREATE TABLE "pisciners" (
	"id" integer PRIMARY KEY NOT NULL,
	"login" varchar,
	"email" varchar,
	"first_name" varchar,
	"last_name" varchar,
	"usual_full_name" varchar,
	"level" numeric,
	"url" varchar,
	"displayname" varchar,
	"kind" varchar,
	"pool_month" varchar,
	"pool_year" varchar,
	"image_url" varchar,
	"is_pisciner" boolean,
	"created" timestamp,
	"updated" timestamp
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar,
	"slug" varchar,
	"exam" boolean,
	"created" timestamp,
	"updated" timestamp
);
--> statement-breakpoint
CREATE TABLE "scale_teams" (
	"id" integer PRIMARY KEY NOT NULL,
	"scale_id" integer,
	"corrector" integer,
	"corrected" integer,
	"final_mark" integer,
	"comment" text,
	"feedback" text,
	"flag" varchar,
	"created" timestamp,
	"updated" timestamp
);
--> statement-breakpoint
CREATE TABLE "team_members" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "team_members_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user" integer,
	"team" integer
);
--> statement-breakpoint
CREATE TABLE "teams" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar,
	"status" varchar,
	"final_mark" integer,
	"repo_url" varchar,
	"project_name" varchar,
	"project_id" integer,
	"created" timestamp,
	"updated" timestamp
);
--> statement-breakpoint
ALTER TABLE "location_stat" ADD CONSTRAINT "location_stat_user_pisciners_id_fk" FOREIGN KEY ("user") REFERENCES "public"."pisciners"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "locations" ADD CONSTRAINT "locations_user_pisciners_id_fk" FOREIGN KEY ("user") REFERENCES "public"."pisciners"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scale_teams" ADD CONSTRAINT "scale_teams_corrector_pisciners_id_fk" FOREIGN KEY ("corrector") REFERENCES "public"."pisciners"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scale_teams" ADD CONSTRAINT "scale_teams_corrected_pisciners_id_fk" FOREIGN KEY ("corrected") REFERENCES "public"."pisciners"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_user_pisciners_id_fk" FOREIGN KEY ("user") REFERENCES "public"."pisciners"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_team_teams_id_fk" FOREIGN KEY ("team") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teams" ADD CONSTRAINT "teams_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;