import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const escapeHtml = (unsafe) => {
    if (typeof unsafe !== 'string') return '';
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

export async function POST(request) {
    let body;
    try {
        body = await request.json();
    } catch (e) {
        return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    try {
        const { name, email, mobile } = body;
        
        if (!email || !name) {
            return NextResponse.json({ error: 'Name and Email are required' }, { status: 400 });
        }

        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safeMobile = escapeHtml(mobile);

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp.gmail.com",
            port: parseInt(process.env.SMTP_PORT || "465"),
            secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        })

        const adminMail = {
            from: process.env.EMAIL,
            to: `${process.env.EMAIL}, jeftechno.india@gmail.com`,
            subject: 'Hello Jef, you have a Lead to get in touch! Hurry',
            html: `
        <p>Hi JEF</p>
        <p>You have a new message from the contact form. Here are the details:</p>
        <p><strong>Name:</strong> ${safeName || 'Not Provided'}<br>
        <strong>Email:</strong> ${safeEmail || 'Not Provided'}<br>
        <strong>Phone Number:</strong> ${safeMobile || 'Not Provided'}</p>
        <p>Please review this message and respond as soon as possible.</p>
        <p>Regards,<br>
        JEF GROUP<br>
        Sales & Marketing</p>
      `,
        }

        const autoReply = {
            from: process.env.EMAIL,
            to: email, // use original email for SMTP routing
            subject: 'JEF UAE IS READY TO GET IN TOUCH SHORTLY !',
            html: `
        <p>Hi ${safeName || 'Customer'},</p>
        <p>Thank you for contacting us! We’ve received your details and our team will get back to you shortly.</p>
        <p>We’ll do our best to respond within 1-2 business days. In the meantime, feel free to browse our website for more information.</p>
        <p>Regards,<br>
        JEF GROUP<br>
        Sales & Marketing</p>
      `,
        }

        await Promise.all([
            transporter.sendMail(adminMail),
            transporter.sendMail(autoReply)
        ])

        return NextResponse.json({ message: 'Form submission successful!' })
    } catch (error) {
        console.error('Email error:', error)
        return NextResponse.json({ error: 'Email sending failed' }, { status: 500 })
    }
}
