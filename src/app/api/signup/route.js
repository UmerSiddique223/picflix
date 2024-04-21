import bcrypt from "bcrypt";
import poolPromise from "@/lib/SQL_Config";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
export async function POST(req, res) {
  const body = await req.json();
  const { username, email, password } = body;
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

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Store the user in the database
  await pool
    .request()
    .input("username", username)
    .input("email", email)
    .input("password", hashedPassword)
    .query(
      "INSERT INTO users (username, email, password) VALUES (@username, @email, @password)"
    );

  const token = jwt.sign({ username, email }, process.env.SIGNUP_KEY, {
    expiresIn: "5d",
  });
  const userData = {
    username: username,
    email: email,
    profile_picture: null,
    bio: null,
    name: null,
    created_at: null,
  };

  const response = NextResponse.json(
    { success: true, message: "User Registered successfully", userData },
    { status: 200 }
  );
  response.cookies.set("token", token, { httpOnly: true });
  return response;
}
