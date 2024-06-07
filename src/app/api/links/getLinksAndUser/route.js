import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { user_id, curr_user_id } = body;

  try {
    // Fetch friends of the current user
    const { rows: linksResult } = await sql`
      SELECT * 
      FROM Friends 
      WHERE user_id = ${curr_user_id}
    `;
    const Links = linksResult;

    // Fetch user details
    const { rows: userResult } = await sql`
      SELECT * 
      FROM Users 
      WHERE user_id = ${user_id}
    `;
    const User = userResult[0];

    // Respond with success message
    return NextResponse.json({
      success: true,
      message: "Links and user fetched successfully",
      Links,
      User,
    });
  } catch (error) {
    console.error("Error getting links and user:", error);
    return NextResponse.json({ error: "Failed to get Links and user" });
  }
}
