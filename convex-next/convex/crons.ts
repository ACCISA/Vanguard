import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval(
  "check log file changes",
  { minutes: 1 }, // Runs every 5 minutes
  internal.logs.clearAll
);

export default crons;
