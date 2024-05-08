import poolPromise from "@/lib/SQL_Config";
import { NextResponse } from "next/server";

export async function POST(request) {
    const payload = await request.json();
    const { first_user, second_user } = payload;
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input("first_user", first_user)
            .input("second_user", second_user)
            .query(
                `INSERT INTO Conversations (first_user, second_user, last_updated)
                OUTPUT INSERTED.*
                VALUES (@first_user, @second_user, GETDATE());`
            );
        return NextResponse.json(result.recordset[0].conversation_id);
    } catch (err) {
        console.error("Error executing query:", err);
        return NextResponse.error(new Error("Error executing query"));
    }
}