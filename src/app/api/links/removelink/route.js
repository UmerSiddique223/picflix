import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { user_id, friend_id } = body;

  try {
    // Delete the friendship links
    await sql`
      DELETE FROM Friends
      WHERE (user_id = ${user_id} OR user_id = ${friend_id})
        AND (friend_id = ${friend_id} OR friend_id = ${user_id})
    `;

    // Respond with success message
    return NextResponse.json({
      success: true,
      message: "Link deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting link:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to delete link",
    });
  }
}
