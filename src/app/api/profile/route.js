import { NextResponse } from "next/server";
import poolPromise from "@/lib/SQL_Config";

export async function PUT(req) {
  const body = await req.json();

  const { name, bio, profile_pic, user_id } = body;
  console.log(profile_pic[0].path);
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("user_id", user_id)
    .input("name", name)
    .input("bio", bio)
    .input("profile_pic", profile_pic[0].path)
    .query(
      `UPDATE Users
     SET name = @name, bio = @bio, profile_picture = @profile_pic
     WHERE user_id = @user_id`
    );

  if (result.rowsAffected[0] === 0) {
    return NextResponse.error(new Error("Failed to update profile"));
  }
  return NextResponse.json({ message: "Profile updated successfully" });
}
