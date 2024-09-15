/* eslint-disable react-hooks/rules-of-hooks */
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { api } from "../../../../convex/_generated/api";
import { fetchMutation, fetchQuery } from "convex/nextjs";

export async function POST(request: Request) {
  console.log("Endpoint Hit!");

  const filePath = path.resolve(process.cwd(), "scan_results.log");

  // Read the file content
  const logFileData = fs.readFileSync(filePath, "utf-8");

  const convertedLogToJson = logToJson(logFileData);

  const convexData = await fetchQuery(api.nmapLogs.getAllNmapLogs);

  const convexLength = convexData.length;
  const fileLength = convertedLogToJson.length;

  if (convexLength === fileLength) {
    return NextResponse.json({
      message: "No new entries found",
      success: true,
      data: convertedLogToJson,
    });
  }

  if (fileLength > convexLength) {
    console.log("new entries found");
    // add the new entries to the database
    for (let i = convexLength; i < fileLength; i++) {
      const entry = convertedLogToJson[i];
      console.log("adding entry", entry);
      await fetchMutation(api.addNmapLog.addNmapLogEntry, entry);
    }
  }
  // Return the file content as JSON
  return NextResponse.json({
    message: "File data retrieved successfully",
    success: true,
    data: convertedLogToJson,
  });
}

function logToJson(log: any) {
  // Split log data into lines
  const lines = log.split("\n");

  // Extract the headers (first row)
  const headers = lines[0].split(";");

  // Map the remaining rows to objects using the headers
  const jsonData = lines
    .slice(1)
    .map((line: any) => {
      // Trim the line to remove any leading/trailing whitespace
      const trimmedLine = line.trim();

      // If the line is empty, skip processing
      if (trimmedLine === "") {
        return null;
      }

      const fields = trimmedLine.split(";");

      // Create a JSON object for each row
      const entry = {};
      headers.forEach((header: any, index: any) => {
        entry[header] = fields[index]?.replace(/"/g, "") || ""; // Removing quotes and handling missing fields
      });

      return entry;
    })
    .filter((entry: any) => entry !== null); // Filter out any null entries

  return jsonData;
}
