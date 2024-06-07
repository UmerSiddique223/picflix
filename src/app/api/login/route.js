import jwt from "jsonwebtoken";
import { compare } from "bcrypt";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { username, password } = body;

  try {
    // Check if username exists
    const { rows: existingUser } = await sql`
      SELECT * FROM Users WHERE username = ${username}
    `;
    if (existingUser.length === 0) {
      return NextResponse.json({
        success: false,
        message: "Username or password is incorrect",
      });
    }

    // Verify the password
    const user = existingUser[0];
    const validPassword = await compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({
        success: false,
        message: "Username or password is incorrect",
      });
    }

    // Sign JWT token
    const token = jwt.sign(
      { id: user.user_id, username: user.username, email: user.email },
      process.env.SIGNUP_KEY,
      { expiresIn: "5d" }
    );

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
      {
        success: true,
        message: "User authenticated successfully",
        userData,
      },
      { status: 200 }
    );
    response.cookies.set("token", token, { httpOnly: true });
    response.cookies.set("user", JSON.stringify(userData), {
      httpOnly: true,
      expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days
    });

    return response;
  } catch (err) {
    console.error("Error executing query:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Error during authentication",
      },
      { status: 500 }
    );
  }
}
