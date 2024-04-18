const { NextResponse } = require("next/server");

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "logout Successfull",
      success: true,
    });
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    return response;
  } catch (error) {
    return NextResponse.json(
      {
        error: "Error While logging out",
      },
      { status: 500 }
    );
  }
}
