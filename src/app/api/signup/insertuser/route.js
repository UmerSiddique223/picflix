import bcrypt from "bcrypt";
import poolPromise from "@/lib/SQL_Config";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { setUser } from "@/lib/userInfo";

export async function POST(req) {
  const body = await req.json();
  const pool = await poolPromise;
  const { username, name, email, password } = body;
  const hashedPassword = await bcrypt.hash(password, 10);

  // Store the user in the database
  await pool
    .request()
    .input("username", username)
    .input("name", name)
    .input("email", email)
    .input("password", hashedPassword)
    .query(
      "INSERT INTO users (username,name, email, password,created_at,profile_picture) VALUES (@username,@name, @email, @password,GETDATE(),'default photo.png')"
    );

  const token = jwt.sign({ username, email }, process.env.SIGNUP_KEY, {
    expiresIn: "5d",
  });

  const existingUser = await pool
    .request()
    .input("username", username)
    .query("SELECT * FROM Users WHERE username = @username");

  const user = existingUser.recordset[0];

  const userData = {
    user_id: user.user_id,
    username: username,
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
}
