// import { resend } from "@/lib/resend";
// import VerificationEmail from "./EmailTemplate";

// export async function sendVerificationEmail(email, username, verifyCode) {
//   try {
//     await resend.emails.send({
//       from: "onboarding@resend.dev",
//       to: email,
//       subject: "Picflix Verification Code",
//       react: VerificationEmail({ username, otp: verifyCode }),
//     });
//     return { success: true, message: "Verification email sent successfully." };
//   } catch (emailError) {
//     console.error("Error sending verification email:", emailError);
//     return { success: false, message: "Failed to send verification email." };
//   }
// }