import poolPromise from "../../../../lib/SQL_Config";
import { NextResponse } from "next/server";

export async function GET(request, content) {
    const post = content.params.comment;
    try {
        const pool = await poolPromise;
        const result = await pool.request().query(
            `SELECT Comments.*, Users.name, Users.profile_picture AS profile_pic FROM Comments
            JOIN Users ON Users.user_id=Comments.user_id
            WHERE post_id = ${post}`
        );
        return NextResponse.json(result.recordset);
    } catch (err) {
        console.error("Error executing query:", err);
        return NextResponse.error(new Error("Error executing query"));
    }
}
