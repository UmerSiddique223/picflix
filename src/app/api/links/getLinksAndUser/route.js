import poolPromise from "@/lib/SQL_Config";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { user_id, curr_user_id } = body;

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("user_id", curr_user_id)
      .query("Select * from friends where user_id=@user_id");
    const Links = result.recordset;

    const result1 = await pool
      .request()
      .input("user_id", user_id)
      .query("Select * from Users where user_id=@user_id");

    const User = result1.recordset[0];

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
