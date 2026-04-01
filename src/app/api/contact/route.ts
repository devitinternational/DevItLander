import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASS,
  },
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, projectType, message, slot, about, type } = body;

    const notificationEmail =
      process.env.BOOKING_NOTIFICATION_EMAIL || "tech@devitinternational.com";
    const sendCustomerConfirmation =
      process.env.SEND_CUSTOMER_CONFIRMATION === "true";

    // Handle booking consultation
    if (type === "consultation") {
      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #fcbd1c;">New Booking Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Preferred Time Slot:</strong> ${slot}</p>
          <p><strong>Project Overview:</strong></p>
          <p style="background: #f5f5f5; padding: 10px; border-radius: 5px;">${about}</p>
          <p><strong>Reply to:</strong> ${email}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">This is an automated booking request. Please respond directly to ${email}</p>
        </div>
      `;

      // Send to admin
      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: notificationEmail,
        subject: `New Booking Request from ${name}`,
        html,
      });

      // Send confirmation to customer if enabled
      if (sendCustomerConfirmation) {
        const customerHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #fcbd1c;">Booking Request Confirmed</h2>
            <p>Hi ${name},</p>
            <p>Thank you for booking a demo with DevIt International. We've received your request for a <strong>${slot}</strong> consultation.</p>
            <p><strong>Your Details:</strong></p>
            <ul>
              <li><strong>Time Slot:</strong> ${slot}</li>
              <li><strong>Project:</strong> ${about}</li>
            </ul>
            <p>Our team will review your request and send you a confirmation within a few hours with the exact meeting time and link.</p>
            <p>If you have any questions in the meantime, feel free to reply to this email.</p>
            <p style="margin-top: 30px; color: #666;">
              Best regards,<br>
              <strong>DevIt International</strong><br>
              tech@devitinternational.com
            </p>
          </div>
        `;

        await transporter.sendMail({
          from: process.env.GMAIL_USER,
          to: email,
          subject: "Your Booking Request Has Been Received",
          html: customerHtml,
        });
      }

      return NextResponse.json({
        success: true,
        message: "Booking request received",
      });
    }

    // Handle regular contact form
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #fcbd1c;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Project Type:</strong> ${projectType || "Not specified"}</p>
        <p><strong>Message:</strong></p>
        <p style="background: #f5f5f5; padding: 10px; border-radius: 5px; white-space: pre-wrap;">${message}</p>
        <p><strong>Reply to:</strong> ${email}</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">This is an automated message. Please respond directly to ${email}</p>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: notificationEmail,
      subject: `New inquiry from ${name}`,
      html,
    });

    // Send confirmation to customer if enabled
    if (sendCustomerConfirmation) {
      const customerHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #fcbd1c;">Message Received</h2>
          <p>Hi ${name},</p>
          <p>Thank you for reaching out to DevIt International. We've received your message and will get back to you within 24 hours.</p>
          <p style="margin-top: 30px; color: #666;">
            Best regards,<br>
            <strong>DevIt International</strong><br>
            tech@devitinternational.com
          </p>
        </div>
      `;

      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: email,
        subject: "We Received Your Message",
        html: customerHtml,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
