import { NextResponse } from "next/server";
import poolPromise from "@/lib/SQL_Config";

export async function POST(req) {
    const body = await req.json();

    const { post_id } = body;
    const pool = await poolPromise;

    const result1 = await pool.run(
        `DELETE FROM Media WHERE entity_id=?`,
        post_id
    );
    if (result1.changes === 0) {
        return NextResponse.error(new Error("Failed to delete Media"));
    }

    const result = await pool.run(`DELETE FROM posts WHERE post_id=?`, post_id);
    if (result.changes === 0) {
        return NextResponse.error(new Error("Failed to delete Post"));
    }

    return NextResponse.json({ message: "Profile updated successfully" });
}
