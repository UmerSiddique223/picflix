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
        const result = await pool.run(
            `INSERT INTO Comments (user_id, post_id, comment_text, created_at) VALUES (?, ?, ?, datetime('now'))`,
            user_id,
            post_id,
            filteredComment
        );

        const commentId = result.lastID;

        const insertedComment = await pool.get(
            `SELECT * FROM Comments WHERE comment_id = ?`,
            commentId
        );

        return NextResponse.json(insertedComment);
    } catch (err) {
        console.error("Error executing query:", err);
        return NextResponse.error(new Error("Error executing query"));
    }
}
