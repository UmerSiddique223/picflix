import poolPromise from "@/lib/SQL_Config";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { username, email } = body;
  // Check if username or email already exists
  const pool = await poolPromise;

  const existingUsername = await pool
    .request()
    .input("username", username)
    .query("SELECT * FROM Users WHERE username = @username");

  if (existingUsername.recordset.length > 0) {
    return NextResponse.json({
      success: false,
      message: "Username already exists",
      status: 400,
    });
  }

  const existingEmail = await pool
    .request()
    .input("email", email)
    .query("SELECT * FROM Users WHERE email = @email");
  if (existingEmail.recordset.length > 0) {
    return NextResponse.json({
      success: false,
      message: "Email already exists",
    });
  }
  const response = NextResponse.json(
    { success: true, message: "Email and username does not exist in database" },
    { status: 200 }
  );
  return response;
}
