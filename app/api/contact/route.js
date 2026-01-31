import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

function createTransporter() {
  if (!SMTP_USER || !SMTP_PASS) {
    console.error("Missing SMTP_USER or SMTP_PASS");
    throw new Error("Email configuration error");
  }

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

export async function POST(request) {
  try {
    const { name, email, phone, service, message } = await request.json();

    const transporter = createTransporter();
    const DESTINATION = "dave@whalecreek.co";

    const emailHtml = `
      <h2>New Project Inquiry</h2>

      <h3>Contact</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "—"}</p>

      <h3>Project</h3>
      <p><strong>Service:</strong> ${service || "Not specified"}</p>

      <h3>Message</h3>
      <p>${(message || "").replace(/\n/g, "<br/>")}</p>
    `;

    const info = await transporter.sendMail({
      from: `"Whale Creek Construction" <${SMTP_USER}>`,
      to: DESTINATION,
      replyTo: email,
      subject: `New Inquiry — ${name} (${service || "General"})`,
      html: emailHtml,
      envelope: {
        from: SMTP_USER,
        to: DESTINATION,
      },
    });

    console.log("Whale Creek contact email sent:", info.messageId);

    return NextResponse.json({
      success: true,
      message: "Form submitted successfully",
    });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process contact form" },
      { status: 500 },
    );
  }
}
