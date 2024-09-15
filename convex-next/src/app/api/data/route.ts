import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  // Define the path to your .log file
  const filePath = path.resolve(process.cwd(), "scan_results.log");

  try {
    // Read the file content
    const data = fs.readFileSync(filePath, "utf-8");

    // Return the file content as JSON
    return NextResponse.json({
      message: "File data retrieved successfully",
      success: true,
      data: data,
    });
  } catch (error) {
    // Handle any errors that occur during file reading
    return NextResponse.json({
      message: "Failed to read file",
      success: false,
    });
  }
}
