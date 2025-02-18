import {
  boolean,
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
  created: timestamp({ withTimezone: true }),
  updated: timestamp({ withTimezone: true }),
});

export const teamTable = pgTable("teams", {
  id: integer().primaryKey(),
  name: varchar(),
  status: varchar(),
  final_mark: integer(),
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
    user: integer().references(() => piscinerTable.id),
    team: integer().references(() => teamTable.id),
  },
  (table) => [primaryKey({ columns: [table.user, table.team] })],
);

export const locationTable = pgTable("locations", {
  id: integer().primaryKey(),
  user: integer().references(() => piscinerTable.id),
  begin_at: timestamp({ withTimezone: true }),
  end_at: timestamp({ withTimezone: true }),
  host: varchar(),
});
