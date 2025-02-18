import { migratePsql } from "../lib/migration-psql.js";
import {
  processLocationsStat,
  processPisciner,
  processProject,
  processScaleTeam,
  processTeam,
} from "../lib/pisciner.js";
import { CronJob } from "cron";

export const cronJobPisciner = CronJob.from({
  cronTime: "0 0 * * *", // everyday at 00:00
  onTick: async function () {
    await processPisciner();
  },
  timeZone: "Asia/Singapore",
});

export const cronJobScaleTeam = CronJob.from({
  cronTime: "*/5 * * * *", // every 5 minutes
  onTick: async function () {
    await processScaleTeam();
  },
  timeZone: "Asia/Singapore",
});

export const cronJobTeam = CronJob.from({
  cronTime: "*/5 * * * *", // every 5 minutes
  onTick: async function () {
    await processTeam();
  },
  timeZone: "Asia/Singapore",
});

export const cronJobProject = CronJob.from({
  cronTime: "0 0 * * *",
  onTick: async function () {
    await processProject();
  },
  timeZone: "Asia/Singapore",
});

export const cronJobLocationsStat = CronJob.from({
  cronTime: "0 * * * *",
  onTick: async function () {
    await processLocationsStat(new Date().toISOString());
  },
  timeZone: "Asia/Singapore",
});

export const cronJobMigratePsql = CronJob.from({
  cronTime: "*/10 * * * *",
  onTick: async function () {
    await migratePsql();
  },
  timeZone: "Asia/Singapore",
});
