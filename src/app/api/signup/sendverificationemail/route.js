import { resend } from "@/lib/resend";
import VerificationEmail from "@/utils/EmailTemplate";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { email, username, verifyCode } = body;

  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Picflix Verification Code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });
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
