import {
  boolean,
  integer,
  numeric,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const piscinerTable = pgTable("pisciners", {
  id: integer().primaryKey(),
  login: varchar(),
  email: varchar(),
  first_name: varchar(),
  last_name: varchar(),
  usual_full_name: varchar(),
  level: numeric(),
  url: varchar(),
  displayname: varchar(),
  kind: varchar(),
  pool_month: varchar(),
  pool_year: varchar(),
  image_url: varchar(),
  is_pisciner: boolean(),
  created: timestamp(),
  updated: timestamp(),
});

export const projectTable = pgTable("projects", {
  id: integer().primaryKey(),
  name: varchar(),
  slug: varchar(),
  exam: boolean(),
  created: timestamp(),
  updated: timestamp(),
});

export const scaleTeamTable = pgTable("scale_teams", {
  id: integer().primaryKey(),
  scale_id: integer(),
  corrector: integer().references(() => piscinerTable.id),
  corrected: integer().references(() => piscinerTable.id),
  final_mark: integer(),
  comment: text(),
  feedback: text(),
  flag: varchar(),
  created: timestamp(),
  updated: timestamp(),
});

export const teamTable = pgTable("teams", {
  id: integer().primaryKey(),
  name: varchar(),
  status: varchar(),
  final_mark: integer(),
  repo_url: varchar(),
  project_name: varchar(),
  project_id: integer().references(() => projectTable.id),
  created: timestamp(),
  updated: timestamp(),
});

export const locationStatTable = pgTable("location_stat", {
  id: varchar().primaryKey(),
  user: integer().references(() => piscinerTable.id),
  date: timestamp(),
  duration: numeric(),
  created: timestamp(),
  updated: timestamp(),
});

export const teamMemberTable = pgTable("team_members", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user: integer().references(() => piscinerTable.id),
  team: integer().references(() => teamTable.id),
});
