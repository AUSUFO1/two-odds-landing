import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Server-side Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Resend email client
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check for duplicates
    const { data: existingUser } = await supabase
      .from('waitlist')
      .select('email')
      .eq('email', normalizedEmail)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: 'This email is already on the waitlist!' },
        { status: 409 }
      );
    }

    // Insert into database
    const { error: insertError } = await supabase
      .from('waitlist')
      .insert([{ email: normalizedEmail }])
      .select();

    if (insertError) {
      console.error('Database insert error:', insertError);
      
      if (insertError.message.includes('does not exist')) {
        return NextResponse.json(
          { error: 'Database table not created. Run the SQL setup script.' },
          { status: 500 }
        );
      }
      
      throw insertError;
    }

    // Send welcome email
    try {
      await resend.emails.send({
        from: 'Two Odds <onboarding@resend.dev>',
        to: normalizedEmail,
        subject: 'Welcome to Two Odds Waitlist!',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; background-color: #003C6F; font-family: 'Poppins', Arial, sans-serif;">
              <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
                
                <!-- Logo/Icon Header -->
                <div style="text-align: center; margin-bottom: 30px;">
                  <div style="display: inline-block; background: linear-gradient(135deg, #FFA500, #e59400); width: 80px; height: 80px; border-radius: 20px; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 25px rgba(255, 165, 0, 0.3);">
                    <!-- Trophy Icon (SVG) -->
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#03101F" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
                      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                      <path d="M4 22h16"/>
                      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
                    </svg>
                  </div>
                </div>

                <!-- Main Content Card -->
                <div style="background-color: #01294A; border-radius: 16px; padding: 40px; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);">
                  <h1 style="color: #FFA500; text-align: center; font-size: 32px; margin: 0 0 20px 0; font-weight: 600;">Welcome Aboard! 🚀</h1>
                  
                  <p style="color: #ffffff; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                    Thank you for joining the <strong style="color: #FFA500;">Two Odds</strong> exclusive waitlist! You're now part of an elite group getting early access to the future of smart betting.
                  </p>

                  <!-- Benefits Section -->
                  <div style="background: rgba(255, 165, 0, 0.1); padding: 25px; border-radius: 12px; border-left: 4px solid #FFA500; margin-bottom: 30px;">
                    <h2 style="color: #FFA500; font-size: 20px; margin: 0 0 20px 0; font-weight: 600;">What's Next?</h2>
                    
                    <!-- Benefit 1 - Zap (Early Access) -->
                    <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
                      <div style="margin-right: 12px; margin-top: 2px;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFA500" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
                        </svg>
                      </div>
                      <div>
                        <p style="color: #ffffff; margin: 0; line-height: 1.6;"><strong>Early Access</strong> when we launch</p>
                      </div>
                    </div>

                    <!-- Benefit 2 - Target (Exclusive Updates) -->
                    <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
                      <div style="margin-right: 12px; margin-top: 2px;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ABB2FA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <circle cx="12" cy="12" r="10"/>
                          <circle cx="12" cy="12" r="6"/>
                          <circle cx="12" cy="12" r="2"/>
                        </svg>
                      </div>
                      <div>
                        <p style="color: #ffffff; margin: 0; line-height: 1.6;"><strong>Exclusive Updates</strong> & insider strategies</p>
                      </div>
                    </div>

                    <!-- Benefit 3 - Sparkles (Special Offers) -->
                    <div style="display: flex; align-items: flex-start;">
                      <div style="margin-right: 12px; margin-top: 2px;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFA500" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
                          <path d="M20 3v4"/>
                          <path d="M22 5h-4"/>
                          <path d="M4 17v2"/>
                          <path d="M5 18H3"/>
                        </svg>
                      </div>
                      <div>
                        <p style="color: #ffffff; margin: 0; line-height: 1.6;"><strong>Special Offers</strong> reserved just for you</p>
                      </div>
                    </div>
                  </div>

                  <!-- CTA Section -->
                  <div style="text-align: center; margin-top: 30px;">
                    <div style="display: inline-flex; align-items: center; background: rgba(171, 178, 250, 0.15); padding: 15px 25px; border-radius: 10px; border: 1px solid rgba(171, 178, 250, 0.3);">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ABB2FA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 10px;">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <path d="m9 11 3 3L22 4"/>
                      </svg>
                      <span style="color: #ABB2FA; font-size: 14px; font-weight: 600;">You're on the list!</span>
                    </div>
                  </div>

                  <!-- Footer -->
                  <div style="text-align: center; padding-top: 30px; border-top: 1px solid rgba(171, 178, 250, 0.2); margin-top: 30px;">
                    <p style="color: #ABB2FA; font-size: 14px; margin: 0;">
                      Get ready for something extraordinary.<br/>
                      <strong style="color: #FFA500; font-size: 16px;">The Two Odds Team</strong>
                    </p>
                  </div>
                </div>

                <!-- Disclaimer -->
                <p style="text-align: center; color: rgba(171, 178, 250, 0.6); font-size: 12px; margin-top: 20px;">
                  You're receiving this because you signed up for the Two Odds waitlist.
                </p>
              </div>
            </body>
          </html>
        `,
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }

    return NextResponse.json(
      { 
        message: 'Success! Check your email for confirmation.', 
        success: true 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Waitlist error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to join waitlist. Please try again.', 
        details: error instanceof Error ? error.message : undefined 
      },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve waitlist count
export async function GET() {
  try {
    const { count, error } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;

    return NextResponse.json({ 
      count: count || 0, 
      success: true 
    });
    
  } catch (error) {
    console.error('Count fetch error:', error);
    
    return NextResponse.json({ 
      error: 'Failed to fetch count', 
      count: 0 
    }, { status: 500 });
  }
}