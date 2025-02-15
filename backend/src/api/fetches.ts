import { OneTeam, ScaleTeam, Team, User42 } from "./interfaces.js";
import { logger } from "../logger.js";
import Fast42 from '@codam/fast42';

const fetchAll42 = async function (
  //@ts-ignore
  api: Fast42,
  path: string,
  params: { [key: string]: string } = {}
): Promise<any[]> {
  return new Promise(async (resolve, reject) => {
    try {
      const pages = await api.getAllPages(path, params);
      logger.debug(
        `Retrieving API items: ${pages.length} pages for path ${path}`
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
            throw new Error(`Intra API error: ${p.status} ${p.statusText}`);
          }
        })
      );
      return resolve(pageItems.flat());
    } catch (err) {
      logger.error(err);
      return reject(err);
    }
  });
};

//@ts-ignore
export async function fetchTeam(api: Fast42, teamId: string): Team[] | null {
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

//@ts-ignore
export async function fetchPisciner(api: Fast42, poolYear: number):User42[] | null {
  try {

    const users = await fetchAll42(api, "/users", {
      "campus_id": `${process.env["CAMPUS_ID"]}`,
      "cursus_id": `9`, // piscine c id
      "filter[kind]": "student",
      "filter[pool_year]": poolYear.toString(),
    })

    return users;

  } catch (error) {
    logger.error(error);
  }

}

//@ts-ignore
export async function fetchUserCorrector(api: Fast42, login: string): ScaleTeam[] | null {
  try {
    const scaleTeams = await fetchAll42(api, `/users/${login}/scale_teams/as_corrector`, {
      "page[size]": "100"
    })

    return scaleTeams;
  } catch (error){
    logger.error(error);
  }
}

//@ts-ignore
export async function fetchUserCorrected(api: Fast42, login: string): ScaleTeam[] | null {
  try {
    const scaleTeams = await fetchAll42(api, `/users/${login}/scale_teams/as_corrected`, {
      "page[size]": "100"
    })

    return scaleTeams;
  } catch (error){
    logger.error(error);
  }
}

//@ts-ignore
export async function fetchTeams(api: Fast42, login: string): OneTeam[] | null {

  try {
    const teams = await fetchAll42(api, `/users/${login}/teams`, {
      "page[size]": "100"
    })

    return teams;
  } catch (error) {
    logger.error(error);
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
  }
}

//@ts-ignore
export async function fetchLocationStats(api: Fast42, login: string, begin_at?: string): Record<string, string>[] | null {
  try {
    const options = !!begin_at ? { "begin_at": begin_at } : undefined;
    const locations = await fetchAll42(api, `/users/${login}/locations_stats`, options);

    return locations;
  } catch (error) {
    logger.error(error);
  }
}