import jwt from "jsonwebtoken";
import { compare } from "bcrypt";
import poolPromise from "@/lib/SQL_Config";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const body = await req.json();
  console.log(body);
  const { username, password } = body;
  // Check if username exists
  const pool = await poolPromise;
  const existingUser = await pool
    .request()
    .query("SELECT * FROM Users WHERE username = $1", [username]);

  if (existingUser.rowsAffected === 0) {
    return NextResponse.json({
      success: false,
      error: "Username or password is incorrect",
    });
  }

  // Verify the password
  const user = existingUser.recordset[0];
  const validPassword = await compare(password, user.password);

  if (!validPassword) {
    return NextResponse.json({
      success: false,
      error: "Username or password is incorrect",
      status: 401,
    });
  }

  // Sign JWT token
  const token = jwt.sign(
    { id: user.id, username: user.username, email: user.email },
    process.env.SECRET_KEY,
    { expiresIn: "5d" }
  );

  const response = NextResponse.redirect("/", { status: 303, success: true });
  response.cookies.set("token", token, { httpOnly: true });
  return response;
}
