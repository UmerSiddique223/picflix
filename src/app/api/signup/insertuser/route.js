import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { sql } from "@vercel/postgres";

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, name, email, password } = body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store the user in the database
    const result = await sql`
      INSERT INTO Users (username, name, email, password, created_at)
      VALUES (${username}, ${name}, ${email}, ${hashedPassword}, ${new Date()})
      RETURNING *;
    `;

    const user = result.rows[0];

    // Sign JWT token
    const token = jwt.sign({ username, email }, process.env.SIGNUP_KEY, {
      expiresIn: "5d",
    });

    const userData = {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      profile_picture: user.profile_picture,
      bio: user.bio,
      name: user.name,
      created_at: user.created_at,
    };

    const response = NextResponse.json(
      { success: true, message: "User Registered successfully", userData },
      { status: 200 }
    );
    response.cookies.set("token", token, { httpOnly: true });
    response.cookies.set("user", JSON.stringify(userData), {
      httpOnly: true,
      expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    });
    return response;
  } catch (err) {
    console.error("Error executing query:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Error registering user",
      },
      { status: 500 }
    );
  }
}
