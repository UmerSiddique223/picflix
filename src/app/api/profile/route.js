import { NextResponse } from "next/server";
import poolPromise from "@/lib/SQL_Config";
import { getUserCookie } from "@/lib/userCookie";

export async function PUT(req) {
    const body = await req.json();

    const { name, bio, profile_pic, user_id } = body;
    const pool = await poolPromise;
    const result = await pool.run(
        `UPDATE Users SET name = ?, bio = ?, profile_picture = ? WHERE user_id = ?`,
        name,
        bio,
        profile_pic[0].path,
        user_id
    );

    if (result.changes === 0) {
        return NextResponse.error(new Error("Failed to update profile"));
    }
    const response = NextResponse.json({
        status: 303,
        success: true,
        message: "Profile updated successfully",
    });
    const userData = getUserCookie();
    userData.user_id = user_id;
    userData.bio = bio;
    userData.profile_picture = profile_pic[0].path;
    response.cookies.set("user", JSON.stringify(userData), {
        httpOnly: true,
        expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    });
    return response;
}
