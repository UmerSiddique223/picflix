import poolPromise from "@/lib/SQL_Config";
import { NextResponse } from "next/server";
import Filter from "bad-words";
export async function POST(request) {
  const payload = await request.json();
  const { post_id, user_id, comment_text } = payload;
  const filter = new Filter();
  filter.replaceWord = (badWord) => {
    return "***";
  };
  const filteredComment = filter.clean(comment_text);
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("user_id", user_id)
      .input("comment", filteredComment)
      .input("post_id", post_id)
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
