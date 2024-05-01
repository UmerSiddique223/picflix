import poolPromise from "@/lib/SQL_Config";
import { NextResponse } from "next/server";

export async function POST(request) {
    const payload = await request.json();
    const { post_id, user_id } = payload;
    try {
        const pool = await poolPromise;
        let result = {};
        const comments = await pool
            .request()
            .input("post_id", post_id)
            .query(
                `SELECT Comments.*, Users.name, Users.profile_picture FROM Comments
            JOIN Users ON Users.user_id=Comments.user_id
            WHERE post_id = @post_id`
            );
        result.comments = comments.recordset;
        const likes = await pool.request().input("post_id", post_id).query(`
                SELECT user_id AS likes
                FROM Likes
                WHERE post_id = @post_id;
            `);
        result.likes = likes.recordset;
        const saved = await pool
            .request()
            .input("post_id", post_id)
            .input("user_id", user_id).query(`
            SELECT *
            FROM SavedPosts
            WHERE post_id = @post_id AND user_id = @user_id;
            `);
        result.isSaved = saved.recordset.length > 0;
        return NextResponse.json(result);
    } catch (err) {
        console.error("Error executing query:", err);
        return NextResponse.error(new Error("Error executing query"));
    }
}
