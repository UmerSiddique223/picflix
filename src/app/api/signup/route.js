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
  const existingUsername = await pool.query(
    "SELECT * FROM Users WHERE username = $1",
    [username]
  );
  console.log("user", existingUsername);
  if (existingUsername.rowsAffected > 0) {
    return NextResponse.json({
      succes: false,
      message: "Username already exists",
    });
  }
  const existingEmail = await pool.query(
    "SELECT * FROM Users WHERE email = $1 ",
    [email]
  );
  if (existingEmail.rowsAffected > 0) {
    return NextResponse.json({
      succes: false,
      message: "Email already exists",
    });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Store the user in the database
  console.log(username, email, hashedPassword);
  await pool.query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
    [username, email, hashedPassword]
  );

  const token = jwt.sign({ username, email }, process.env.SIGNUP_KEY, {
    expiresIn: "5d",
  });

  const response = NextResponse.json(
    { succes: true },
    { message: "User Registered successfully" },
    { status: 200 }
  );
  response.cookies.set("token", token, { httpOnly: true });
  return response;
}
