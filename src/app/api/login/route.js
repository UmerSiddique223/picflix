import jwt from "jsonwebtoken";
import { compare } from "bcrypt";

import poolPromise from "@/lib/SQL_Config";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { username, password } = body;
  // Check if username exists
  const pool = await poolPromise;
  const existingUser = await pool
    .request()
    .input("username", username)
    .query("SELECT * FROM Users WHERE username = @username");
  if (existingUser.recordset.length === 0) {
    return NextResponse.json({
      success: false,
      message: "Username or password is incorrect",
    });
  }

  // Verify the password
  const user = existingUser.recordset[0];

  const validPassword = await compare(password, user.password);
  if (!validPassword) {
    return NextResponse.json({
      success: false,
      message: "Username or password is incorrect",
    });
  }
  const userData = {
    username: username,
    email: user.email,
    profile_picture: user.profile_picture,
    bio: user.bio,
    name: user.name,
    created_at: user.created_at,
  };

  // Sign JWT token
  const token = jwt.sign(
    { id: user.id, username: user.username, email: user.email },
    process.env.SIGNUP_KEY,
    { expiresIn: "5d" }
  );
  console.log("token",token)
  const response = NextResponse.json({
    status: 303,
    success: true,
    userData,
  });
  response.cookies.set("token", token, { httpOnly: true });
  return response;
}
