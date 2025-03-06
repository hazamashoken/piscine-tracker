import {
  boolean,
  foreignKey,
  integer,
  numeric,
  pgTable,
  primaryKey,
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
  created: timestamp({ withTimezone: true }),
  updated: timestamp({ withTimezone: true }),
});

export const projectTable = pgTable("projects", {
  id: integer().primaryKey(),
  name: varchar(),
  slug: varchar(),
  exam: boolean(),
  created: timestamp({ withTimezone: true }),
  updated: timestamp({ withTimezone: true }),
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
  team_id: integer().references(() => teamTable.id),
  created: timestamp({ withTimezone: true }),
  updated: timestamp({ withTimezone: true }),
});

export const teamTable = pgTable("teams", {
  id: integer().primaryKey(),
  name: varchar(),
  status: varchar(),
  final_mark: integer(),
  upload_mark: integer(),
  repo_url: varchar(),
  project_name: varchar(),
  project_id: integer().references(() => projectTable.id),
  created: timestamp({ withTimezone: true }),
  updated: timestamp({ withTimezone: true }),
});

export const locationStatTable = pgTable("location_stat", {
  id: varchar().primaryKey(),
  user: integer().references(() => piscinerTable.id),
  date: timestamp({ withTimezone: true }),
  duration: numeric(),
  created: timestamp({ withTimezone: true }),
  updated: timestamp({ withTimezone: true }),
});

export const teamMemberTable = pgTable(
  "team_members",
  {
    user_id: integer("user_id").notNull(),
    team_id: integer("team_id").notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.user_id],
      foreignColumns: [piscinerTable.id],
      name: "team_members_user_id_pisciners_id_fk",
    }),
    foreignKey({
      columns: [table.team_id],
      foreignColumns: [teamTable.id],
      name: "team_members_team_id_teams_id_fk",
    }),
    primaryKey({
      columns: [table.user_id, table.team_id],
      name: "team_members_user_id_team_id_pk",
    }),
  ],
);

export const locationTable = pgTable("locations", {
  id: integer().primaryKey(),
  user: integer().references(() => piscinerTable.id),
  begin_at: timestamp({ withTimezone: true }),
  end_at: timestamp({ withTimezone: true }),
  host: varchar(),
});
