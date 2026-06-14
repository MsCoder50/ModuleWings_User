import transporter from "@/lib/smtp";
import { NextResponse } from "next/server";

async function sendMailToUser(name, email) {
    await transporter.sendMail({
        from: "contact@modulewings.com",
        to: email,
        subject: "We will shortly connect to you",
        text: "Hi " + name + ",\n\nThank you for contacting ModuleWings. We will shortly connect to you. You can reach us at contact@modulewings.com or business@modulewings.com.\n\nBest regards,\nModuleWings Team \n\n[Please Note This is an automated email, please do not reply to this email]",
    });
}

export async function POST(request) {
    try {
        const { name, email, niche, country, desc } = await request.json();
        
        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: "contact@modulewings.com",
            subject: "New contact request",
            text: "Name: " + name + "\nEmail: " + email + "\nNiche: " + niche + "\nCountry: " + country + "\nDescription: " + desc,
            html: `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Niche:</strong> ${niche}</p>
            <p><strong>Country:</strong> ${country}</p>
            <p><strong>Description:</strong> ${desc}</p>
            `
        });

        await sendMailToUser(name, email);
        
        return NextResponse.json({ status: 200, message: "Message sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json(
            { status: 500, message: "Message not sent successfully" },
            { status: 500 }
        );
    }
}