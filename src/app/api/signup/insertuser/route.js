import bcrypt from "bcrypt";
import poolPromise from "@/lib/SQL_Config";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req, res) {
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
      "INSERT INTO users (username,name, email, password,created_at) VALUES (@username,@name, @email, @password,CAST(GETDATE() AS DATE))"
    );
  const userData = {
    username: username,
    email: email,
    profile_picture: null,
    bio: null,
    name: null,
    created_at: getCurrentDate(),
  };
  const token = jwt.sign({ username, email }, process.env.SIGNUP_KEY, {
    expiresIn: "5d",
  });
  const response = NextResponse.json(
    { success: true, message: "User Registered successfully", userData },
    { status: 200 }
  );
  response.cookies.set("token", token, { httpOnly: true });
  return response;
}
function getCurrentDate() {
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  return `${year}/${month}/${day}`;
}
