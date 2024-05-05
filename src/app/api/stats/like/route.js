import poolPromise from "@/lib/SQL_Config";
import { NextResponse } from "next/server";

export async function POST(request) {
    const payload = await request.json();
    const { post_id, user_id, isliked } = payload;
    try {
        const pool = await poolPromise;
        if (isliked) {
            await pool
                .request()
                .input("post_id", post_id)
                .input("user_id", user_id).query(`
                    INSERT INTO Likes (post_id, user_id)
                    VALUES (@post_id, @user_id);
                `);
        } else {
            await pool
                .request()
                .input("post_id", post_id)
                .input("user_id", user_id).query(`
                    DELETE FROM Likes
                    WHERE post_id = @post_id AND user_id = @user_id;
                `);
        }
        return NextResponse.json({ message: "Like updated successfully" });
    } catch (err) {
        console.error("Error executing query:", err);
        return NextResponse.error(new Error("Error executing query"));
    }
}
