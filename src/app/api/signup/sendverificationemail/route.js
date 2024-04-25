import { resend } from "@/lib/resend";
import VerificationEmail from "@/utils/EmailTemplate";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { email, username, verifyCode } = body;

  try {
    const response = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: "hafiz.afnan322@gmail.com",
      subject: "Picflix Verification Code",
      react: VerificationEmail({ username }),
    });
    console.log(Response.json(response));
    return NextResponse.json({
      success: true,
      message: "Verification email sent successfully.",
    });
  } catch (emailError) {
    console.error("Error sending verification email:", emailError);
    return NextResponse.json({
      success: false,
      message: "Failed to send verification email.",
    });
  }
}
