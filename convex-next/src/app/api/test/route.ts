import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        message: "File data retrieved successfully",
        success: true,
        data: [],
    });
}