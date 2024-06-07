import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { username, email } = body;

  try {
    // Check if username already exists
    const { rows: existingUsername } = await sql`
      SELECT * FROM Users WHERE username = ${username}
    `;

    if (existingUsername.length > 0) {
      return NextResponse.json({
        success: false,
        message: "Username already exists",
        status: 400,
      });
    }

    // Check if email already exists
    const { rows: existingEmail } = await sql`
      SELECT * FROM Users WHERE email = ${email}
    `;

    if (existingEmail.length > 0) {
      return NextResponse.json({
        success: false,
        message: "Email already exists",
        status: 400,
      });
    }

    return NextResponse.json({
      success: true,
      message: "User is unique",
    });
  } catch (err) {
    console.error("Error executing query:", err);
    return NextResponse.json({
      success: false,
      message: "An error occurred while checking user uniqueness",
      status: 500,
    });
  }
}
