import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { name, email, message } = await req.json();

    // Validation
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'All fields are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: 'Website Contact Form <onboarding@resend.dev>',
      to: 'YOUR_EMAIL_HERE', // Replace with your actual email
      subject: 'New Contact Form Message',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5; border-radius: 10px;">
          <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #2563eb; margin-bottom: 20px; border-bottom: 3px solid #2563eb; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>

            <div style="margin-bottom: 20px;">
              <p style="margin: 0; font-weight: bold; color: #333; font-size: 14px;">Name:</p>
              <p style="margin: 5px 0 0 0; color: #555; font-size: 16px;">${name}</p>
            </div>

            <div style="margin-bottom: 20px;">
              <p style="margin: 0; font-weight: bold; color: #333; font-size: 14px;">Email:</p>
              <p style="margin: 5px 0 0 0; color: #555; font-size: 16px;">
                <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>
              </p>
            </div>

            <div style="margin-bottom: 20px;">
              <p style="margin: 0; font-weight: bold; color: #333; font-size: 14px;">Message:</p>
              <p style="margin: 5px 0 0 0; color: #555; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>

            <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 25px 0;" />

            <p style="color: #888; font-size: 12px; margin: 0;">
              This email was sent from your website contact form at ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to send email. Please try again.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Email sent successfully',
        id: data?.id
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Server error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
