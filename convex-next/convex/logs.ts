import { mutation } from "./_generated/server";
import fs from "fs/promises"; // Use fs/promises to work with file system promises

// Function to read and parse the log file
async function readLogFile(filePath: string): Promise<any[]> {
  const data = await fs.readFile(filePath, "utf-8");
  const lines = data.split("\n");
  const logEntries = lines
    .filter((line) => line.trim() !== "")
    .map((line) => {
      const [
        host,
        hostname,
        hostname_type,
        protocol,
        port,
        name,
        state,
        product,
        extrainfo,
        reason,
        version,
        conf,
        cpe,
      ] = line.split(";");
      return {
        host,
        hostname,
        hostname_type,
        protocol,
        port,
        name,
        state,
        product,
        extrainfo,
        reason,
        version,
        conf,
        cpe,
      };
    });
  return logEntries;
}

export const checkAndUpdateLogs = mutation({
  handler: async (ctx) => {
    // Read the current entries from the database
    const existingEntries = await ctx.db.query("nmapLogs").collect();

    // Extract existing entries' unique identifiers (for comparison)
    const existingEntriesSet = new Set(
      existingEntries.map((entry) => entry.host + entry.port + entry.protocol)
    ); // Use a unique identifier combination

    const filePath = "/path/to/your/logs/your-log-file.log";

    // Read and parse the log file
    let logEntries;
    try {
      logEntries = await readLogFile(filePath);
    } catch (error) {
      console.error("Error reading log file:", error);
      return;
    }

    // Prepare new entries for insertion
    const newEntries = logEntries.filter(
      (entry) =>
        !existingEntriesSet.has(entry.host + entry.port + entry.protocol)
    );

    // Insert new entries into nmapLogs table
    for (const entry of newEntries) {
      const newEntry = {
        host: entry.host,
        hostname: entry.hostname,
        hostname_type: entry.hostname_type,
        protocol: entry.protocol,
        port: Number(entry.port),
        name: entry.name,
        state: entry.state,
        product: entry.product,
        extrainfo: entry.extrainfo || null,
        reason: entry.reason,
        version: entry.version,
        conf: entry.conf,
        cpe: entry.cpe,
      };

      await ctx.db.insert("nmapLogs", newEntry);
    }
  },
});
