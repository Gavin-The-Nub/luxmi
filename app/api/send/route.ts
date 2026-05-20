import { Resend } from 'resend';

// Initialize Resend with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, phone, treatment, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return Response.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Recipient email address
    // On Resend free tier (using onboarding@resend.dev), emails can only be sent to the registered address.
    // In production with a verified domain, this can be sent to info@luxmi.com or any custom address.
    const toEmail = process.env.CONTACT_RECIPIENT_EMAIL || 'garciajrvictor6@gmail.com';

    // Premium HTML Email Template styled in Lux-Mi brand theme
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Contact Inquiry - Lux-Mi</title>
          <style>
            body {
              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
              color: #1A1410;
              background-color: #FAF6F0;
              margin: 0;
              padding: 0;
              -webkit-font-smoothing: antialiased;
            }
            .container {
              max-width: 600px;
              margin: 40px auto;
              background-color: #FFFFFF;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 20px rgba(26, 20, 16, 0.08);
              border: 1px solid rgba(201, 147, 122, 0.15);
            }
            .header {
              background-color: #1A1410;
              color: #F3EAE3;
              padding: 35px 40px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
              font-weight: 300;
              letter-spacing: 0.08em;
              text-transform: uppercase;
            }
            .header h1 em {
              font-style: italic;
              color: #C9937A;
              font-family: Georgia, serif;
            }
            .header p {
              margin: 8px 0 0;
              font-size: 13px;
              color: #C9937A;
              letter-spacing: 0.1em;
              text-transform: uppercase;
              font-weight: 500;
            }
            .content {
              padding: 40px;
            }
            .field-group {
              margin-bottom: 25px;
              border-bottom: 1px solid rgba(201, 147, 122, 0.1);
              padding-bottom: 20px;
            }
            .field-group:last-child {
              border-bottom: none;
              margin-bottom: 0;
              padding-bottom: 0;
            }
            .label {
              font-size: 11px;
              text-transform: uppercase;
              letter-spacing: 0.1em;
              color: #A6755E;
              margin-bottom: 8px;
              font-weight: 600;
            }
            .value {
              font-size: 15px;
              line-height: 1.6;
              color: #1A1410;
            }
            .message-box {
              background-color: #FAF6F0;
              border-left: 3px solid #C9937A;
              padding: 18px 20px;
              border-radius: 0 8px 8px 0;
              font-style: italic;
              white-space: pre-wrap;
              color: #2D2520;
            }
            .footer {
              background-color: #FAF6F0;
              color: #7A706A;
              text-align: center;
              padding: 25px 40px;
              font-size: 12px;
              border-top: 1px solid rgba(201, 147, 122, 0.1);
              line-height: 1.5;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Lux-Mi Skin <em>Wellness</em></h1>
              <p>New Contact Inquiry</p>
            </div>
            <div class="content">
              <div class="field-group">
                <div class="label">Sender Name</div>
                <div class="value"><strong>${name}</strong></div>
              </div>
              
              <div class="field-group">
                <div class="label">Email Address</div>
                <div class="value"><a href="mailto:${email}" style="color: #A6755E; text-decoration: none; font-weight: 500;">${email}</a></div>
              </div>
              
              ${phone ? `
              <div class="field-group">
                <div class="label">Phone Number</div>
                <div class="value">${phone}</div>
              </div>
              ` : ''}
              
              ${treatment ? `
              <div class="field-group">
                <div class="label">Selected Treatment</div>
                <div class="value" style="display: inline-block; background-color: rgba(201, 147, 122, 0.1); color: #A6755E; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">${treatment}</div>
              </div>
              ` : ''}
              
              <div class="field-group">
                <div class="label">Message Details</div>
                <div class="value message-box">"${message}"</div>
              </div>
            </div>
            <div class="footer">
              This communication was generated automatically by the Lux-Mi Skin Wellness Aesthetics contact system. Please respond to the customer directly using their contact info above.
            </div>
          </div>
        </body>
      </html>
    `;

    // Attempt to send email
    const { data, error } = await resend.emails.send({
      from: 'Lux-Mi Contact Form <onboarding@resend.dev>',
      to: [toEmail],
      subject: `[Lux-Mi Inquiry] ${name} - ${treatment || 'General Inquiry'}`,
      html: htmlContent,
      replyTo: email, // This allows the clinic to hit reply directly in their email client
    });

    if (error) {
      console.error("Resend API returned an error:", error);
      return Response.json({ error: error.message }, { status: 400 });
    }

    return Response.json({ success: true, id: data?.id });
  } catch (err: any) {
    console.error("Server API route error:", err);
    return Response.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
