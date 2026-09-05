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
        const { name, email, mobile, companyName, message } = body;
        
        if (!email || !name) {
            return NextResponse.json({ error: 'Name and Email are required' }, { status: 400 });
        }

        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safeMobile = escapeHtml(mobile);
        const safeCompanyName = escapeHtml(companyName);
        const safeMessage = escapeHtml(message);

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
            subject: 'Hello Jef you have a Lead to get in touch !! Hurry',
            html: `
        <p>Hi JEF</p>
        <p>You have a new message from the contact form.</p>
        <p>Below are the details submitted by the customer:</p>
        <p><strong>Name:</strong> ${safeName || 'Not Provided'}<br>
        <strong>Email:</strong> ${safeEmail || 'Not Provided'}<br>
        <strong>Phone Number:</strong> ${safeMobile || 'Not Provided'}<br>
        <strong>Company Name:</strong> ${safeCompanyName || 'Not Provided'}<br>
        <strong>Message / Requirement:</strong> ${safeMessage || 'Not Provided'}</p>
        <p>Please review the inquiry and connect with the customer at the earliest.</p>
        <p>Best Regards,<br>
        Website Notification System<br></p>
      `,
        }

        const autoReply = {
            from: process.env.EMAIL,
            to: email, // standard routing
            subject: 'JEF UAE IS READY TO GET IN TOUCH SHORTLY !',
            html: `
        <p>Dear ${safeName || 'Customer'},</p>
        <p>Thank you for reaching out to us.</p>
        <p>We have received your inquiry and our team will review the details and get in touch with you shortly.</p>
        <p>If your request is urgent, please feel free to contact us directly using the details below:</p>
        📞 Phone: +91 080 37569000\n
        📧 Email: marketing@jeftechno.com\n
        <br><p>We appreciate your interest in JEF Techno and look forward to assisting you.</p>
        <p>Warm Regards,<br>
        Team JEF Techno<br>
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
