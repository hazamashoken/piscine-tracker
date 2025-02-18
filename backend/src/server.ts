import "dotenv/config.js";
import "./api/intra.js";
import express from "express";
import {
  cronJobLocation,
  cronJobLocationsStat,
  cronJobMigratePsql,
  cronJobPisciner,
  cronJobScaleTeam,
  cronJobTeam,
} from "./cron/process_pisciner.js";
import { logger } from "./logger.js";
import {
  processLocation,
  processLocationsStat,
  processPisciner,
  processProject,
  processScaleTeam,
  processTeam,
  processTutor,
} from "./lib/pisciner.js";
import "./lib/pocketbase.js";
import "./lib/drizzle.js";
import { migratePsql } from "./lib/migration-psql.js";

const { PORT } = process.env;

const app = express();

app.get("/", (_req, res) => {
  res.json({
    message: "",
  });
});

app.get("/healthcheck", (_req, res) => {
  res.json({
    message: "Server is running",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

await processTutor();
await processPisciner();
await processLocationsStat(); // process locations stat first
await processProject();
await processScaleTeam();
await processTeam();
await processLocation();
await migratePsql();

cronJobPisciner.start();
cronJobScaleTeam.start();
cronJobTeam.start();
cronJobLocationsStat.start(); // Call only current day data
cronJobLocation.start();
cronJobMigratePsql.start();

app.listen(PORT, () => {
  logger.info(`Server is running on port http://localhost:${PORT}`);
});
