import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';

const resend = new Resend(process.env.RESEND_API_KEY);

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(2, 'Subject must be at least 2 characters').max(200),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
  honeypot: z.string().max(0, 'Spam detected').optional(), // Should be empty
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // 1. Validate inputs
    const validatedData = contactSchema.safeParse(body);
    
    if (!validatedData.success) {
      return NextResponse.json(
        { error: validatedData.error.errors[0].message },
        { status: 400 }
      );
    }

    const { name, email, subject, message, honeypot } = validatedData.data;

    // 2. Anti-spam check (honeypot)
    if (honeypot) {
      return NextResponse.json({ message: 'Message sent successfully (spam filtered)' }, { status: 200 });
    }

    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'UTC',
      dateStyle: 'full',
      timeStyle: 'long',
    });

    // 3. Send Email via Resend
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'rhasnain286@gmail.com',
      replyTo: email,
      subject: `New Contact: ${subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #0f172a; color: white; padding: 24px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">New Portfolio Submission</h1>
          </div>
          <div style="padding: 24px; color: #334155;">
            <p style="margin-bottom: 16px;"><strong>Name:</strong> ${name}</p>
            <p style="margin-bottom: 16px;"><strong>Email:</strong> ${email}</p>
            <p style="margin-bottom: 16px;"><strong>Subject:</strong> ${subject}</p>
            <div style="margin-bottom: 24px;">
              <strong>Message:</strong>
              <div style="margin-top: 8px; padding: 16px; background-color: #f8fafc; border-radius: 4px; border-left: 4px solid #3b82f6; white-space: pre-wrap;">${message}</div>
            </div>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
            <p style="font-size: 12px; color: #64748b; text-align: center;">Submitted on ${timestamp} (UTC)</p>
          </div>
        </div>
      `,
    });

    if (emailError) {
      console.error('Resend Error:', emailError);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    // 4. Supabase Backup (Best effort)
    try {
      await supabase.from('contacts').insert([
        { 
          name, 
          email, 
          message, 
          subject, // Ensure your table has a 'subject' column or it might error
          created_at: new Date().toISOString() 
        }
      ]);
    } catch (dbError) {
      console.error('Supabase Backup Error:', dbError);
      // We don't return error here because email was already sent successfully
    }

    return NextResponse.json(
      { message: 'Message sent successfully', id: emailData?.id },
      { status: 200 }
    );

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
