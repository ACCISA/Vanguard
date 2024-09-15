/* eslint-disable react-hooks/rules-of-hooks */
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { api } from "../../../../convex/_generated/api";

console.log("api", api);
export async function GET() {
  
  console.log("Endpoint Hit!");
  
  try {
    const filePath = path.resolve(process.cwd(), "scan_results.log");
  
    // console.log("file path",filePath)
  
    // Read the file content
    const logFileData = fs.readFileSync(filePath, "utf-8");
    
    console.log("log file data",logFileData)
    const convertedLogToJson = logToJson(logFileData);
    
  //   // Return the file content as JSON
    return NextResponse.json({
      message: "File data retrieved successfully",
      success: true,
      data: convertedLogToJson,
    });
  } catch (error) {
    // Handle any errors that occur during file reading
    return NextResponse.json({
      message: "Failed to read file",
      success: false,
    });
  }
}

function logToJson(log) {
  // Split log data into lines
  const lines = log.split("\n");

  // Extract the headers (first row)
  const headers = lines[0].split(";");

  // Map the remaining rows to objects using the headers
  const jsonData = lines.slice(1).map((line) => {
    const fields = line.split(";");

    // Create a JSON object for each row
    const entry = {};
    headers.forEach((header, index) => {
      entry[header] = fields[index].replace(/"/g, ""); // Removing quotes if any
    });

    return entry;
  });

  return jsonData;
}
