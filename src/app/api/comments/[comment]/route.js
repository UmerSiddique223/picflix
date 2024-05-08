import poolPromise from "@/lib/SQL_Config";
import { NextResponse } from "next/server";

export async function GET(request, content) {
  const post = content.params.comment;
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(
      `SELECT Comments.*, Users.name, Users.profile_picture FROM Comments
            JOIN Users ON Users.user_id=Comments.user_id
            WHERE post_id = ${post}`
    );
    return NextResponse.json(result.recordset);
  } catch (err) {
    console.error("Error executing query:", err);
    return NextResponse.error(new Error("Error executing query"));
  }
}

export async function POST(request, content) {
  const post = content.params.comment;
  const payload = await request.json();
  const { user_id, comment_text } = payload;
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("user_id", user_id)
      .input("comment", comment_text)
      .input("post_id", post)
      .query(
        `INSERT INTO Comments (user_id, post_id, comment_text, created_at)
                OUTPUT INSERTED.*
                VALUES (@user_id, @post_id, @comment, GETDATE());`
      );
    return NextResponse.json(result.recordset[0]);
  } catch (err) {
    console.error("Error executing query:", err);
    return NextResponse.error(new Error("Error executing query"));
  }
}
