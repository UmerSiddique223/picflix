import poolPromise from "@/lib/SQL_Config";
import { NextResponse } from "next/server";

export async function POST(request) {
    const payload = await request.json();
    const { post_id, user_id } = payload;
    try {
        const db = await poolPromise;
        let result = {};
        const comments = await db.all(
            `SELECT Comments.*, Users.name, Users.profile_picture FROM Comments
            JOIN Users ON Users.user_id=Comments.user_id
            WHERE post_id = ?`,
            post_id
        );
        result.comments = comments;
        const likes = await db.all(
            `SELECT user_id AS likes
            FROM Likes
            WHERE post_id = ?`,
            post_id
        );
        result.likes = likes;
        return NextResponse.json(result);
    } catch (err) {
        console.error("Error executing query:", err);
        return NextResponse.error(new Error("Error executing query"));
    }
}