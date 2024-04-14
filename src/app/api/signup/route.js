import { hash } from "bcrypt";
import poolPromise from "@/lib/SQL_Config";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const { username, email, password } = req.body;

  // Check if username or email already exists
  const existingUsername = await poolPromise.query(
    "SELECT * FROM Users WHERE username = $1 ",
    [username]
  );

  if (existingUsername.rows.length > 0) {
    return NextResponse.status(400).json(
      { succes: false },
      {
        error: "Username already exists",
      }
    );
  }
  const existingEmail = await poolPromise.query(
    "SELECT * FROM Users WHERE email = $1 ",
    [username]
  );

  if (existingEmail.rows.length > 0) {
    return NextResponse.status(400).json(
      { succes: false },
      { error: "Email already exists" }
    );
  }

  // Hash the password
  const hashedPassword = await hash(password, 10);

  // Store the user in the database
  await pool.query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
    [username, email, hashedPassword]
  );

  const token = jwt.sign({ username, email }, process.env.SIGNUP_KEY, {
    expiresIn: "48h",
  });

  const response = NextResponse.json(
    { succes: true },
    { message: "User Registered successfully" },
    { status: 200 }
  );
  response.cookies.set("token", token, { httpOnly: true });
  return response;
}
