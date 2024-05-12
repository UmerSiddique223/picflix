import poolPromise from "@/lib/SQL_Config";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { user_id, friend_id } = body;

  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("user_id", user_id)
      .input("friend_id", friend_id)
      .query(
        "INSERT INTO friends (user_id,friend_id) VALUES (@user_id,@friend_id),(@friend_id,@user_id)"
      );
    // Respond with success message
    return NextResponse.json({
      success: true,
      message: "Link added successfully",
    });
  } catch (error) {
    console.error("Error adding Link:", error);
    return NextResponse.json({ success: false, error: "Failed to add links" });
  }
}
