import {
  CursusUser,
  FTLocation,
  OneTeam,
  ScaleTeam,
  Team,
} from "./interfaces.js";
import { logger } from "../logger.js";
import { pb } from "../lib/pocketbase.js";

const fetchAll42 = async function (
  //@ts-ignore
  api: Fast42,
  path: string,
  params: { [key: string]: string } = {},
): Promise<any[]> {
  return new Promise(async (resolve, reject) => {
    try {
      const pages = await api.getAllPages(path, params);
      logger.debug(
        `Retrieving API items: ${pages.length} pages for path ${path}`,
      );

      // Fetch all pages
      let i = 0;
      const pageItems = await Promise.all(
        //@ts-ignore
        pages.map(async (page) => {
          logger.debug(`Fetching page ${++i}/${pages.length}`);
          const p = await page;
          if (p.status == 429) {
            throw new Error("Intra API rate limit exceeded");
          }
          if (p.ok) {
            const data = await p.json();
            return data;
          } else {
            logger.error(await p.json());
            throw new Error(`Intra API error: ${p.status} ${p.statusText}`);
          }
        }),
      );
      return resolve(pageItems.flat());
    } catch (err) {
      logger.error(err);
      return reject(err);
    }
  });
};

export async function fetchTeam(
  //@ts-ignore
  api: Fast42,
  teamId: string,
): Promise<Team[] | null> {
  try {
    const team = await fetchAll42(api, `/teams/${teamId}`);
    if (!team) {
      logger.debug(`Team ${teamId} not found`);
    }
    return team;
  } catch (error) {
    logger.error(error);
    return null;
  }
}

export async function fetchCursusUser(
  //@ts-ignore
  api: Fast42,
  login: string,
): Promise<CursusUser[] | null> {
  try {
    const cursusUser: CursusUser[] = await fetchAll42(
      api,
      `/users/${login}/cursus_users`,
    );

    return cursusUser;
  } catch (error) {
    logger.error(error);
    return null;
  }
}

export async function fetchPisciner(
  //@ts-ignore
  api: Fast42,
): Promise<CursusUser[] | null> {
  try {
    const config = await pb
      .collection("config")
      .getFirstListItem('version="main"');
    const users: CursusUser[] = await fetchAll42(api, "/cursus_users", {
      "filter[campus_id]": config["campus_id"] ?? "64",
      "filter[cursus_id]": `9`, // piscine c id
      // "filter[kind]": "student",
      // "filter[pool_year]": poolYear.toString(),
      "range[begin_at]":
        config["begin_at"] ??
        "2025-02-10T00:00:00.000Z,2025-02-11T00:00:00.000Z",
    });

    return users;
  } catch (error) {
    logger.error(error);
    return null;
  }
}

export async function fetchUserCorrector(
  //@ts-ignore
  api: Fast42,
  login: string,
): Promise<ScaleTeam[] | null> {
  try {
    const scaleTeams = await fetchAll42(
      api,
      `/users/${login}/scale_teams/as_corrector`,
    );

    return scaleTeams;
  } catch (error) {
    logger.error(error);
    return null;
  }
}

export async function fetchUserCorrected(
  //@ts-ignore
  api: Fast42,
  login: string,
): Promise<ScaleTeam[] | null> {
  try {
    const scaleTeams = await fetchAll42(
      api,
      `/users/${login}/scale_teams/as_corrected`,
    );

    return scaleTeams;
  } catch (error) {
    logger.error(error);
    return null;
  }
}

export async function fetchScaleTeamId(
  //@ts-ignore
  api: Fast42,
  scaleTeamId: string,
): Promise<ScaleTeam | null> {
  try {
    const scaleTeams = await fetchAll42(api, `/scale_teams/${scaleTeamId}`);

    return scaleTeams[0];
  } catch (error) {
    logger.error(error);
    return null;
  }
}

export async function fetchTeams(
  //@ts-ignore
  api: Fast42,
  login: string,
): Promise<OneTeam[] | null> {
  try {
    const teams = await fetchAll42(api, `/users/${login}/teams`, {
      "page[size]": "100",
    });

    return teams;
  } catch (error) {
    logger.error(error);
    return null;
  }
}

//@ts-ignore
export async function fetchProject(api: Fast42): any | null {
  try {
    const PISCINE_ID = 9;
    const project = await fetchAll42(api, `/cursus/${PISCINE_ID}/projects`);

    return project;
  } catch (error) {
    logger.error(error);
    return null;
  }
}

export async function fetchLocationStats(
  //@ts-ignore
  api: Fast42,
  login: string,
  begin_at?: string,
): Promise<Record<string, string>[] | null> {
  try {
    const options = !!begin_at ? { begin_at: begin_at } : undefined;
    const locations = await fetchAll42(
      api,
      `/users/${login}/locations_stats`,
      options,
    );

    return locations;
  } catch (error) {
    logger.error(error);
    return null;
  }
}

export async function fetchLocation(
  //@ts-ignore
  api: Fast42,
  userIds: string,
  cron: boolean,
) {
  try {
    const config = await pb
      .collection("config")
      .getFirstListItem('version="main"');
    const options = cron
      ? {
          "range[begin_at]":
            new Date(new Date().setDate(new Date().getDate() - 1))
              .toISOString()
              .split("T")[0] +
            "T00:00:00.000Z," +
            new Date(new Date().setDate(new Date().getDate() + 1))
              .toISOString()
              .split("T")[0] +
            "T00:00:00.000Z",
          "filter[user_id]": userIds,
        }
      : { "filter[user_id]": userIds };
    const locations: FTLocation[] = await fetchAll42(
      api,
      `/campus/${config["campus_id"]}/locations`,
      // @ts-ignore
      options,
    );

    return locations;
  } catch (error) {
    logger.error(error);
    return null;
  }
}
