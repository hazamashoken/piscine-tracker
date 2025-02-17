import { logger } from "../logger.js";
import {
  fetchCursusUser,
  fetchLocationStats,
  fetchPisciner,
  fetchProject,
  fetchTeams,
  fetchUserCorrected,
} from "../api/fetches.js";
import { api } from "../api/intra.js";
import * as R from "remeda";
import { timeStringToSeconds } from "./toSecond.js";
import { pb } from "./pocketbase.js";
export async function processPisciner() {
  const pisciner = await fetchPisciner(api, new Date().getFullYear());

  if (!pisciner) {
    return;
  }

  const batch = pb.createBatch();

  for (const cursusUser of pisciner) {
    const user = cursusUser.user;
    const payload = {
      id: user.id,
      login: user.login,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      usual_full_name: user.usual_full_name,
      url: user.url,
      level: cursusUser.level,
      displayname: user.displayname,
      kind: user.kind,
      is_pisciner: true,
      image_url: user.image.link,
      pool_month: user.pool_month,
      pool_year: user.pool_year,
      created: user.created_at,
      updated: user.updated_at,
    };
    batch.collection("pisciner").upsert(payload);
  }

  try {
    await batch.send();
  } catch (error) {
    logger.error(error);
  }

  return pisciner;
}

export async function processScaleTeam() {
  const users = await pb.collection("pisciner").getFullList({
    filter: "is_pisciner=true",
  });

  for (const user of users) {
    try {
      const correctedScaleTeams = await fetchUserCorrected(api, user.id);

      if (!correctedScaleTeams || correctedScaleTeams.length === 0) {
        return;
      }

      const batch = pb.createBatch();

      if (correctedScaleTeams) {
        for (const scaleTeam of correctedScaleTeams) {
          const payload = {
            id: scaleTeam.id,
            scale_id: scaleTeam.scale.id,
            comment: scaleTeam.comment,
            final_mark: scaleTeam.final_mark,
            feedback: scaleTeam.feedback,
            flag: scaleTeam.flag.name,
            corrector: scaleTeam.corrector.id,
            corrected: scaleTeam.correcteds[0]?.id,
            created: scaleTeam.created_at,
            updated: scaleTeam.updated_at,
          };
          if (!!payload.corrector && !!payload.corrected) {
            batch.collection("scale_team").upsert(payload);
          }
        }
      }
      await batch.send();
    } catch (error) {
      logger.error(error);
    }
  }
}

export async function processTeam() {
  const users = await pb.collection("pisciner").getFullList({
    filter: "is_pisciner=true",
  });
  for (const user of users) {
    try {
      const teams = await fetchTeams(api, user.id);
      if (!teams || teams.length === 0) {
        return;
      }

      const batch = pb.createBatch();
      if (teams) {
        for (const team of teams) {
          const payload = {
            id: team.id,
            name: team.name,
            status: team.status,
            repo_url: team.repo_url,
            project_id: team.project_id,
            final_mark: team.final_mark,
            created: team.created_at,
            updated: team.updated_at,
            project_name: team.project_gitlab_path,
            users: team.users.map((user) => user.id),
          };

          batch.collection("team").upsert(payload);
        }
      }
      await batch.send();
    } catch (error) {
      logger.error(error);
    }
  }
}

export async function processProject() {
  try {
    const projects = await fetchProject(api);
    if (!projects) {
      return;
    }

    const batch = pb.createBatch();
    for (const project of projects) {
      const payload = {
        id: project.id,
        name: project.name,
        slug: project.slug,
        exam: project.exam,
        description: project.description,

        created: project.created_at,
        updated: project.updated_at,
      };

      batch.collection("project").upsert(payload);
    }
    await batch.send();
  } catch (error) {
    logger.error(error);
  }
}

export async function processLocationsStat(begin_at?: string) {
  const users = await pb.collection("pisciner").getFullList({
    filter: "is_pisciner=true",
  });

  for (const user of users) {
    const locationStat = await fetchLocationStats(api, user.id, begin_at);
    if (!locationStat || R.isEmpty(locationStat[0]!)) {
      return;
    }

    const batch = pb.createBatch();
    for (const location of locationStat) {
      for (const date in location) {
        const payload = {
          id: `${user.id}-${date}`,
          user: user.id,
          date: new Date(date).toISOString(),
          duration: timeStringToSeconds(location[date]!),
        };
        batch.collection("location_stat").upsert(payload);
      }
    }

    try {
      await batch.send();
    } catch (error) {
      logger.error(error);
    }
  }
}

export async function processTutor() {
  const tutors = await pb.collection("tutor").getFullList();

  for (const tutor of tutors) {
    const cursusUsers = await fetchCursusUser(api, tutor["login"]);
    if (!cursusUsers || cursusUsers?.length === 0) {
      return;
    }
    const cursusUser = cursusUsers[0]!;
    const user = cursusUser.user;

    try {
      const payload = {
        id: user.id,
        login: user.login,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        usual_full_name: user.usual_full_name,
        url: user.url,
        level: cursusUser.level,
        displayname: user.displayname,
        kind: user.kind,
        is_pisciner: false,
        image_url: user.image.link,
        pool_month: user.pool_month,
        pool_year: user.pool_year,
        created: user.created_at,
        updated: user.updated_at,
      };

      const batch = pb.createBatch();
      batch.collection("pisciner").upsert(payload);
      await batch.send();
    } catch (error) {
      logger.error(error);
    }
  }
}
