import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,   
    pass: process.env.GMAIL_APP_PASS, 
  },
});

export async function POST(req: Request) {
  const { name, email, projectType, message } = await req.json();

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: 'tech@devitinternational.com',
    subject: `New inquiry from ${name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Project Type:</strong> ${projectType}</p>
      <p><strong>Message:</strong> ${message}</p>
      <p><strong>Reply to:</strong> ${email}</p>
    `,
  });

  return NextResponse.json({ success: true });
}