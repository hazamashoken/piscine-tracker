import "dotenv/config.js";
import "./api/intra.js";
import express from "express";
import { cronJobLocationsStat, cronJobPisciner, cronJobScaleTeam, cronJobTeam } from "./cron/process_pisciner.js";
import { logger } from "./logger.js";
import { processLocationsStat, processProject } from './lib/pisciner.js';

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

await processLocationsStat(); // process locations stat first
await processProject();

cronJobPisciner.start();
cronJobScaleTeam.start();
cronJobTeam.start();

cronJobLocationsStat.start(); // Call only current day data

app.listen(PORT, () => {
  logger.info(`Server is running on port http://localhost:${PORT}`);
});
