import {
  locationStatTable,
  piscinerTable,
  projectTable,
  scaleTeamTable,
  teamMemberTable,
  teamTable,
} from "../schema/pisciner.js";
import { db } from "./drizzle.js";
import { pb } from "./pocketbase.js";
import {
  PbLocationStat,
  PbPisciner,
  PbProject,
  PbScaleTeam,
  PbTeam,
} from "./type.js";

export async function migratePsql() {
  await migratePisciner();
  await migrateProject();
  await migrateScaleTeam();
  await migrateLocationStat();
  await migrateTeam();
}

export async function migratePisciner() {
  const pisciners = await pb.collection("pisciner").getFullList<PbPisciner>();
  const piscinerPayload = pisciners.map((pisciner) => ({
    ...pisciner,
    id: parseInt(pisciner.id),
    level: pisciner.level.toString(),
    created: new Date(pisciner.created),
    updated: new Date(pisciner.updated),
  }));
  for (const pisciner of piscinerPayload) {
    await db
      .insert(piscinerTable)
      .values(pisciner)
      .onConflictDoUpdate({
        target: piscinerTable.id,
        set: {
          login: pisciner.login,
          email: pisciner.email,
          first_name: pisciner.first_name,
          last_name: pisciner.last_name,
          usual_full_name: pisciner.usual_full_name,
          level: pisciner.level,
          url: pisciner.url,
          displayname: pisciner.displayname,
          kind: pisciner.kind,
          pool_month: pisciner.pool_month,
          pool_year: pisciner.pool_year,
          image_url: pisciner.image_url,
          is_pisciner: pisciner.is_pisciner,
          created: pisciner.created,
          updated: pisciner.updated,
        },
      });
  }
}

export async function migrateProject() {
  const projects = await pb.collection("project").getFullList<PbProject>();
  const piscinePayload = projects.map((project) => ({
    ...project,
    id: parseInt(project.id),
    created: new Date(project.created),
    updated: new Date(project.updated),
  }));
  for (const project of piscinePayload) {
    await db
      .insert(projectTable)
      .values(project)
      .onConflictDoUpdate({
        target: piscinerTable.id,
        set: {
          name: project.name,
          slug: project.slug,
          exam: project.exam,
          created: project.created,
          updated: project.updated,
        },
      });
  }
}

export async function migrateScaleTeam() {
  const scaleTeams = await pb
    .collection("scale_team")
    .getFullList<PbScaleTeam>();
  const scaleTeamPayload = scaleTeams.map((scaleTeam) => ({
    ...scaleTeam,
    id: parseInt(scaleTeam.id),
    scale_id: parseInt(scaleTeam.scale_id),
    corrector: parseInt(scaleTeam.corrector),
    corrected: parseInt(scaleTeam.corrected),
    final_mark: scaleTeam.final_mark,
    created: new Date(scaleTeam.created),
    updated: new Date(scaleTeam.updated),
  }));

  for (const scaleTeam of scaleTeamPayload) {
    await db
      .insert(scaleTeamTable)
      .values(scaleTeam)
      .onConflictDoUpdate({
        target: scaleTeamTable.id,
        set: {
          scale_id: scaleTeam.scale_id,
          corrector: scaleTeam.corrector,
          corrected: scaleTeam.corrected,
          final_mark: scaleTeam.final_mark,
          comment: scaleTeam.comment,
          feedback: scaleTeam.feedback,
          flag: scaleTeam.flag,
          created: scaleTeam.created,
          updated: scaleTeam.updated,
        },
      });
  }
}

export async function migrateTeam() {
  const teams = await pb.collection("team").getFullList<PbTeam>();
  const teamPayload = teams.map((team) => ({
    ...team,
    id: parseInt(team.id),
    users: team.users.map((user) => parseInt(user)),
    project_id: parseInt(team.project_id),
    created: new Date(team.created),
    updated: new Date(team.updated),
  }));

  for (const team of teamPayload) {
    await db
      .insert(teamTable)
      .values(team)
      .onConflictDoUpdate({
        target: scaleTeamTable.id,
        set: {
          name: team.name,
          status: team.status,
          final_mark: team.final_mark,
          repo_url: team.repo_url,
          project_name: team.project_name,
          project_id: team.project_id,
          created: team.created,
          updated: team.updated,
        },
      });
  }
  const teamMembers = teams.flatMap((team) => {
    return team.users.map((user) => ({
      user: parseInt(user),
      team: parseInt(team.id),
    }));
  });
  await db.insert(teamMemberTable).values(teamMembers);
}

export async function migrateLocationStat() {
  const locationStats = await pb
    .collection("location_stat")
    .getFullList<PbLocationStat>();
  const locationStatPayload = locationStats.map((locationStat) => ({
    ...locationStat,
    user: parseInt(locationStat.user),
    duration: locationStat.duration.toString(),
    date: new Date(locationStat.date),
    created: new Date(locationStat.created),
    updated: new Date(locationStat.updated),
  }));
  for (const locationStat of locationStatPayload) {
    await db
      .insert(locationStatTable)
      .values(locationStat)
      .onConflictDoUpdate({
        target: locationStatTable.id,
        set: {
          user: locationStat.user,
          date: locationStat.date,
          duration: locationStat.duration,
          created: locationStat.created,
          updated: locationStat.updated,
        },
      });
  }
}
