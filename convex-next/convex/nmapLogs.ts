import { query } from "./_generated/server";

export const getAllNmapLogs = query({
  handler: async (ctx) => {
    // Fetch all entries from the 'nmapLogs' collection
    const nmapLogs = await ctx.db.query("nmapLogs").collect();
    return nmapLogs;
  },
});
