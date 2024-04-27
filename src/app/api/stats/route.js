import poolPromise from "@/lib/SQL_Config";
import { NextResponse } from "next/server";


export async function POST(request) {
    const payload = await request.json();
    const { post_id, user_id } = payload;
    try {
        const pool = await poolPromise;
        let result={};
        const comments = await pool.request().input("post_id", post_id).query(
            `SELECT Comments.*, Users.name, Users.profile_picture FROM Comments
            JOIN Users ON Users.user_id=Comments.user_id
            WHERE post_id = @post_id`
        );
        result.comments = comments.recordset;
        const likes = await pool
            .request()
            .input("post_id", post_id)
            .query(`
                SELECT liked_by AS likes
                FROM Likes
                WHERE post_id = @post_id;
            `);
        result.likes = likes.recordset;
        return NextResponse.json(result);
    } catch (err) {
        console.error("Error executing query:", err);
        return NextResponse.error(new Error("Error executing query"));
    }
}
