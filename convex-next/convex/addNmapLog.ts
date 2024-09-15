import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Add a new entry to the 'nmapLogs' database
export const addNmapLogEntry = mutation({
  args: {
    host: v.string(),
    hostname: v.string(),
    hostname_type: v.string(),
    protocol: v.string(),
    port: v.string(),
    name: v.string(),
    state: v.string(),
    product: v.string(),
    extrainfo: v.string(),
    reason: v.string(),
    version: v.string(),
    conf: v.string(),
    cpe: v.string(),
  },
  handler: async (ctx, args) => {
    // Insert the new log entry into the 'nmapLogs' collection
    const newLogEntryId = await ctx.db.insert("nmapLogs", {
      host: args.host,
      hostname: args.hostname,
      hostname_type: args.hostname_type,
      protocol: args.protocol,
      port: args.port,
      name: args.name,
      state: args.state,
      product: args.product,
      extrainfo: args.extrainfo ?? null, // Handle optional field
      reason: args.reason,
      version: args.version,
      conf: args.conf,
      cpe: args.cpe,
    });

    // Return the ID of the newly created entry
    return newLogEntryId;
  },
});
