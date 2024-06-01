import poolPromise from "@/lib/SQL_Config";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { user_id, curr_user_id } = body;

  try {
    const db = await poolPromise;
    const result = await db.all(
      "SELECT * FROM Friends WHERE user_id = ?",
      curr_user_id
    );
    const Links = result;

    const result1 = await db.all(
      "SELECT * FROM Users WHERE user_id = ?",
      user_id
    );
    const User = result1[0];

    // Respond with success message
    return NextResponse.json({
      success: true,
      message: "Links and user got successfully",
      Links,
      User,
    });
  } catch (error) {
    console.error("Error getting links and user:", error);
    return NextResponse.json({ error: "Failed to get Links and user" });
  }
}