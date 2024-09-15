import { cronJobs } from "convex/server";
import { api } from "./_generated/api";

const crons = cronJobs();

crons.interval(
  "check log file changes",
  { minutes: 1 }, // Runs every 5 minutes
  api.logs.checkAndUpdateLogs
);

export default crons;
