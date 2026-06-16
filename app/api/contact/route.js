import transporter from "@/lib/smtp";
import { NextResponse } from "next/server";

export function generateEmailHtml(name) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    @font-face {
      font-family: 'Satoshi-Variable';
      src: url('https://modulewings.com/fonts/satoshi/Satoshi-Variable.ttf') format('truetype');
      font-display: swap;
      font-style: normal;
    }
    @font-face {
      font-family: 'Satoshi-VariableItalic';
      src: url('https://modulewings.com/fonts/satoshi/Satoshi-VariableItalic.ttf') format('truetype');
      font-display: swap;
      font-style: italic;
    }
    @font-face {
      font-family: 'Satoshi-Regular';
      src: url('https://modulewings.com/fonts/satoshi/Satoshi-Regular.otf') format('opentype');
      font-display: swap;
      font-style: normal;
    }
    @font-face {
      font-family: 'Satoshi-Medium';
      src: url('https://modulewings.com/fonts/satoshi/Satoshi-Medium.otf') format('opentype');
      font-display: swap;
      font-style: normal;
    }
    @font-face {
      font-family: 'Satoshi-Bold';
      src: url('https://modulewings.com/fonts/satoshi/Satoshi-Bold.otf') format('opentype');
      font-display: swap;
      font-style: normal;
    }
    @font-face {
      font-family: 'Satoshi-Black';
      src: url('https://modulewings.com/fonts/satoshi/Satoshi-Black.otf') format('opentype');
      font-display: swap;
      font-style: normal;
    }
    /* Client-specific overrides */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #ffffff; width: 100% !important;">
  <center style="width: 100%; background-color: #ffffff;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; padding: 40px 0;">
      <tr>
        <td align="center" valign="top">
          
          <!-- Main Card -->
          <table width="1190" border="0" cellspacing="0" cellpadding="0" style="background-color: #F0F4F8; font-family: 'Satoshi-Regular', 'Manrope', Arial, sans-serif; overflow: hidden; margin: 0 auto; max-width: 1190px; width: 100%;">
            
            <!-- Logo Row -->
            <tr>
              <td align="left" style="padding: 50px 80px 0px 80px;">
                <img src="https://modulewings.com/images/mail_logo.png" alt="ModuleWings" width="280" style="display: block; border: 0;" />
              </td>
            </tr>

            <!-- Content Row -->
            <tr> 
              <td align="center" style="padding: 65px 80px 20px 80px;">
                <h1 style="color: #1231FF; font-family: 'Satoshi-Bold', Arial, sans-serif; font-size: 50px; margin: 0 0 10px 0; letter-spacing: -2px;">
                  Thank You! ${name}
                </h1>
                <p style="color: #000; font-size: 20px; font-family: 'Satoshi-Regular', Arial, sans-serif; margin: 0 0 30px 0;">
                  We've successfully received your application.
                </p>
                
                <p style="color: #000; font-size: 20px; font-family: 'Satoshi-Regular', Arial, sans-serif;  line-height: 1.6; margin: 0 auto 50px auto; max-width: 866px;">
                  Our team is currently reviewing your submission, analyzing your content needs, and preparing a customized strategy. We'll contact you within <span style="font-family: 'Satoshi-Bold', Arial, sans-serif; color: #1231FF; ">24-72 hours</span> to discuss the next steps and how Module Wings can help you grow faster and create better content at scale.
                </p>

                <!-- Centered Button Wrapper -->
                <table border="0" cellspacing="0" cellpadding="0" align="center" style="box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15); border-radius: 10px;">
                  <tr>
                    <td align="center" style="border-radius: 10px; background-color: #1231FF;" bgcolor="#1231FF">
                      <a href="https://modulewings.com" style="display: block; width: 260px; line-height: 60px; text-align: center; font-size: 18px; font-family: 'Satoshi-Bold', Arial, sans-serif; color: #ffffff; text-decoration: none; background-color: #1231FF; border-radius: 10px;">
                        Visit Module Wings <span style="margin-left: 8px; font-size: 20px;">&rarr;</span>
                      </a>
                    </td>
                  </tr>
                </table>

              </td>
            </tr>

            <!-- Regards Row -->
            <tr>
              <td align="center" style="padding: 40px 80px 70px 80px;">
                <p style="color: #000; font-size: 20px; font-family: 'Satoshi-Regular', Arial, sans-serif; margin: 0 0 10px 0;">Best regards,</p>
                <p style="color: #000; font-size: 20px; font-family: 'Satoshi-Regular', Arial, sans-serif; margin: 0;">Module Wings Team</p>
              </td>
            </tr>

            <!-- Footer Row -->
            <tr>
              <td style="background-color: #1231FF; padding: 50px 80px;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="color: #ffffff; font-size: 20px; font-family: 'Satoshi-Medium', Arial, sans-serif;  padding-bottom: 30px;">
                      This is an automated email from Module Wings. Please do not reply to this mail.
                    </td>
                    <td align="right" style="padding-bottom: 30px;">
                      <a href="https://www.instagram.com/modulewings/" style="text-decoration: none; margin-left: 24px;">
                        <img src="https://modulewings.com/images/mail_ig.png" alt="Instagram" width="60" style="display: inline-block; border: 0;" />
                      </a>
                      <a href="https://x.com/ModuleWings" style="text-decoration: none; margin-left: 24px;">
                        <img src="https://modulewings.com/images/mail_x.png" alt="X" width="60" style="display: inline-block; border: 0;" />
                      </a>
                      <a href="https://www.linkedin.com/in/modulewings/" style="text-decoration: none; margin-left: 24px;">
                        <img src="https://modulewings.com/images/mail_in.png" alt="LinkedIn" width="60" style="display: inline-block; border: 0;" />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2" style="border-top: 2px solid rgba(255,255,255,0.2); padding-top: 30px;">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td style="color: rgba(255,255,255,0.7); font-size: 20px; font-family: 'Satoshi-Bold', Arial, sans-serif;">
                            <a href="#" style="color: rgba(255,255,255,0.7); text-decoration: none; margin-right: 30px;">Privacy Policy</a>
                            <a href="#" style="color: rgba(255,255,255,0.7); text-decoration: none;">Terms of Service</a>
                          </td>
                          <td align="right" style="color: rgba(255,255,255,0.7); font-size: 20px; font-family: 'Satoshi-Bold', Arial, sans-serif;">
                            &copy; 2026 Module wings. All rights reserved.
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </center>
</body>
</html>
  `;
}

async function sendMailToUser(name, email) {
  await transporter.sendMail({
    from: '"ModuleWings Team" <contact@modulewings.com>',
    to: email,
    subject: "We will shortly connect to you",
    text: "Hi " + name + ",\n\nThank you for contacting ModuleWings. We will shortly connect to you. You can reach us at contact@modulewings.com or business@modulewings.com.\n\nBest regards,\nModuleWings Team",
    html: generateEmailHtml(name),
  });
}

// Added GET method to easily preview the email template in the browser without sending it
export async function GET() {
  return new NextResponse(generateEmailHtml("CreatorName"), {
    headers: {
      "Content-Type": "text/html",
    },
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