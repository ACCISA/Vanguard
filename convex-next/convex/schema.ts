import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    isCompleted: v.boolean(),
    text: v.string(),
  }),
  nmapLogs: defineTable({
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
  }),
});
