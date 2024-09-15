import { internalMutation, query } from "./_generated/server";

export const list = query(async (ctx) => {
  return await ctx.db.query("nmapLogs").collect();
});

export const clearAll = internalMutation(async (ctx) => {
  for (const message of await ctx.db.query("nmapLogs").collect()) {
    await ctx.db.delete(message._id);
  }
});
